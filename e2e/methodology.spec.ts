import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

// Área útil do navegador em notebook, desktop e tablet. No celular a seção cresce: as quatro
// etapas, com o texto aprovado, não cabem em uma tela pequena.
const FULL_SCREEN_SIZES = [
  { width: 1280, height: 600 },
  { width: 1366, height: 625 },
  { width: 1440, height: 780 },
  { width: 1920, height: 950 },
  { width: 1024, height: 650 },
  { width: 768, height: 950 }
];

function methodology(page: Page) {
  const section = page.locator('#metodologia');

  return {
    section,
    steps: section.getByRole('listitem'),
    illustration: section.getByRole('img', { name: /ilustração de uma profissional/i }),
    commitment: section.getByText(/compromisso com a excelência/i).locator('xpath=ancestor::p[1]')
  };
}

test.describe('seção Metodologia', () => {
  for (const size of FULL_SCREEN_SIZES) {
    test(`em ${size.width}x${size.height}, a seção inteira cabe na tela, sem rolar`, async ({
      page
    }) => {
      await page.setViewportSize(size);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/#metodologia');
      const { section, commitment } = methodology(page);
      await expect(commitment).toBeInViewport({ ratio: 1 });

      const header = await page.getByRole('banner').boundingBox();
      const box = await section.boundingBox();
      if (!header || !box) throw new Error('seção incompleta');

      expect(Math.round(box.height)).toBeLessThanOrEqual(size.height - header.height);
      await expect(
        page.getByRole('heading', { level: 2, name: /técnica científica/i })
      ).toBeInViewport({ ratio: 1 });
    });
  }

  test('o link do menu leva à seção', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');

    await page
      .getByRole('navigation', { name: 'Principal' })
      .getByRole('link', { name: 'Metodologia' })
      .click();

    await expect(
      page.getByRole('heading', { level: 2, name: /técnica científica/i })
    ).toBeInViewport();
  });

  test('no desktop, a ilustração fica à esquerda e as quatro etapas em duas colunas', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');
    const { steps, illustration } = methodology(page);
    await expect(steps).toHaveCount(4);

    const image = await illustration.boundingBox();
    const boxes = await steps.evaluateAll((list) =>
      list.map((item) => {
        const box = item.getBoundingClientRect();
        return { x: box.x, y: Math.round(box.y) };
      })
    );

    expect((image?.x ?? 0) + (image?.width ?? 0)).toBeLessThanOrEqual(boxes[0].x);
    expect(boxes[0].y).toBe(boxes[1].y);
    expect(boxes[2].y).toBe(boxes[3].y);
    expect(boxes[2].y).toBeGreaterThan(boxes[0].y);
  });

  for (const width of [390, 320]) {
    test(`no celular (${width}px), as etapas ficam em uma coluna, na ordem, sem rolagem horizontal`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 664 });
      await page.goto('/');
      const { section, steps } = methodology(page);
      await section.scrollIntoViewIfNeeded();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      const tops = await steps.evaluateAll((list) =>
        list.map((item) => item.getBoundingClientRect().y)
      );

      expect(overflow).toBe(0);
      expect(tops).toEqual([...tops].sort((a, b) => a - b));
      expect(new Set(tops).size).toBe(4);
    });
  }

  test('a seção não tem violações de acessibilidade', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await methodology(page).section.scrollIntoViewIfNeeded();

    const { violations } = await new AxeBuilder({ page }).include('#metodologia').analyze();

    expect(violations).toEqual([]);
  });
});
