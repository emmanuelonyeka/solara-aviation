import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { site } from '../../config/site';
import { serializeJsonLd, toAbsoluteUrl } from '../../lib/seo';

interface MetaTagsProps {
  title: string;
  description: string;
  canonical?: string | null;
  /** Absolute or root-relative path used as the social preview image. */
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  titleOrder?: 'page-first' | 'brand-first';
}

export default function MetaTags({
  title,
  description,
  canonical,
  image,
  imageAlt = site.socialImage.alt,
  noIndex = false,
  type = 'website',
  titleOrder = 'page-first',
}: MetaTagsProps) {
  useEffect(() => {
    document.head.querySelectorAll('[data-static-meta]').forEach((element) => element.remove());
  }, []);

  const location = useLocation();
  const baseUrl = site.url.replace(/\/$/, '');
  const routePath = location.pathname === '/' ? '/' : location.pathname.replace(/\/+$/, '');
  const fullTitle = titleOrder === 'brand-first' ? `${site.name} | ${title}` : `${title} | ${site.name}`;
  const routeUrl = toAbsoluteUrl(routePath, baseUrl);
  const canonicalUrl = canonical === null ? null : toAbsoluteUrl(canonical ?? routePath, baseUrl);
  const pageUrl = canonicalUrl ?? routeUrl;
  const socialImage = toAbsoluteUrl(image ?? site.socialImage.src, baseUrl);
  const robots = noIndex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: fullTitle,
    description,
    inLanguage: site.language,
    isPartOf: { '@id': `${baseUrl}/#website` },
    primaryImageOfPage: { '@type': 'ImageObject', url: socialImage },
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {!noIndex && <script type="application/ld+json">{serializeJsonLd(webPageSchema)}</script>}
    </Helmet>
  );
}
