import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { aircraft } from './src/data/aircraft';
import { articles } from './src/data/articles';
import { destinations } from './src/data/destinations';
import { site } from './src/config/site';

const FORM_MODES = new Set(['demo', 'live']);
const EMAIL_KEYS = [
  'VITE_EMAILJS_PUBLIC_KEY',
  'VITE_EMAILJS_SERVICE_ID',
  'VITE_EMAILJS_STAFF_TEMPLATE',
  'VITE_EMAILJS_CLIENT_TEMPLATE',
] as const;

interface SeoRoute {
  path: string;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

const STATIC_ROUTES: SeoRoute[] = [
  { path: '/', changeFrequency: 'weekly', priority: '1.0' },
  { path: '/fleet', changeFrequency: 'monthly', priority: '0.9' },
  { path: '/empty-legs', changeFrequency: 'weekly', priority: '0.8' },
  { path: '/destinations', changeFrequency: 'monthly', priority: '0.9' },
  { path: '/membership', changeFrequency: 'monthly', priority: '0.8' },
  { path: '/corporate', changeFrequency: 'monthly', priority: '0.8' },
  { path: '/experience', changeFrequency: 'monthly', priority: '0.8' },
  { path: '/concierge', changeFrequency: 'monthly', priority: '0.8' },
  { path: '/safety', changeFrequency: 'monthly', priority: '0.8' },
  { path: '/sustainability', changeFrequency: 'monthly', priority: '0.7' },
  { path: '/partners', changeFrequency: 'monthly', priority: '0.7' },
  { path: '/about', changeFrequency: 'monthly', priority: '0.7' },
  { path: '/careers', changeFrequency: 'monthly', priority: '0.6' },
  { path: '/press', changeFrequency: 'monthly', priority: '0.6' },
  { path: '/blog', changeFrequency: 'weekly', priority: '0.8' },
  { path: '/faq', changeFrequency: 'monthly', priority: '0.7' },
  { path: '/contact', changeFrequency: 'yearly', priority: '0.7' },
  { path: '/quote', changeFrequency: 'yearly', priority: '0.8' },
  { path: '/privacy', changeFrequency: 'yearly', priority: '0.3' },
  { path: '/terms', changeFrequency: 'yearly', priority: '0.3' },
  { path: '/disclosures', changeFrequency: 'yearly', priority: '0.3' },
  { path: '/cookies', changeFrequency: 'yearly', priority: '0.3' },
  { path: '/accessibility', changeFrequency: 'yearly', priority: '0.3' },
];

function validateRuntimeEnvironment(environment: Record<string, string>): void {
  const formMode = environment.VITE_FORM_MODE?.trim().toLowerCase() || 'demo';

  if (!FORM_MODES.has(formMode)) {
    throw new Error('VITE_FORM_MODE must be either "demo" or "live".');
  }

  if (formMode !== 'live') return;

  const missingEmailKeys = EMAIL_KEYS.filter((key) => !environment[key]?.trim());
  if (missingEmailKeys.length > 0) {
    throw new Error(`Live form mode is missing: ${missingEmailKeys.join(', ')}.`);
  }
}

function normalizeSiteUrl(value: string): string {
  const normalized = value.trim().replace(/\/+$/, '');
  const parsed = new URL(normalized);

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error('site.url must use http or https.');
  }

  return normalized;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createSeoPlugin(): Plugin {
  const baseUrl = normalizeSiteUrl(site.url);
  const dynamicRoutes: SeoRoute[] = [
    ...aircraft.map((item) => ({ path: `/fleet/${item.id}`, changeFrequency: 'monthly' as const, priority: '0.7' })),
    ...destinations.map((item) => ({ path: `/destinations/${item.slug}`, changeFrequency: 'monthly' as const, priority: '0.7' })),
    ...articles.map((item) => ({ path: `/blog/${item.slug}`, changeFrequency: 'monthly' as const, priority: '0.6' })),
  ];
  const routes = [...STATIC_ROUTES, ...dynamicRoutes];
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.flatMap((route) => [
      '  <url>',
      `    <loc>${escapeXml(`${baseUrl}${route.path}`)}</loc>`,
      `    <changefreq>${route.changeFrequency}</changefreq>`,
      `    <priority>${route.priority}</priority>`,
      '  </url>',
    ]),
    '</urlset>',
    '',
  ].join('\n');
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
  const manifest = `${JSON.stringify({
    id: '/',
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: site.themeColor,
    theme_color: site.themeColor,
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }],
  }, null, 2)}\n`;
  const generatedAssets = {
    '/robots.txt': { contentType: 'text/plain; charset=utf-8', source: robots },
    '/sitemap.xml': { contentType: 'application/xml; charset=utf-8', source: sitemap },
    '/site.webmanifest': { contentType: 'application/manifest+json; charset=utf-8', source: manifest },
  };
  const socialImageUrl = /^https?:\/\//i.test(site.socialImage.src)
    ? site.socialImage.src
    : `${baseUrl}${site.socialImage.src.startsWith('/') ? site.socialImage.src : `/${site.socialImage.src}`}`;
  const homeTitle = `${site.name} | Private Jet Charter & Membership`;
  const htmlReplacements = {
    __SITE_LANGUAGE__: site.language,
    __SITE_TITLE__: homeTitle,
    __SITE_NAME__: site.name,
    __SITE_DESCRIPTION__: site.description,
    __SITE_URL__: `${baseUrl}/`,
    __SITE_LOCALE__: site.locale,
    __SITE_IMAGE__: socialImageUrl,
    __SITE_IMAGE_ALT__: site.socialImage.alt,
    __THEME_COLOR__: site.themeColor,
  };

  return {
    name: 'solara-generated-seo',
    transformIndexHtml(html) {
      return Object.entries(htmlReplacements).reduce(
        (output, [token, value]) => output.replaceAll(token, escapeHtml(value)),
        html,
      );
    },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = request.url?.split('?')[0] as keyof typeof generatedAssets | undefined;
        const asset = pathname ? generatedAssets[pathname] : undefined;

        if (!asset) {
          next();
          return;
        }

        response.statusCode = 200;
        response.setHeader('Content-Type', asset.contentType);
        response.end(asset.source);
      });
    },
    generateBundle() {
      Object.entries(generatedAssets).forEach(([pathname, asset]) => {
        this.emitFile({ type: 'asset', fileName: pathname.slice(1), source: asset.source });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  validateRuntimeEnvironment(loadEnv(mode, process.cwd(), ''));

  return {
    base: '/',
    plugins: [react(), createSeoPlugin()],
    server: {
      port: 3000,
    },
  };
});
