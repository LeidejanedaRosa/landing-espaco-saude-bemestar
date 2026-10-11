import { expect, test } from '@playwright/test';

test.describe('imagens', () => {
  test('o logo é servido em formato moderno e carrega de verdade', async ({ page }) => {
    await page.goto('/');

    const logo = page.locator('header picture img');
    await expect(logo).toBeVisible();

    const { currentSrc, naturalWidth } = await logo.evaluate((img: HTMLImageElement) => ({
      currentSrc: img.currentSrc,
      naturalWidth: img.naturalWidth
    }));

    expect(currentSrc).toMatch(/\.(avif|webp)$/);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test('nenhum PNG ou JPEG é baixado pela página, fora os ícones do navegador', async ({
    page
  }) => {
    const heavyImages: string[] = [];
    page.on('request', (request) => {
      if (/\.(png|jpe?g)(\?|$)/i.test(request.url())) heavyImages.push(request.url());
    });

    await page.goto('/', { waitUntil: 'networkidle' });
    // Favicon e ícone de tela inicial são a exceção: navegadores só os aceitam em PNG, e são
    // dois arquivos pequenos declarados no <head>, e não imagens do conteúdo.
    const icons = await page
      .locator('link[rel="icon"], link[rel="apple-touch-icon"]')
      .evaluateAll((links) => links.map((link) => (link as HTMLLinkElement).href));

    expect(icons).toHaveLength(2);
    expect(heavyImages.filter((url) => !icons.includes(url))).toEqual([]);
  });

  test('o HTML do build e o React concordam (sem erro de hidratação no console)', async ({
    page
  }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('/', { waitUntil: 'networkidle' });

    expect(errors).toEqual([]);
  });
});
