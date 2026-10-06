import { expect, test } from '@playwright/test';

test.describe('imagens', () => {
  test('o logo é servido em formato moderno e carrega de verdade', async ({ page }) => {
    await page.goto('/');

    const logo = page.locator('main picture img');
    await expect(logo).toBeVisible();

    const { currentSrc, naturalWidth } = await logo.evaluate((img: HTMLImageElement) => ({
      currentSrc: img.currentSrc,
      naturalWidth: img.naturalWidth
    }));

    expect(currentSrc).toMatch(/\.(avif|webp)$/);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test('nenhum PNG ou JPEG é baixado pela página', async ({ page }) => {
    const heavyImages: string[] = [];
    page.on('request', (request) => {
      if (/\.(png|jpe?g)(\?|$)/i.test(request.url())) heavyImages.push(request.url());
    });

    await page.goto('/', { waitUntil: 'networkidle' });

    expect(heavyImages).toEqual([]);
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
