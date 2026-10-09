import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

function about(page: Page) {
  const section = page.locator('#sobre');

  return {
    section,
    photo: section.getByRole('img', { name: /luiza/i }),
    intro: section.getByText(/^Sou a Luiza/),
    credentials: section.getByRole('list', { name: 'Certificações e qualificações' })
  };
}

async function goToAbout(page: Page) {
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Principal' })
    .getByRole('link', { name: 'Sobre a Luiza' })
    .click();
  await expect(
    page.getByRole('heading', { level: 2, name: /atendimento individualizado/i })
  ).toBeInViewport();
}

test.describe('seção Sobre a Luiza', () => {
  test('o link do menu leva à seção, sem o header cobrir o título', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToAbout(page);
    const { section } = about(page);
    await expect
      .poll(async () => Math.round((await section.boundingBox())?.y ?? 0))
      .toBeLessThanOrEqual(90);

    const header = await page.getByRole('banner').boundingBox();
    const eyebrow = await section.getByText('Sobre a Luiza', { exact: true }).boundingBox();

    expect(eyebrow?.y).toBeGreaterThanOrEqual(header?.height ?? 0);
  });

  test('no desktop, a foto fica à esquerda e a apresentação à direita', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToAbout(page);
    const { photo, intro } = about(page);

    const photoBox = await photo.boundingBox();
    const introBox = await intro.boundingBox();

    expect((photoBox?.x ?? 0) + (photoBox?.width ?? 0)).toBeLessThanOrEqual(introBox?.x ?? 0);
  });

  for (const width of [390, 320]) {
    test(`no celular (${width}px), a foto vem antes do texto e nada gera rolagem horizontal`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 664 });
      await page.goto('/');
      const { photo, intro } = about(page);
      await photo.scrollIntoViewIfNeeded();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      const photoBox = await photo.boundingBox();
      const introBox = await intro.boundingBox();

      expect(overflow).toBe(0);
      expect((photoBox?.y ?? 0) + (photoBox?.height ?? 0)).toBeLessThanOrEqual(introBox?.y ?? 0);
    });
  }

  for (const [label, width, columns] of [
    ['desktop', 1366, 3],
    ['tablet', 768, 2],
    ['celular', 390, 1]
  ] as const) {
    test(`as seis certificações ficam em ${columns} coluna(s) no ${label}, sem linha incompleta`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      const items = about(page).credentials.getByRole('listitem');
      await expect(items).toHaveCount(6);

      const tops = await items.evaluateAll((list) =>
        list.map((item) => Math.round(item.getBoundingClientRect().top))
      );
      const perRow = tops.filter((top) => top === tops[0]).length;

      expect(perRow).toBe(columns);
      expect(6 % perRow).toBe(0);
    });
  }

  // WCAG 1.4.4: com o texto do navegador em 200%, nada pode ficar cortado.
  test('em 320px com a fonte do navegador dobrada, o título inteiro continua dentro do bloco', async ({
    page
  }) => {
    await page.setViewportSize({ width: 320, height: 664 });
    await page.goto('/');
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    const { section } = about(page);
    const title = page.getByRole('heading', { level: 2, name: /atendimento individualizado/i });
    await title.scrollIntoViewIfNeeded();

    const fits = await title.evaluate((heading) => {
      const block = heading.closest('.bg-olive-deep') as HTMLElement;
      const blockBox = block.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(heading);

      return [...range.getClientRects()].every(
        (line) => line.left >= blockBox.left && line.right <= blockBox.right
      );
    });

    await expect(section).toBeVisible();
    expect(fits).toBe(true);
  });

  test('a foto carrega em formato moderno, inteira dentro da moldura', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToAbout(page);
    const { photo } = about(page);

    await expect
      .poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
    const info = await photo.evaluate((img: HTMLImageElement) => ({
      src: img.currentSrc,
      fit: getComputedStyle(img).objectFit
    }));

    expect(info.src).toMatch(/\.(avif|webp)$/);
    expect(info.fit).toBe('cover');
  });

  test('o botão abre o WhatsApp para agendar uma avaliação', async ({ page }) => {
    await page.goto('/');

    const href = await about(page)
      .section.getByRole('link', { name: /agendar avaliação/i })
      .getAttribute('href');
    const url = new URL(href ?? '');

    expect(url.origin).toBe('https://wa.me');
    expect(url.searchParams.get('text')).toBe('Olá! Gostaria de agendar uma avaliação.');
  });

  test('a seção não tem violações de acessibilidade', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await about(page).section.scrollIntoViewIfNeeded();

    const { violations } = await new AxeBuilder({ page }).include('#sobre').analyze();

    expect(violations).toEqual([]);
  });
});
