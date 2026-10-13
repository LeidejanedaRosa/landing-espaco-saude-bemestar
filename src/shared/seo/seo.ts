import { SITE_NAME } from '../site';

// O token `cream` do tema. A meta tag não lê variável de CSS, por isso o valor se repete aqui.
const THEME_COLOR = '#f9ede6';
const SHARE_IMAGE = { path: '/og-image.jpg', width: 1200, height: 630 };

export interface PostalAddress {
  street: string;
  city: string;
  stateCode: string;
  postalCode: string;
  countryCode: string;
}

export interface SeoInput {
  /** Endereço público do site, com ou sem barra no final. */
  siteUrl: string;
  title: string;
  description: string;
  /** Só dígitos, com DDI e DDD, como na variável de ambiente. */
  phoneDigits: string;
  address: PostalAddress;
  mapUrl: string;
  /** Perfis do studio em outras redes. */
  profiles: string[];
}

function withoutTrailingSlash(url: string) {
  return url.replace(/\/+$/, '');
}

function escapeAttribute(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function meta(attribute: 'name' | 'property', key: string, content: string) {
  return `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`;
}

/** Dados estruturados (schema.org) do studio: é o que o Google usa para o resultado local. */
export function buildStructuredData(input: SeoInput) {
  const siteUrl = withoutTrailingSlash(input.siteUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: SITE_NAME,
    description: input.description,
    url: `${siteUrl}/`,
    image: `${siteUrl}${SHARE_IMAGE.path}`,
    telephone: `+${input.phoneDigits}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: input.address.street,
      addressLocality: input.address.city,
      addressRegion: input.address.stateCode,
      postalCode: input.address.postalCode,
      addressCountry: input.address.countryCode
    },
    hasMap: input.mapUrl,
    sameAs: input.profiles
  };
}

/** Tags do `<head>` que dependem do endereço do site: canonical, compartilhamento e dados estruturados. */
export function buildHeadTags(input: SeoInput): string {
  const siteUrl = withoutTrailingSlash(input.siteUrl);
  const pageUrl = `${siteUrl}/`;
  const imageUrl = `${siteUrl}${SHARE_IMAGE.path}`;
  // `<` escapado: um "</script>" dentro de um texto encerraria o bloco antes da hora.
  const structuredData = JSON.stringify(buildStructuredData(input)).replaceAll('<', '\\u003c');

  return [
    `<link rel="canonical" href="${escapeAttribute(pageUrl)}" />`,
    '<link rel="icon" type="image/png" sizes="48x48" href="/favicon.png" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
    meta('name', 'theme-color', THEME_COLOR),
    meta('property', 'og:type', 'website'),
    meta('property', 'og:locale', 'pt_BR'),
    meta('property', 'og:site_name', SITE_NAME),
    meta('property', 'og:title', input.title),
    meta('property', 'og:description', input.description),
    meta('property', 'og:url', pageUrl),
    meta('property', 'og:image', imageUrl),
    meta('property', 'og:image:width', String(SHARE_IMAGE.width)),
    meta('property', 'og:image:height', String(SHARE_IMAGE.height)),
    meta('property', 'og:image:alt', SITE_NAME),
    meta('name', 'twitter:card', 'summary_large_image'),
    `<script type="application/ld+json">${structuredData}</script>`
  ].join('\n    ');
}

export function buildRobotsTxt(siteUrl: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${withoutTrailingSlash(siteUrl)}/sitemap.xml\n`;
}

/** A landing tem uma página só; `lastModified` é a data do build. */
export function buildSitemapXml(siteUrl: string, lastModified: Date): string {
  const day = lastModified.toISOString().slice(0, 10);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <url><loc>${escapeAttribute(withoutTrailingSlash(siteUrl))}/</loc><lastmod>${day}</lastmod></url>`,
    '</urlset>',
    ''
  ].join('\n');
}
