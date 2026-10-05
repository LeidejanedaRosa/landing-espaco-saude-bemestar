import { readFile, rm, writeFile } from 'node:fs/promises';

const PLACEHOLDER = '<!--app-html-->';
const htmlPath = new URL('../dist/index.html', import.meta.url);
const ssrDir = new URL('../dist-ssr/', import.meta.url);

const { render } = await import(new URL('entry-server.js', ssrDir).href);
const template = await readFile(htmlPath, 'utf8');

if (!template.includes(PLACEHOLDER)) {
  throw new Error(`Marcador ${PLACEHOLDER} não encontrado em dist/index.html`);
}

await writeFile(htmlPath, template.replace(PLACEHOLDER, render()));
await rm(ssrDir, { recursive: true });
