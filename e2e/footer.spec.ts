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

  test('a chamada final abre o WhatsApp com a mensagem de agendamento, e não há formulário', async ({
    page
  }) => {
    await page.goto('/');
    const section = page.getByRole('contentinfo');

    const href = await section
      .getByRole('link', { name: /agendar avaliação/i })
      .getAttribute('href');
    const url = new URL(href ?? '');
    const map = section.getByRole('link', { name: /ver no mapa/i });

    expect(url.origin).toBe('https://wa.me');
    expect(url.searchParams.get('text')).toBe('Olá! Gostaria de agendar uma avaliação.');
    expect(await map.getAttribute('href')).toContain('google.com/maps');
    await expect(map).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(page.locator('form')).toHaveCount(0);
  });

  test('o contato aparece uma vez só na página: endereço, WhatsApp e Instagram ficam no rodapé', async ({
    page
  }) => {
    await page.goto('/');
    const footer = page.getByRole('contentinfo');

    await expect(page.getByText(/Av\. Comendador Costa, 505/)).toHaveCount(1);
    await expect(page.locator('#contato')).toHaveCount(1);
    await expect(footer.locator('#contato')).toHaveCount(1);
    await expect(footer.getByRole('link', { name: /^whatsapp/i })).toHaveAttribute(
      'target',
      '_blank'
    );
    await expect(footer.getByRole('link', { name: /^instagram/i })).toHaveAttribute(
      'target',
      '_blank'
    );
  });

  test('o logo carrega em formato moderno e os botões de ícone têm área de toque de pelo menos 44px', async ({
    page
  }) => {
    await page.goto('/');
    const footer = page.getByRole('contentinfo');
    await footer.scrollIntoViewIfNeeded();
    const logo = footer.getByRole('img', { name: /luiza — espaço/i });

    await expect
      .poll(() => logo.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
    expect(await logo.evaluate((img: HTMLImageElement) => img.currentSrc)).toMatch(
      /\.(avif|webp)$/
    );
    for (const name of [/^whatsapp/i, /^instagram/i]) {
      const box = await footer.getByRole('link', { name }).boundingBox();
      expect(box?.width).toBeGreaterThanOrEqual(48);
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('os ícones de rede reagem ao mouse, e ficam parados para quem pediu menos movimento', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');
    const whatsApp = page.getByRole('contentinfo').getByRole('link', { name: /^whatsapp/i });
    // rolagem instantânea: com a suave, o mouse chegaria antes de a página parar
    await page.evaluate(() =>
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })
    );
    await expect(whatsApp).toBeInViewport({ ratio: 1 });

    await whatsApp.hover();
    await expect(whatsApp).toHaveCSS('scale', '1.1');

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await whatsApp.hover();
    await expect(whatsApp).toHaveCSS('scale', '1');
  });

  test('no desktop, os botões de ação ficam embaixo dos ícones de rede', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');
    const footer = page.getByRole('contentinfo');
    await footer.scrollIntoViewIfNeeded();

    const icon = await footer.getByRole('link', { name: /^instagram/i }).boundingBox();
    const schedule = await footer.getByRole('link', { name: /agendar avaliação/i }).boundingBox();

    expect(schedule?.y ?? 0).toBeGreaterThanOrEqual((icon?.y ?? 0) + (icon?.height ?? 0));
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
