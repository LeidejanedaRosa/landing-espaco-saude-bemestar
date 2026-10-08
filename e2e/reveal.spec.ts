import { expect, test } from '@playwright/test';

// O efeito usa animação ligada à rolagem (`animation-timeline: view()`). Navegador sem o
// recurso não anima: o conteúdo simplesmente já está na tela.
const content = '#studio > div';

test.describe('conteúdo surgindo ao rolar', () => {
  test('a seção surge com a rolagem onde o navegador tem o recurso, e fica como está onde não tem', async ({
    page
  }) => {
    await page.goto('/');
    const supported = await page.evaluate(() => CSS.supports('animation-timeline: view()'));

    const animation = await page
      .locator(content)
      .evaluate((element) => getComputedStyle(element).animationName);

    expect(animation).toBe(supported ? 'reveal-up' : 'none');
  });

  test('com a seção inteira na tela, o conteúdo está totalmente visível e no lugar', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');
    await page.getByRole('link', { name: 'Conhecer o studio' }).click();
    const section = page.locator('#studio');
    await expect
      .poll(async () => Math.round((await section.boundingBox())?.y ?? 0))
      .toBeLessThanOrEqual(90);

    const style = await page.locator(content).evaluate((element) => {
      const computed = getComputedStyle(element);
      return { opacity: computed.opacity, translate: computed.translate };
    });

    expect(style.opacity).toBe('1');
    expect(['none', '0px']).toContain(style.translate);
  });

  test('quem pediu menos movimento não tem animação', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const style = await page.locator(content).evaluate((element) => {
      const computed = getComputedStyle(element);
      return { animation: computed.animationName, opacity: computed.opacity };
    });

    expect(style).toEqual({ animation: 'none', opacity: '1' });
  });
});
