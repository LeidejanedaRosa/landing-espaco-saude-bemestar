// Gera public/og-image.jpg a partir da arte em design/og-image.html.
// Roda sob demanda (`npm run og-image`), e não no build: a imagem fica versionada.
import { chromium } from '@playwright/test';

// As funções passadas a `page.evaluate` rodam dentro do navegador, onde `document` existe.
/* global document */

const SIZE = { width: 1200, height: 630 };
const template = new URL('../design/og-image.html', import.meta.url);
const output = new URL('../public/og-image.jpg', import.meta.url);

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: SIZE });
  await page.goto(template.href);
  await page.evaluate(() => document.fonts.ready);

  const missingFonts = await page.evaluate(() =>
    ['"Playfair Display"', '"Great Vibes"', 'Poppins'].filter(
      (font) => !document.fonts.check(`20px ${font}`)
    )
  );
  if (missingFonts.length > 0) {
    throw new Error(`Fontes não carregadas: ${missingFonts.join(', ')}. Rode npm ci.`);
  }

  await page.screenshot({ path: output.pathname, type: 'jpeg', quality: 90 });
} finally {
  await browser.close();
}
