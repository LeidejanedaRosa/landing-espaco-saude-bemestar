import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

function testimonials(page: Page) {
  const section = page.locator('#depoimentos');

  return {
    section,
    cards: section.getByRole('list').first().getByRole('listitem'),
    reviews: section.getByRole('link', { name: /ver todas as avaliações no google/i })
  };
}

async function settle(page: Page) {
  // espera a rolagem suave da página terminar, para o mouse não chegar com ela andando
  await expect
    .poll(
      () =>
        page.locator('#depoimentos').evaluate(async (section) => {
          const before = section.getBoundingClientRect().top;
          await new Promise((resolve) => setTimeout(resolve, 100));
          return section.getBoundingClientRect().top === before;
        }),
      { timeout: 15_000 }
    )
    .toBe(true);
}

test.describe('seção Depoimentos', () => {
  test('o link do menu leva à seção, sem o header cobrir o título', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');

    await page
      .getByRole('navigation', { name: 'Principal' })
      .getByRole('link', { name: 'Depoimentos' })
      .click();
    const title = page.getByRole('heading', { level: 2, name: 'O que dizem sobre nós' });
    await expect(title).toBeInViewport({ ratio: 1 });
    await settle(page);

    const header = await page.getByRole('banner').boundingBox();
    const eyebrow = await page
      .locator('#depoimentos')
      .getByText('Depoimentos', { exact: true })
      .boundingBox();

    expect(eyebrow?.y).toBeGreaterThanOrEqual(header?.height ?? 0);
  });

  test('no desktop, os três cartões ficam lado a lado, com a foto saltando para fora do topo', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 700 });
    await page.goto('/');
    const { section, cards } = testimonials(page);
    await section.scrollIntoViewIfNeeded();
    await expect(cards).toHaveCount(3);

    const boxes = await cards.evaluateAll((list) =>
      list.map((card) => {
        const box = card.getBoundingClientRect();
        const photo = (card.querySelector('picture img') as HTMLElement).getBoundingClientRect();
        return { top: Math.round(box.top), left: box.left, photoTop: photo.top };
      })
    );

    expect(new Set(boxes.map((box) => box.top)).size).toBe(1);
    expect(boxes[0].left).toBeLessThan(boxes[1].left);
    expect(boxes[1].left).toBeLessThan(boxes[2].left);
    for (const box of boxes) expect(box.photoTop).toBeLessThan(box.top);
  });

  test('o cartão mostra o começo do depoimento e abre inteiro com o mouse', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 700 });
    await page.goto('/');
    const { section, cards } = testimonials(page);
    await section.scrollIntoViewIfNeeded();
    await settle(page);
    const quote = cards.nth(1).locator('blockquote');
    const isCut = () =>
      quote.evaluate((element) => element.scrollHeight > element.clientHeight + 1);

    expect(await isCut()).toBe(true);

    await expect(async () => {
      await cards.nth(1).hover();
      await expect.poll(isCut, { timeout: 3000 }).toBe(false);
    }).toPass();
  });

  test('o cartão também abre com o foco do teclado', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 700 });
    await page.goto('/');
    const { section, cards } = testimonials(page);
    await section.scrollIntoViewIfNeeded();
    await settle(page);
    // tira o mouse de cima dos cartões: o teste é só do teclado
    await page.mouse.move(2, 2);
    const quote = cards.first().locator('blockquote');

    // No WebKit o `:focus` só casa quando a janela está ativa. Com vários navegadores abertos
    // em paralelo ela pode não estar; por isso traz a janela para a frente e tenta de novo.
    await expect(async () => {
      await page.bringToFront();
      await cards.first().focus();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Tab');

      await expect(cards.first()).toBeFocused();
      await expect
        .poll(() => quote.evaluate((element) => element.scrollHeight > element.clientHeight + 1), {
          timeout: 3000
        })
        .toBe(false);
    }).toPass();
  });

  test('o cartão fica aberto depois de um toque ou clique, sem depender do mouse em cima', async ({
    page
  }) => {
    // tablet deitado: o cartão vem fechado e não há mouse para abri-lo
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');
    const { section, cards } = testimonials(page);
    await section.scrollIntoViewIfNeeded();
    await settle(page);
    const card = cards.first();
    const quote = card.locator('blockquote');

    await card.getByRole('heading', { level: 3 }).click();
    await page.mouse.move(2, 2);

    // o foco veio do ponteiro: o cartão abre, mas o contorno é só do teclado
    await expect(card).toBeFocused();
    expect(await card.evaluate((element) => element.matches(':focus-visible'))).toBe(false);
    await expect
      .poll(() => quote.evaluate((element) => element.scrollHeight > element.clientHeight + 1))
      .toBe(false);
  });

  for (const width of [390, 320]) {
    test(`no celular (${width}px), os cartões ficam empilhados e já abertos, sem rolagem horizontal`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 664 });
      await page.goto('/');
      const { section, cards } = testimonials(page);
      await section.scrollIntoViewIfNeeded();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      const tops = await cards.evaluateAll((list) =>
        list.map((card) => card.getBoundingClientRect().top)
      );
      const cut = await cards.evaluateAll((list) =>
        list.map((card) => {
          const quote = card.querySelector('blockquote') as HTMLElement;
          return quote.scrollHeight > quote.clientHeight + 1;
        })
      );

      expect(overflow).toBe(0);
      expect(tops).toEqual([...tops].sort((first, second) => first - second));
      expect(new Set(tops).size).toBe(3);
      expect(cut).toEqual([false, false, false]);
    });
  }

  test('as folhagens por cima dos cartões não impedem o clique no botão', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 700 });
    await page.goto('/');
    const { reviews } = testimonials(page);

    await expect(reviews).toHaveAttribute('target', '_blank');
    expect(await reviews.getAttribute('href')).toContain('google.com/maps/place/');
    // `trial`: confere que o botão é clicável, sem abrir a página do Google
    await reviews.click({ trial: true });
  });

  test('quem pediu menos movimento não vê a foto ampliar', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 700 });
    await page.goto('/');
    const { section, cards } = testimonials(page);
    await section.scrollIntoViewIfNeeded();
    const frame = cards.first().locator('picture').locator('xpath=..');

    await cards.first().hover();

    await expect(frame).toHaveCSS('scale', '1');
  });

  test('a seção não tem violações de acessibilidade', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await testimonials(page).section.scrollIntoViewIfNeeded();

    const { violations } = await new AxeBuilder({ page }).include('#depoimentos').analyze();

    expect(violations).toEqual([]);
  });
});
