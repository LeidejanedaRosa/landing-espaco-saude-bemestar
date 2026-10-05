import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('página inicial', () => {
  test('mostra o título principal em português', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Luiza — Espaço Saúde e Bem-estar'
    );
  });

  test('entrega o conteúdo no HTML, sem depender de JavaScript', async ({ request }) => {
    const response = await request.get('/');
    const html = await response.text();

    expect(response.ok()).toBe(true);
    expect(html).toMatch(/<h1[^>]*>Luiza — Espaço Saúde e Bem-estar<\/h1>/);
  });

  test('não tem violações de acessibilidade detectáveis automaticamente', async ({ page }) => {
    await page.goto('/');

    const { violations } = await new AxeBuilder({ page }).analyze();

    expect(violations).toEqual([]);
  });
});
