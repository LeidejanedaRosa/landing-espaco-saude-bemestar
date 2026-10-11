import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('página inicial', () => {
  test('mostra o título principal em português', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Saúde, movimento e bem-estar em um só espaço'
    );
  });

  test('entrega o conteúdo no HTML, sem depender de JavaScript', async ({ request }) => {
    const response = await request.get('/');
    const html = await response.text();

    expect(response.ok()).toBe(true);
    expect(html).toMatch(/<h1[^>]*>Saúde, movimento e/);
  });

  test('não tem violações de acessibilidade detectáveis automaticamente', async ({ page }) => {
    await page.goto('/');

    const { violations } = await new AxeBuilder({ page }).analyze();

    expect(violations).toEqual([]);
  });

  test('aplica a tipografia da marca com fontes servidas pelo próprio site', async ({ page }) => {
    const fontHosts = new Set<string>();
    page.on('request', (request) => {
      if (request.resourceType() === 'font') fontHosts.add(new URL(request.url()).host);
    });

    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);

    const fontFamilyOf = (selector: string) =>
      page
        .locator(selector)
        .first()
        .evaluate((element) => getComputedStyle(element).fontFamily);

    expect(await fontFamilyOf('h1')).toContain('Playfair Display');
    expect(await fontFamilyOf('main p')).toContain('Poppins');
    expect([...fontHosts]).toEqual([new URL(page.url()).host]);
  });
});
