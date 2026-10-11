import { describe, expect, it } from 'vitest';
import {
  buildHeadTags,
  buildRobotsTxt,
  buildSitemapXml,
  buildStructuredData,
  SITE_NAME,
  type SeoInput
} from './seo';

const INPUT: SeoInput = {
  siteUrl: 'https://studio.example',
  title: 'Studio de teste',
  description: 'Pilates e fisioterapia',
  phoneDigits: '5500000000000',
  address: {
    street: 'Rua de Teste, 10',
    city: 'Cidade',
    stateCode: 'MG',
    postalCode: '00000-000',
    countryCode: 'BR'
  },
  mapUrl: 'https://maps.example/studio',
  profiles: ['https://instagram.example/studio']
};

function parseHead(tags: string) {
  return new DOMParser().parseFromString(`<head>${tags}</head>`, 'text/html');
}

describe('buildHeadTags', () => {
  it('aponta o canonical e o endereço de compartilhamento para a página, com uma barra só no fim', () => {
    for (const siteUrl of ['https://studio.example', 'https://studio.example/']) {
      const head = parseHead(buildHeadTags({ ...INPUT, siteUrl }));

      expect(head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
        'https://studio.example/'
      );
      expect(head.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(
        'https://studio.example/'
      );
    }
  });

  it('repete título e descrição nas tags de compartilhamento, com imagem em endereço absoluto', () => {
    const head = parseHead(buildHeadTags(INPUT));
    const content = (property: string) =>
      head.querySelector(`meta[property="${property}"]`)?.getAttribute('content');

    expect(content('og:title')).toBe('Studio de teste');
    expect(content('og:description')).toBe('Pilates e fisioterapia');
    expect(content('og:image')).toBe('https://studio.example/og-image.jpg');
    expect(content('og:locale')).toBe('pt_BR');
    expect(head.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe(
      'summary_large_image'
    );
  });

  it('declara o favicon e o ícone de tela inicial', () => {
    const head = parseHead(buildHeadTags(INPUT));

    expect(head.querySelector('link[rel="icon"]')?.getAttribute('href')).toBe('/favicon.png');
    expect(head.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href')).toBe(
      '/apple-touch-icon.png'
    );
  });

  it('aspas e sinais no texto não quebram o atributo nem viram HTML', () => {
    const tags = buildHeadTags({ ...INPUT, title: 'Pilates "clínico" & <b>fisio</b>' });
    const head = parseHead(tags);

    expect(tags).not.toContain('<b>');
    expect(head.querySelector('meta[property="og:title"]')?.getAttribute('content')).toBe(
      'Pilates "clínico" & <b>fisio</b>'
    );
  });

  it('um "</script>" no texto não encerra o bloco de dados estruturados', () => {
    const tags = buildHeadTags({ ...INPUT, description: 'antes </script><p>depois' });
    const head = parseHead(tags);
    const block = head.querySelector('script[type="application/ld+json"]');

    expect(head.querySelector('p')).toBeNull();
    expect(JSON.parse(block?.textContent ?? '').description).toBe('antes </script><p>depois');
  });
});

describe('buildStructuredData', () => {
  it('descreve o studio como um negócio de saúde, com nome, endereço do site e imagem', () => {
    const data = buildStructuredData(INPUT);

    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('MedicalBusiness');
    expect(data.name).toBe(SITE_NAME);
    expect(data.url).toBe('https://studio.example/');
    expect(data.image).toBe('https://studio.example/og-image.jpg');
  });

  it('traz o endereço nos campos do schema.org e o telefone no formato internacional', () => {
    const data = buildStructuredData(INPUT);

    expect(data.address).toEqual({
      '@type': 'PostalAddress',
      streetAddress: 'Rua de Teste, 10',
      addressLocality: 'Cidade',
      addressRegion: 'MG',
      postalCode: '00000-000',
      addressCountry: 'BR'
    });
    expect(data.telephone).toBe('+5500000000000');
    expect(data.hasMap).toBe('https://maps.example/studio');
    expect(data.sameAs).toEqual(['https://instagram.example/studio']);
  });
});

describe('buildRobotsTxt', () => {
  it('libera a página inteira e aponta para o sitemap, sem barra dobrada', () => {
    expect(buildRobotsTxt('https://studio.example/')).toBe(
      'User-agent: *\nAllow: /\n\nSitemap: https://studio.example/sitemap.xml\n'
    );
  });
});

describe('buildSitemapXml', () => {
  it('lista a única página da landing, com a data do build', () => {
    const xml = buildSitemapXml('https://studio.example/', new Date('2026-10-11T15:00:00Z'));
    const document = new DOMParser().parseFromString(xml, 'application/xml');

    expect(document.querySelector('parsererror')).toBeNull();
    expect(document.querySelectorAll('url')).toHaveLength(1);
    expect(document.querySelector('loc')?.textContent).toBe('https://studio.example/');
    expect(document.querySelector('lastmod')?.textContent).toBe('2026-10-11');
  });
});
