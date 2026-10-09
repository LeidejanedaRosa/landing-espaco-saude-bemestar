import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('rodapé', () => {
  test('fecha a página em verde-oliva, com texto claro, de borda a borda', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 950 });
    await page.goto('/');
    const footer = page.getByRole('contentinfo');
    await footer.scrollIntoViewIfNeeded();

    const box = await footer.boundingBox();
    const colors = await footer
      .locator('> div')
      .last()
      .evaluate((element) => {
        const style = getComputedStyle(element);
        return { background: style.backgroundColor, text: style.color };
      });
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);

    expect(box?.x).toBe(0);
    expect(box?.width).toBe(1920);
    expect(
      Math.round((box?.y ?? 0) + (box?.height ?? 0) + (await page.evaluate(() => window.scrollY)))
    ).toBe(pageHeight);
    expect(colors.background).toBe('rgb(86, 94, 66)');
    expect(colors.text).toBe('rgb(249, 237, 230)');
  });

  test('os links de navegação do rodapé levam às seções', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Rodapé' });

    await nav.getByRole('link', { name: 'Serviços' }).click();

    await expect(
      page.getByRole('heading', { level: 2, name: /o que luiza espaço/i })
    ).toBeInViewport();
  });

  test('mostra as duas profissionais, os registros e o ano atual', async ({ page }) => {
    await page.goto('/');
    const footer = page.getByRole('contentinfo');

    await expect(footer).toContainText('CREFITO 4 MG 213042-F');
    await expect(footer).toContainText('CRM MG 98407');
    await expect(footer).toContainText(`© ${new Date().getFullYear()} Luiza`);
  });

  for (const width of [390, 320]) {
    test(`no celular (${width}px), o rodapé não gera rolagem horizontal`, async ({ page }) => {
      await page.setViewportSize({ width, height: 664 });
      await page.goto('/');
      await page.getByRole('contentinfo').scrollIntoViewIfNeeded();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );

      expect(overflow).toBe(0);
    });
  }

  test('o rodapé não tem violações de acessibilidade', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.getByRole('contentinfo').scrollIntoViewIfNeeded();

    const { violations } = await new AxeBuilder({ page }).include('footer').analyze();

    expect(violations).toEqual([]);
  });
});
