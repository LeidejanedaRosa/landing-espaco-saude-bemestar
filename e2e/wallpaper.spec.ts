import { expect, test } from '@playwright/test';

test.describe('papel de parede', () => {
  test('em tela muito larga, cobre a página de borda a borda, nas margens do conteúdo', async ({
    page
  }) => {
    await page.setViewportSize({ width: 2560, height: 900 });
    await page.goto('/');

    const wallpaper = page.locator('[data-wallpaper]');
    const box = await wallpaper.boundingBox();
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const content = await page.getByRole('main').locator('section > div').first().boundingBox();

    expect(box?.x).toBe(0);
    expect(box?.width).toBe(2560);
    expect(Math.round(box?.height ?? 0)).toBe(pageHeight);
    expect(content?.width).toBe(1280);

    const image = await wallpaper.evaluate((element) => getComputedStyle(element).backgroundImage);
    expect(image).toContain('bonecas');
  });

  test('o arquivo do papel de parede existe e é um SVG servido pelo próprio site', async ({
    page,
    request
  }) => {
    await page.goto('/');

    const image = await page
      .locator('[data-wallpaper]')
      .evaluate((element) => getComputedStyle(element).backgroundImage);
    const url = /url\("?([^")]+)"?\)/.exec(image)?.[1] ?? '';
    const response = await request.get(url);

    expect(new URL(url).host).toBe(new URL(page.url()).host);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('svg');
  });

  test('não captura cliques: os botões por cima continuam clicáveis', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Conhecer o studio' }).click();

    await expect(page).toHaveURL(/#studio$/);
  });

  test('tem só as bonecas em traço: as folhagens ficam nas seções, e não no fundo', async ({
    page,
    request
  }) => {
    await page.goto('/');
    const image = await page
      .locator('[data-wallpaper]')
      .evaluate((element) => getComputedStyle(element).backgroundImage);
    const url = /url\("?([^")]+)"?\)/.exec(image)?.[1] ?? '';

    const svg = await (await request.get(url)).text();

    expect(svg).toContain('guerreira');
    expect(svg).not.toContain('ramo');
    // verde-água e rosa claro eram as cores das folhagens
    expect(svg).not.toContain('#688f90');
    expect(svg).not.toContain('#cb847c');
  });
});
