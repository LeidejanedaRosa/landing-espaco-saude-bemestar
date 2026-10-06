import { expect, test } from '@playwright/test';

// Área útil do navegador, já descontadas as barras: um notebook de 1366x768 sobra com ~625px.
// Inclui tablet em pé e deitado, e uma janela bem baixa (DevTools aberto embaixo).
const TWO_COLUMN_SIZES = [
  { width: 768, height: 950 },
  { width: 1024, height: 650 },
  { width: 1280, height: 600 },
  { width: 1366, height: 625 },
  { width: 1440, height: 496 },
  { width: 1440, height: 780 },
  { width: 1536, height: 730 },
  { width: 1920, height: 950 }
];

test.describe('hero', () => {
  test('mostra o título, a frase da recepção e as duas ações', async ({ page }) => {
    await page.goto('/');

    const hero = page.getByRole('region', { name: /saúde, movimento e bem-estar/i });

    await expect(hero.getByText('Acredite! O movimento cura')).toBeVisible();
    await expect(hero.getByRole('link', { name: /agendar avaliação/i })).toBeVisible();
    await expect(hero.getByRole('link', { name: 'Conhecer o studio' })).toHaveAttribute(
      'href',
      '#studio'
    );
  });

  test('o desenho em traço é um SVG e carrega de verdade', async ({ page }) => {
    await page.goto('/');

    const drawing = page.locator('main img[src*="guerreira"]');
    await expect(drawing).toBeVisible();

    const naturalWidth = await drawing.evaluate((img: HTMLImageElement) => img.naturalWidth);

    expect(naturalWidth).toBeGreaterThan(0);
  });

  for (const size of TWO_COLUMN_SIZES) {
    const label = `${size.width}x${size.height}`;

    test(`cabe inteiro na tela, com os números visíveis, em ${label}`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      const header = await page.getByRole('banner').boundingBox();
      const hero = await page.getByRole('region', { name: /saúde, movimento/i }).boundingBox();
      const stats = await page.getByRole('main').locator('dl').boundingBox();

      expect(Math.round((header?.height ?? 0) + (hero?.height ?? 0))).toBe(size.height);
      expect((stats?.y ?? 0) + (stats?.height ?? 0)).toBeLessThanOrEqual(size.height);
    });

    test(`fica em duas colunas, com o desenho usando a altura disponível, em ${label}`, async ({
      page
    }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      const heading = await page.getByRole('heading', { level: 1 }).boundingBox();
      const hero = await page.getByRole('region', { name: /saúde, movimento/i }).boundingBox();
      const drawing = await page.locator('main img[src*="guerreira"]').boundingBox();
      if (!heading || !hero || !drawing) throw new Error('hero incompleto');

      expect(drawing.x).toBeGreaterThan(heading.x + heading.width);
      expect(drawing.y).toBeGreaterThanOrEqual(hero.y);
      expect(drawing.y + drawing.height).toBeLessThanOrEqual(hero.y + hero.height);

      // Ou o desenho ocupa quase toda a altura, ou já bateu no limite de largura da coluna
      // (o caso do tablet em pé, onde a coluna é estreita e alta).
      const column = (size.width - heading.x * 2) * (6 / 11);
      const fillsHeight = drawing.height >= hero.height * 0.75;
      const fillsWidth = drawing.width >= column * 0.7;
      expect(fillsHeight || fillsWidth).toBe(true);
    });

    test(`a frase fica como na parede da recepção em ${label}`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      const first = await page.getByText('Acredite!', { exact: true }).boundingBox();
      const second = await page.getByText('O movimento cura', { exact: true }).boundingBox();
      const drawing = await page.locator('main img[src*="guerreira"]').boundingBox();
      if (!first || !second || !drawing) throw new Error('frase ou desenho não encontrados');

      // "O movimento cura" começa embaixo do "!", que ocupa o último décimo de "Acredite!".
      expect(second.y).toBeGreaterThan(first.y);
      expect(second.x).toBeGreaterThan(first.x + first.width * 0.8);
      expect(second.x).toBeLessThan(first.x + first.width);

      // A frase termina antes do braço erguido e acima da cabeça da figura, sem encostar.
      expect(second.x + second.width).toBeLessThanOrEqual(drawing.x + drawing.width * 0.52);
      expect(second.y + second.height).toBeLessThanOrEqual(drawing.y + drawing.height * 0.24);
    });
  }

  // Área útil de um celular comum com as barras do navegador.
  for (const size of [
    { width: 390, height: 664 },
    { width: 360, height: 640 },
    { width: 320, height: 568 }
  ]) {
    const label = `${size.width}x${size.height}`;

    test(`no celular (${label}) o desenho vem no topo, inteiro e nítido, com a frase junto`, async ({
      page
    }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      const image = page.locator('main img[src*="guerreira"]');
      const first = await page.getByText('Acredite!', { exact: true }).boundingBox();
      const second = await page.getByText('O movimento cura', { exact: true }).boundingBox();
      const drawing = await image.boundingBox();
      if (!first || !second || !drawing) throw new Error('frase ou desenho não encontrados');

      const heading = await page.getByRole('heading', { level: 1 }).boundingBox();
      expect(drawing.y + drawing.height).toBeLessThanOrEqual(heading?.y ?? 0);

      await expect(image).toHaveCSS('opacity', '1');
      expect(drawing.x).toBeGreaterThanOrEqual(0);
      expect(drawing.x + drawing.width).toBeLessThanOrEqual(size.width);
      expect(first.x).toBeGreaterThanOrEqual(0);

      expect(second.x).toBeGreaterThan(first.x + first.width * 0.8);
      expect(second.x + second.width).toBeLessThanOrEqual(drawing.x + drawing.width * 0.52);
      expect(second.y + second.height).toBeLessThanOrEqual(drawing.y + drawing.height * 0.24);

      const horizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(horizontalOverflow).toBe(0);
    });
  }
});
