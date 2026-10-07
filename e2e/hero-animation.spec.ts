import { expect, test, type Locator, type Page } from '@playwright/test';

const DESKTOP = { width: 1366, height: 625 };
const PHONE = { width: 390, height: 664 };

function heroParts(page: Page) {
  const hero = page.locator('main section').first();

  return {
    firstLine: hero.getByText('Acredite!', { exact: true }),
    secondLine: hero.getByText('O movimento cura', { exact: true }),
    drawing: hero.locator('picture img')
  };
}

function animationOf(element: Locator) {
  return element.evaluate((node) => {
    const [animation] = node.getAnimations();
    if (!animation) return null;
    const timing = animation.effect?.getComputedTiming();

    return {
      name: (animation as CSSAnimation).animationName,
      delay: Number(timing?.delay ?? 0),
      duration: Number(timing?.duration ?? 0)
    };
  });
}

async function waitUntilDrawn(element: Locator) {
  await element.evaluate((node) =>
    Promise.all(node.getAnimations().map((animation) => animation.finished))
  );
}

test.describe('animação do hero', () => {
  test('a frase é escrita linha a linha e só depois o desenho é riscado', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/');
    const { firstLine, secondLine, drawing } = heroParts(page);

    const first = await animationOf(firstLine);
    const second = await animationOf(secondLine);
    const art = await animationOf(drawing);
    if (!first || !second || !art) throw new Error('alguma parte do hero não está animada');

    expect(first.delay).toBeLessThan(second.delay);
    expect(first.delay + first.duration).toBeLessThanOrEqual(second.delay + 1);
    expect(second.delay + second.duration).toBeLessThanOrEqual(art.delay + 250);
    expect(art.duration).toBeGreaterThan(1000);
  });

  test('a animação inteira termina em menos de cinco segundos', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/');

    const art = await animationOf(heroParts(page).drawing);

    expect((art?.delay ?? 0) + (art?.duration ?? 0)).toBeLessThan(5000);
  });

  test('a boneca em pé é riscada de cima para baixo; a faixa, da esquerda para a direita', async ({
    page
  }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto('/');
    expect((await animationOf(heroParts(page).drawing))?.name).toBe('reveal-down');

    await page.setViewportSize(PHONE);
    await page.goto('/');
    expect((await animationOf(heroParts(page).drawing))?.name).toBe('reveal-right');
  });

  for (const [label, size] of [
    ['desktop', DESKTOP],
    ['celular', PHONE]
  ] as const) {
    test(`ao terminar, nada fica cortado no ${label}`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      const parts = heroParts(page);

      for (const part of Object.values(parts)) {
        await waitUntilDrawn(part);
        const clip = await part.evaluate((node) => getComputedStyle(node).clipPath);

        // recorte final negativo: deixa passar até as pontas das letras cursivas
        expect(clip).not.toContain('100%');
        expect(clip).toMatch(/^inset\(-/);
      }
    });
  }

  test('quem pediu menos movimento vê tudo pronto, sem animação nem recorte', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize(DESKTOP);
    await page.goto('/');

    for (const part of Object.values(heroParts(page))) {
      expect(await animationOf(part)).toBeNull();
      expect(await part.evaluate((node) => getComputedStyle(node).clipPath)).toBe('none');
    }
  });
});
