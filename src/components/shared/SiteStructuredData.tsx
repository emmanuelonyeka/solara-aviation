import { Helmet } from 'react-helmet-async';
import { site } from '../../config/site';
import { serializeJsonLd, toAbsoluteUrl } from '../../lib/seo';

function isConfiguredSocialProfile(value: string): boolean {
  try {
    return new URL(value).pathname.replace(/\//g, '').length > 0;
  } catch {
    return false;
  }
}

export default function SiteStructuredData() {
  const baseUrl = site.url.replace(/\/+$/, '');
  const socialProfiles = Object.values(site.social).filter(isConfiguredSocialProfile);
  const organization = {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: toAbsoluteUrl('/favicon.svg', baseUrl),
    },
    foundingDate: String(site.founded),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.contact.phoneHref,
      email: site.contact.email,
      contactType: 'customer service',
      availableLanguage: ['English'],
      areaServed: 'Worldwide',
    },
    ...(socialProfiles.length > 0 ? { sameAs: socialProfiles } : {}),
  };
  const website = {
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: `${baseUrl}/`,
    name: site.name,
    description: site.description,
    inLanguage: site.language,
    publisher: { '@id': `${baseUrl}/#organization` },
  };
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [organization, website],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{serializeJsonLd(graph)}</script>
    </Helmet>
  );
}