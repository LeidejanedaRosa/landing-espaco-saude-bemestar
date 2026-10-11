// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, renderSeo } from './entry-server';

describe('prerender', () => {
  it('gera o HTML da página com o título principal, sem precisar de navegador', () => {
    const html = render();

    expect(html).toContain('<main');
    expect(html).toMatch(/<h1[^>]*>Saúde, movimento e/);
  });
});

describe('SEO do build', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('monta canonical, robots e sitemap com o endereço do site que vem do ambiente', () => {
    vi.stubEnv('VITE_SITE_URL', 'https://studio.example');
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '5500000000000');
    vi.stubEnv('VITE_INSTAGRAM_URL', 'https://instagram.example/studio');

    const seo = renderSeo(
      { title: 'Título da página', description: 'Descrição da página' },
      new Date('2026-10-11T12:00:00Z')
    );

    expect(seo.headTags).toContain('<link rel="canonical" href="https://studio.example/" />');
    expect(seo.headTags).toContain('content="Título da página"');
    expect(seo.robotsTxt).toContain('Sitemap: https://studio.example/sitemap.xml');
    expect(seo.sitemapXml).toContain('<loc>https://studio.example/</loc>');
    expect(seo.sitemapXml).toContain('<lastmod>2026-10-11</lastmod>');
  });

  it('descreve o studio com o endereço real e o telefone do WhatsApp', () => {
    vi.stubEnv('VITE_SITE_URL', 'https://studio.example');
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '5500000000000');
    vi.stubEnv('VITE_INSTAGRAM_URL', 'https://instagram.example/studio');

    const { headTags } = renderSeo({ title: 't', description: 'd' }, new Date());
    const json = headTags.match(/<script type="application\/ld\+json">(.*)<\/script>/)?.[1];
    const data = JSON.parse(json ?? '{}');

    expect(data.telephone).toBe('+5500000000000');
    expect(data.address.addressLocality).toBe('São Lourenço');
    expect(data.address.postalCode).toBe('37470-000');
    expect(data.sameAs).toEqual(['https://instagram.example/studio']);
  });
});
