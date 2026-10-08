import { expect, test, type Page } from '@playwright/test';

// Área útil do navegador, já descontadas as barras: um notebook de 1366x768 sobra com ~625px.
// Inclui tablet deitado e uma janela bem baixa (DevTools aberto embaixo).
const TWO_COLUMN_SIZES = [
  { width: 1024, height: 650 },
  { width: 1280, height: 600 },
  { width: 1366, height: 625 },
  { width: 1440, height: 496 },
  { width: 1440, height: 780 },
  { width: 1536, height: 730 },
  { width: 1920, height: 950 }
];

// Tablet em pé: frase à esquerda e figura à direita no topo, centradas; texto embaixo.
const TABLET_PORTRAIT_SIZES = [
  { width: 768, height: 950 },
  { width: 820, height: 1100 },
  { width: 912, height: 1250 }
];

// Área útil de celulares comuns, com as barras do navegador.
const PHONE_SIZES = [
  { width: 390, height: 664 },
  { width: 360, height: 640 },
  { width: 320, height: 568 }
];

// Janela de tablet bem baixa (DevTools aberto embaixo).
const SHORT_TABLET = { width: 768, height: 450 };

// O desenho principal do hero: a faixa das três bonecas ou a boneca da recepção.
function heroDrawing(page: Page) {
  return page.locator('main section').first().locator('picture img');
}

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

    const drawing = heroDrawing(page);
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
      // os números do hero, e não outra lista de definições da página
      const stats = await page
        .getByRole('region', { name: /saúde, movimento/i })
        .locator('dl')
        .boundingBox();

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
      const drawing = await heroDrawing(page).boundingBox();
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
      const drawing = await heroDrawing(page).boundingBox();
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

  // Celular e tablet em pé usam a faixa das três bonecas, no topo, com a frase sobre o
  // espaço vazio do canto superior esquerdo do desenho.
  for (const size of [...TABLET_PORTRAIT_SIZES, SHORT_TABLET, ...PHONE_SIZES]) {
    const label = `${size.width}x${size.height}`;

    test(`em ${label}, a faixa das três bonecas fica no topo, com a frase no canto, sem encostar nelas`, async ({
      page
    }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      const image = heroDrawing(page);
      const header = await page.getByRole('banner').boundingBox();
      const first = await page.getByText('Acredite!', { exact: true }).boundingBox();
      const second = await page.getByText('O movimento cura', { exact: true }).boundingBox();
      const drawing = await image.boundingBox();
      const heading = await page.getByRole('heading', { level: 1 }).boundingBox();
      if (!header || !first || !second || !drawing || !heading) throw new Error('hero incompleto');

      expect(await image.evaluate((img: HTMLImageElement) => img.currentSrc)).toContain('trio');
      await expect(image).toHaveCSS('opacity', '1');

      // nada cortado: abaixo do header, dentro da largura da tela, acima do título
      expect(first.y).toBeGreaterThanOrEqual(header.height);
      expect(drawing.x).toBeGreaterThanOrEqual(0);
      expect(drawing.x + drawing.width).toBeLessThanOrEqual(size.width);
      expect(drawing.y + drawing.height).toBeLessThanOrEqual(heading.y);

      // a frase: segunda linha sob o "!", tudo à esquerda da boneca em pé e acima das outras
      expect(second.x).toBeGreaterThan(first.x + first.width * 0.8);
      expect(first.x).toBeGreaterThanOrEqual(drawing.x);
      expect(second.x + second.width).toBeLessThanOrEqual(drawing.x + drawing.width * 0.75);
      expect(second.y + second.height).toBeLessThanOrEqual(drawing.y + drawing.height * 0.47);

      const horizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(horizontalOverflow).toBe(0);
    });
  }

  for (const size of TABLET_PORTRAIT_SIZES) {
    test(`no tablet em pé (${size.width}x${size.height}) o hero cabe na tela, com os números visíveis`, async ({
      page
    }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);

      const heading = await page.getByRole('heading', { level: 1 }).boundingBox();
      // os números do hero, e não outra lista de definições da página
      const stats = await page
        .getByRole('region', { name: /saúde, movimento/i })
        .locator('dl')
        .boundingBox();
      const drawing = await heroDrawing(page).boundingBox();
      if (!heading || !stats || !drawing) throw new Error('hero incompleto');

      expect(heading.width).toBeGreaterThan(size.width * 0.7);
      expect(stats.y + stats.height).toBeLessThanOrEqual(size.height);
      const leftSpace = drawing.x;
      const rightSpace = size.width - (drawing.x + drawing.width);
      expect(Math.abs(leftSpace - rightSpace)).toBeLessThanOrEqual(2);
    });
  }

  // O rosa vivo passa no contraste de texto grande (3:1), e não no de texto pequeno (4,5:1).
  for (const width of [320, 340, 360, 390, 768, 1366]) {
    test(`em ${width}px, a frase da recepção usa o rosa vivo só quando tem tamanho de texto grande`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 700 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');

      const phrase = await page
        .getByText('Acredite!')
        .locator('xpath=ancestor::p[1]')
        .evaluate((element) => {
          const style = getComputedStyle(element);
          return { size: Number.parseFloat(style.fontSize), color: style.color };
        });
      const ROSE_VIVID = 'rgb(190, 90, 95)';
      const ROSE_INK = 'rgb(142, 73, 68)';

      expect(phrase.color).toBe(phrase.size >= 24 ? ROSE_VIVID : ROSE_INK);
    });
  }
});
