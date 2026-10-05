import { expect, test } from '@playwright/test';

const MAX_CONTENT_WIDTH = 1440;

test.describe('container da página', () => {
  test('em tela muito larga, limita e centraliza o conteúdo, mas o fundo vai de borda a borda', async ({
    page
  }) => {
    await page.setViewportSize({ width: 2560, height: 1000 });
    await page.goto('/');

    const container = await page.getByRole('main').locator('> div').boundingBox();
    const background = await page.locator('#root > div').boundingBox();

    expect(container?.width).toBe(MAX_CONTENT_WIDTH);
    expect(container?.x).toBe((2560 - MAX_CONTENT_WIDTH) / 2);
    expect(background?.x).toBe(0);
    expect(background?.width).toBe(2560);
  });

  test('no celular, o conteúdo não encosta nas bordas nem gera rolagem horizontal', async ({
    page
  }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto('/');

    const heading = await page.getByRole('heading', { level: 1 }).boundingBox();
    const hasHorizontalScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );

    expect(heading?.x).toBeGreaterThanOrEqual(16);
    expect((heading?.x ?? 0) + (heading?.width ?? 0)).toBeLessThanOrEqual(320 - 16);
    expect(hasHorizontalScroll).toBe(false);
  });
});
