import { expect, test } from '@playwright/test';

test.describe('header no desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('mostra a navegação inteira, sem botão de menu', async ({ page }) => {
    await page.goto('/');

    const nav = page.getByRole('navigation', { name: 'Principal' });

    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link')).toHaveCount(8);
    await expect(page.getByRole('button', { name: /menu/i })).toBeHidden();
  });

  test('o menu lista as oito seções, na ordem em que aparecem na página', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');
    const links = page.getByRole('navigation', { name: 'Principal' }).getByRole('link');

    const labels = await links.allTextContents();
    const targets = await links.evaluateAll((list) =>
      list.map((link) => {
        const id = (link.getAttribute('href') ?? '').slice(1);
        const target = document.getElementById(id);
        return target ? target.getBoundingClientRect().top + window.scrollY : -1;
      })
    );

    expect(labels).toEqual([
      'Studio',
      'Serviços',
      'Sobre a Luiza',
      'Atendimento médico',
      'Metodologia',
      'Para quem é',
      'Depoimentos',
      'Contato'
    ]);
    expect(targets.every((top) => top > 0)).toBe(true);
    expect(targets).toEqual([...targets].sort((first, second) => first - second));
  });

  for (const width of [1024, 1100, 1280, 1920]) {
    test(`em ${width}px, os oito itens do menu cabem em uma linha, sem encostar no logo nem no botão`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 625 });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const banner = page.getByRole('banner');
      const links = banner.getByRole('navigation', { name: 'Principal' }).getByRole('link');

      const boxes = await links.evaluateAll((list) =>
        list.map((link) => {
          const box = link.getBoundingClientRect();
          return { top: Math.round(box.top), left: box.left, right: box.right };
        })
      );
      const logo = await banner.getByRole('img').boundingBox();
      const button = await banner.getByRole('link', { name: /^agendar/i }).boundingBox();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );

      expect(new Set(boxes.map((box) => box.top)).size).toBe(1);
      expect(boxes[0].left).toBeGreaterThanOrEqual((logo?.x ?? 0) + (logo?.width ?? 0) + 16);
      expect(boxes[boxes.length - 1].right).toBeLessThanOrEqual((button?.x ?? 0) - 16);
      expect(overflow).toBe(0);
    });
  }

  test('o botão Agendar leva ao WhatsApp com mensagem preenchida', async ({ page }) => {
    await page.goto('/');

    const href = await page
      .getByRole('banner')
      .getByRole('link', { name: /agendar/i })
      .getAttribute('href');
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
