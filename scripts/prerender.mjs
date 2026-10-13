import { readFile, rm, writeFile } from 'node:fs/promises';

const APP_PLACEHOLDER = '<!--app-html-->';
const SEO_PLACEHOLDER = '<!--seo-head-->';
const distDir = new URL('../dist/', import.meta.url);
const htmlPath = new URL('index.html', distDir);
const ssrDir = new URL('../dist-ssr/', import.meta.url);

const { render, renderSeo } = await import(new URL('entry-server.js', ssrDir).href);
const template = await readFile(htmlPath, 'utf8');

for (const placeholder of [APP_PLACEHOLDER, SEO_PLACEHOLDER]) {
  if (!template.includes(placeholder)) {
    throw new Error(`Marcador ${placeholder} não encontrado em dist/index.html`);
  }
}

// Título e descrição existem só no index.html; as tags de compartilhamento os repetem.
const title = template.match(/<title>([^<]*)<\/title>/)?.[1];
const description = template.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1];
if (!title || !description) {
  throw new Error('Título ou descrição não encontrados em dist/index.html');
}

const seo = renderSeo({ title, description }, new Date());

// Função em vez de string: numa string, o replace interpreta `$&`, `$'` e `$$` como padrões
// especiais e corromperia qualquer texto da página que contenha essas sequências.
await writeFile(
  htmlPath,
  template.replace(SEO_PLACEHOLDER, () => seo.headTags).replace(APP_PLACEHOLDER, () => render())
);
await writeFile(new URL('robots.txt', distDir), seo.robotsTxt);
await writeFile(new URL('sitemap.xml', distDir), seo.sitemapXml);
await rm(ssrDir, { recursive: true });
