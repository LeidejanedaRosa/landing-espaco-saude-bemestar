import { expect, test } from '@playwright/test';

test.describe('seção Studio', () => {
  test('o botão "Conhecer o studio" leva à seção, sem o header cobrir o título', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');

    await page.getByRole('link', { name: 'Conhecer o studio' }).click();

    const heading = page.getByRole('heading', { level: 2, name: /aparelhos de alta precisão/i });
    await expect(heading).toBeInViewport();

    const header = await page.getByRole('banner').boundingBox();
    const eyebrow = await page.getByText('Nosso studio', { exact: true }).boundingBox();
    expect(eyebrow?.y).toBeGreaterThanOrEqual(header?.height ?? 0);
  });

  for (const [label, width, columns] of [
    ['desktop', 1366, 3],
    ['tablet', 768, 2],
    ['celular', 390, 1]
  ] as const) {
    test(`mostra os cinco aparelhos em ${columns} coluna(s) no ${label}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');

      const cards = page.locator('#studio > div > ul > li');
      await expect(cards).toHaveCount(5);

      const tops = await cards.evaluateAll((items) =>
        items.map((item) => Math.round(item.getBoundingClientRect().top))
      );
      const firstRow = tops.filter((top) => top === tops[0]).length;

      expect(firstRow).toBe(columns);
    });
  }

  for (const [label, width] of [
    ['desktop', 1366],
    ['tablet', 768]
  ] as const) {
    test(`a última linha de cartões, incompleta, fica centralizada no ${label}`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto('/');

      const boxes = await page.locator('#studio > div > ul > li').evaluateAll((items) =>
        items.map((item) => {
          const box = item.getBoundingClientRect();
          return { top: Math.round(box.top), left: box.left, right: box.right };
        })
      );
      const lastTop = boxes[boxes.length - 1].top;
      const lastRow = boxes.filter((box) => box.top === lastTop);
      const leftSpace = lastRow[0].left;
      const rightSpace = width - lastRow[lastRow.length - 1].right;

      expect(lastRow.length).toBeLessThan(boxes.filter((box) => box.top === boxes[0].top).length);
      expect(Math.abs(leftSpace - rightSpace)).toBeLessThanOrEqual(2);
    });
  }

  test('ao passar o mouse no cartão, o desenho amplia sem sair do painel', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 800 });
    await page.goto('/');

    const card = page.locator('#studio > div > ul > li').first();
    const image = card.locator('img');
    await card.scrollIntoViewIfNeeded();
    // O Tailwind 4 aplica a ampliação pela propriedade CSS `scale`, e não por `transform`.
    const scaleOf = () => image.evaluate((img) => getComputedStyle(img).scale);

    expect(await scaleOf()).toBe('none');

    await card.hover();
    await expect.poll(scaleOf).toBe('1.1');

    const overflow = await image.evaluate(
      (img) => getComputedStyle(img.closest('div') as HTMLElement).overflow
    );
    expect(overflow).toBe('hidden');
  });

  test('quem pediu menos movimento não vê a ampliação', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 800 });
    await page.goto('/');

    const card = page.locator('#studio > div > ul > li').first();
    await card.scrollIntoViewIfNeeded();
    await card.hover();

    const scale = await card.locator('img').evaluate((img) => getComputedStyle(img).scale);
    expect(['none', '1']).toContain(scale);
  });

  test('todos os desenhos ocupam a mesma área, inteiros e sem distorcer', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 800 });
    await page.goto('/');

    const boxes = await page.locator('#studio li img').evaluateAll((images) =>
      images.map((image) => {
        const img = image as HTMLImageElement;
        const box = img.getBoundingClientRect();
        return {
          width: Math.round(box.width),
          height: Math.round(box.height),
          fit: getComputedStyle(img).objectFit
        };
      })
    );

    expect(boxes).toHaveLength(5);
    expect(new Set(boxes.map((box) => `${box.width}x${box.height}`)).size).toBe(1);
    expect(boxes.every((box) => box.fit === 'contain')).toBe(true);
  });

  // Quando baixar uma imagem "lazy" é decisão do navegador (ele antecipa o que está a algumas
  // telas de distância), então o teste confere o que controlamos: o atributo e o formato.
  test('os desenhos são marcados para carregamento sob demanda e servidos em formato moderno', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');
    await page.locator('#studio').scrollIntoViewIfNeeded();

    const images = page.locator('#studio li img');
    await expect(images).toHaveCount(5);

    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute('loading', 'lazy');
      await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth))
        .toBeGreaterThan(0);
      expect(await image.evaluate((img: HTMLImageElement) => img.currentSrc)).toMatch(
        /\.(avif|webp)$/
      );
    }
  });
});
