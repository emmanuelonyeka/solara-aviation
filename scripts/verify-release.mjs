import { access, readFile, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIRECTORY = join(ROOT, 'public');
const DIST_DIRECTORY = join(ROOT, 'dist');
const REQUIRED_OUTPUT = ['index.html', 'robots.txt', 'sitemap.xml', 'site.webmanifest', '_redirects'];
const SOURCE_EXTENSIONS = new Set(['.css', '.html', '.ts', '.tsx']);
const IGNORED_DIRECTORIES = new Set(['.git', 'dist', 'node_modules']);
const JAVASCRIPT_GZIP_BUDGET = 180 * 1024;
const CSS_GZIP_BUDGET = 25 * 1024;
const MINIMUM_INDEXABLE_ROUTES = 20;
const failures = [];

async function exists(pathname) {
  try {
    await access(pathname, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory, options = {}) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && (options.ignoreDirectories?.has(entry.name) ?? false)) continue;

    const pathname = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(pathname, options));
    else if (entry.isFile()) files.push(pathname);
  }

  return files;
}

for (const filename of REQUIRED_OUTPUT) {
  if (!await exists(join(DIST_DIRECTORY, filename))) failures.push(`Missing production file: dist/${filename}`);
}

const projectFiles = await walk(ROOT, { ignoreDirectories: IGNORED_DIRECTORIES });
const sourceFiles = projectFiles.filter((pathname) => SOURCE_EXTENSIONS.has(extname(pathname)));
const assetReferences = new Set();
const assetPattern = /[('"`]((?:\/images\/|\/media\/)[^'"`?#)\s]+)/g;

for (const pathname of sourceFiles) {
  const source = await readFile(pathname, 'utf8');

  for (const match of source.matchAll(assetPattern)) assetReferences.add(match[1]);
}

for (const asset of assetReferences) {
  if (!await exists(join(PUBLIC_DIRECTORY, asset.slice(1)))) failures.push(`Missing public asset: ${asset}`);
}

const generatedFiles = await Promise.all(
  ['index.html', 'robots.txt', 'sitemap.xml', 'site.webmanifest'].map(async (filename) => ({
    filename,
    source: await readFile(join(DIST_DIRECTORY, filename), 'utf8'),
  })),
);

for (const file of generatedFiles) {
  if (/__[A-Z][A-Z_]+__/.test(file.source)) failures.push(`Unresolved build token in dist/${file.filename}`);
}

const sitemap = generatedFiles.find((file) => file.filename === 'sitemap.xml')?.source ?? '';
const robots = generatedFiles.find((file) => file.filename === 'robots.txt')?.source ?? '';
const manifest = generatedFiles.find((file) => file.filename === 'site.webmanifest')?.source ?? '';
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const duplicateLocations = sitemapLocations.filter((location, index) => sitemapLocations.indexOf(location) !== index);

if (sitemapLocations.length < MINIMUM_INDEXABLE_ROUTES) {
  failures.push(`Sitemap contains ${sitemapLocations.length} routes; expected at least ${MINIMUM_INDEXABLE_ROUTES}.`);
}
if (duplicateLocations.length > 0) failures.push(`Duplicate sitemap routes: ${[...new Set(duplicateLocations)].join(', ')}`);
if (sitemapLocations.some((location) => location.includes('/manage-booking'))) failures.push('Private booking support must not appear in the sitemap.');
if (!robots.includes('Allow: /')) failures.push('robots.txt must explicitly allow public crawling.');
if (!robots.includes('Sitemap: ') || !robots.includes('/sitemap.xml')) failures.push('robots.txt must advertise the sitemap.');

try {
  JSON.parse(manifest);
} catch {
  failures.push('dist/site.webmanifest is not valid JSON.');
}

const assetDirectory = join(DIST_DIRECTORY, 'assets');
const builtAssets = await walk(assetDirectory);
let largestJavaScript = { name: '', bytes: 0 };
let largestCss = { name: '', bytes: 0 };

for (const pathname of builtAssets) {
  const extension = extname(pathname);
  if (extension !== '.js' && extension !== '.css') continue;

  const bytes = gzipSync(await readFile(pathname)).byteLength;
  const record = { name: relative(DIST_DIRECTORY, pathname), bytes };

  if (extension === '.js' && bytes > largestJavaScript.bytes) largestJavaScript = record;
  if (extension === '.css' && bytes > largestCss.bytes) largestCss = record;
}

if (largestJavaScript.bytes > JAVASCRIPT_GZIP_BUDGET) {
  failures.push(`${largestJavaScript.name} is ${(largestJavaScript.bytes / 1024).toFixed(1)} KiB gzip; JavaScript budget is ${JAVASCRIPT_GZIP_BUDGET / 1024} KiB.`);
}
if (largestCss.bytes > CSS_GZIP_BUDGET) {
  failures.push(`${largestCss.name} is ${(largestCss.bytes / 1024).toFixed(1)} KiB gzip; CSS budget is ${CSS_GZIP_BUDGET / 1024} KiB.`);
}

if (failures.length > 0) {
  console.error('\nRelease verification failed:\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`Release verification passed: ${sitemapLocations.length} indexable routes, ${assetReferences.size} local asset references, ${(largestJavaScript.bytes / 1024).toFixed(1)} KiB largest JS gzip, ${(largestCss.bytes / 1024).toFixed(1)} KiB CSS gzip.`);
}