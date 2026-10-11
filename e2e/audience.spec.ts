import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('seção Para quem o pilates é indicado', () => {
  for (const [label, width, columns] of [
    ['desktop', 1366, 6],
    ['tablet', 768, 3],
    ['celular', 390, 2],
    ['celular estreito', 320, 2]
  ] as const) {
    test(`os seis públicos ficam em ${columns} colunas no ${label}, sem linha incompleta nem rolagem horizontal`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');
      const items = page.locator('#para-quem').getByRole('listitem');
      await expect(items).toHaveCount(6);
      await items.first().scrollIntoViewIfNeeded();

      const tops = await items.evaluateAll((list) =>
        list.map((item) => Math.round(item.getBoundingClientRect().top))
      );
      const perRow = tops.filter((top) => top === tops[0]).length;
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );

      expect(perRow).toBe(columns);
      expect(6 % perRow).toBe(0);
      expect(overflow).toBe(0);
    });
  }

  test('a seção não tem violações de acessibilidade', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.locator('#para-quem').scrollIntoViewIfNeeded();

    const { violations } = await new AxeBuilder({ page }).include('#para-quem').analyze();

    expect(violations).toEqual([]);
  });
});
