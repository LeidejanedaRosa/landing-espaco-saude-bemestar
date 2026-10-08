import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

// Área útil do navegador em notebook, desktop e tablet. No celular a seção cresce um pouco.
const FULL_SCREEN_SIZES = [
  { width: 1280, height: 600 },
  { width: 1366, height: 625 },
  { width: 1440, height: 780 },
  { width: 1920, height: 950 },
  { width: 1024, height: 650 },
  { width: 768, height: 950 }
];

function contact(page: Page) {
  const section = page.locator('#contato');

  return {
    section,
    title: section.getByRole('heading', { level: 2, name: /priorize o que realmente importa/i }),
    schedule: section.getByRole('link', { name: /agendar avaliação/i }),
    map: section.getByRole('link', { name: /ver no mapa/i }),
    address: section.locator('address'),
    instagram: section.getByRole('link', { name: /^@/ })
  };
}

test.describe('seção Contato', () => {
  for (const size of FULL_SCREEN_SIZES) {
    test(`em ${size.width}x${size.height}, a seção inteira cabe na tela, sem rolar`, async ({
      page
    }) => {
      await page.setViewportSize(size);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/#contato');
      const { section, title, instagram } = contact(page);
      await expect(instagram).toBeInViewport({ ratio: 1 });
      await expect(title).toBeInViewport({ ratio: 1 });

      const header = await page.getByRole('banner').boundingBox();
      const box = await section.boundingBox();
      if (!header || !box) throw new Error('seção incompleta');

      expect(Math.round(box.height)).toBeLessThanOrEqual(size.height - header.height);
    });
  }

  test('a ação principal abre o WhatsApp com a mensagem de agendamento, e não há formulário', async ({
    page
  }) => {
    await page.goto('/');
    const { schedule } = contact(page);

    const url = new URL((await schedule.getAttribute('href')) ?? '');

    expect(url.origin).toBe('https://wa.me');
    expect(url.searchParams.get('text')).toBe('Olá! Gostaria de agendar uma avaliação.');
    await expect(page.locator('form')).toHaveCount(0);
  });

  test('mostra o endereço do studio e leva ao mapa em nova aba', async ({ page }) => {
    await page.goto('/');
    const { address, map } = contact(page);

    await expect(address).toContainText('Av. Comendador Costa, 505, Centro');
    await expect(address).toContainText('São Lourenço, Minas Gerais');
    await expect(map).toHaveAttribute('target', '_blank');
    await expect(map).toHaveAttribute('rel', 'noopener noreferrer');
    expect(await map.getAttribute('href')).toContain('google.com/maps');
  });

  test('no desktop, a chamada fica à esquerda e os contatos à direita', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');
    const { schedule, address } = contact(page);

    const scheduleBox = await schedule.boundingBox();
    const addressBox = await address.boundingBox();

    expect((scheduleBox?.x ?? 0) + (scheduleBox?.width ?? 0)).toBeLessThan(addressBox?.x ?? 0);
  });

  for (const width of [390, 320]) {
    test(`no celular (${width}px), a chamada vem antes dos contatos, sem rolagem horizontal`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 664 });
      await page.goto('/');
      const { section, schedule, address } = contact(page);
      await section.scrollIntoViewIfNeeded();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      const scheduleBox = await schedule.boundingBox();
      const addressBox = await address.boundingBox();

      expect(overflow).toBe(0);
      expect((scheduleBox?.y ?? 0) + (scheduleBox?.height ?? 0)).toBeLessThan(addressBox?.y ?? 0);
    });
  }

  test('a seção não tem violações de acessibilidade', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await contact(page).section.scrollIntoViewIfNeeded();

    const { violations } = await new AxeBuilder({ page }).include('#contato').analyze();

    expect(violations).toEqual([]);
  });
});
