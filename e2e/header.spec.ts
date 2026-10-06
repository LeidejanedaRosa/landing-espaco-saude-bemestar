import { expect, test } from '@playwright/test';

test.describe('header no desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('mostra a navegação inteira, sem botão de menu', async ({ page }) => {
    await page.goto('/');

    const nav = page.getByRole('navigation', { name: 'Principal' });

    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link')).toHaveCount(6);
    await expect(page.getByRole('button', { name: /menu/i })).toBeHidden();
  });

  test('o botão Agendar leva ao WhatsApp com mensagem preenchida', async ({ page }) => {
    await page.goto('/');

    const href = await page.getByRole('link', { name: /agendar/i }).getAttribute('href');
    const url = new URL(href ?? '');

    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toMatch(/^\/\d{12,13}$/);
    expect(url.searchParams.get('text')).toContain('agendar');
  });

  test('continua visível depois de rolar a página', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 400 });
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));

    await expect(page.getByRole('banner')).toBeInViewport();
  });
});

test.describe('header no celular', () => {
  test.use({ viewport: { width: 375, height: 700 } });

  test('esconde a navegação até o menu ser aberto', async ({ page }) => {
    await page.goto('/');

    const nav = page.getByRole('navigation', { name: 'Principal' });
    const menuButton = page.getByRole('button', { name: 'Abrir menu' });

    await expect(nav).toBeHidden();

    await menuButton.click();

    await expect(nav).toBeVisible();
    await expect(page.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  test('fecha o menu com Esc e devolve o foco ao botão', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir menu' }).click();

    await page.keyboard.press('Escape');

    await expect(page.getByRole('navigation', { name: 'Principal' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Abrir menu' })).toBeFocused();
  });

  test('o menu aberto não tem violações de acessibilidade nem rolagem horizontal', async ({
    page
  }) => {
    const { default: AxeBuilder } = await import('@axe-core/playwright');
    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir menu' }).click();

    const { violations } = await new AxeBuilder({ page }).analyze();
    const hasHorizontalScroll = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );

    expect(violations).toEqual([]);
    expect(hasHorizontalScroll).toBe(false);
  });
});
