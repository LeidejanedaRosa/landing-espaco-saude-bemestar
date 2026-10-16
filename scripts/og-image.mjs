// Gera public/og-image.jpg a partir da arte em design/og-image.html.
// Roda sob demanda (`npm run og-image`), e não no build: a imagem fica versionada.
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

// As funções passadas a `page.evaluate` rodam dentro do navegador, onde `document` existe.
/* global document */

const SIZE = { width: 1200, height: 630 };
// Cada família no peso exato que a arte usa. Conferir só a família não basta: o navegador
// aceita um peso vizinho no lugar, e um arquivo quebrado passaria despercebido.
const FONTS = [
  { family: 'Playfair Display', weight: '500' },
  { family: 'Playfair Display', weight: '600' },
  { family: 'Great Vibes', weight: '400' },
  { family: 'Poppins', weight: '500' }
];
const template = new URL('../design/og-image.html', import.meta.url);
// `fileURLToPath`, e não `.pathname`: o caminho sai sem `%20` nem `%C3%A7` quando a pasta tem
// espaço ou acento, e no formato certo em qualquer sistema operacional.
const output = fileURLToPath(new URL('../public/og-image.jpg', import.meta.url));

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: SIZE });
  await page.goto(template.href);
  await page.evaluate(() => document.fonts.ready);

  const fontStatus = await page.evaluate(() =>
    [...document.fonts].map((face) => ({
      family: face.family.replaceAll('"', ''),
      weight: face.weight,
      status: face.status
    }))
  );
  const missingFonts = FONTS.filter(
    (font) =>
      !fontStatus.some(
        (face) =>
          face.family === font.family && face.weight === font.weight && face.status === 'loaded'
      )
  ).map((font) => `${font.family} ${font.weight}`);
  if (missingFonts.length > 0) {
    throw new Error(`Fontes não carregadas: ${missingFonts.join(', ')}. Rode npm ci.`);
  }

  await page.screenshot({ path: output, type: 'jpeg', quality: 90 });
} finally {
  await browser.close();
}
