import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { ADDRESS, MAP_URL } from './components/contactInfo';
import { buildHeadTags, buildRobotsTxt, buildSitemapXml } from './shared/seo/seo';

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

interface PageText {
  title: string;
  description: string;
}

/**
 * Tudo de SEO que depende do endereço do site, que só existe na variável de ambiente. O
 * título e a descrição vêm do `index.html`, para existirem em um lugar só.
 */
export function renderSeo({ title, description }: PageText, buildDate: Date) {
  const siteUrl = import.meta.env.VITE_SITE_URL;

  return {
    headTags: buildHeadTags({
      siteUrl,
      title,
      description,
      phoneDigits: import.meta.env.VITE_WHATSAPP_NUMBER,
      address: ADDRESS,
      mapUrl: MAP_URL,
      profiles: [import.meta.env.VITE_INSTAGRAM_URL]
    }),
    robotsTxt: buildRobotsTxt(siteUrl),
    sitemapXml: buildSitemapXml(siteUrl, buildDate)
  };
}
