import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const EQUIPMENT = ['Bicicleta', 'Reformer', 'Cadillac', 'Barrel', 'Chair'];

// Área útil do navegador em notebook e desktop.
const DESKTOP_SIZES = [
  { width: 1280, height: 600 },
  { width: 1366, height: 625 },
  { width: 1440, height: 780 },
  { width: 1920, height: 950 }
];

function studio(page: Page) {
  const section = page.locator('#studio');

  return {
    section,
    scroller: section.getByRole('group', { name: /deslize/i }),
    slide: (name: string) => section.getByRole('heading', { level: 3, name, exact: true }),
    previous: section.getByRole('button', { name: 'Aparelho anterior' }),
    next: section.getByRole('button', { name: 'Próximo aparelho' }),
    dot: (name: string) => section.getByRole('button', { name: `Ver ${name}` })
  };
}

async function goToStudio(page: Page) {
  await page.goto('/');
  await page.getByRole('link', { name: 'Conhecer o studio' }).click();
  await expect(
    page.getByRole('heading', { level: 2, name: /aparelhos de alta precisão/i })
  ).toBeInViewport();
  // espera a rolagem suave da página terminar, para ela não disputar com a do carrossel
  await expect
    .poll(
      () =>
        page.locator('#studio').evaluate(async (section) => {
          const before = section.getBoundingClientRect().top;
          await new Promise((resolve) => setTimeout(resolve, 100));
          const after = section.getBoundingClientRect().top;
          return after <= 90 && before === after;
        }),
      // folga para máquina carregada: a rolagem suave pode demorar bem mais que o normal
      { timeout: 15_000 }
    )
    .toBe(true);
}

test.describe('seção Studio', () => {
  for (const size of DESKTOP_SIZES) {
    test(`em ${size.width}x${size.height}, a seção inteira cabe na tela, sem o header cobrir o título`, async ({
      page
    }) => {
      await page.setViewportSize(size);
      await goToStudio(page);
      const { section, scroller } = studio(page);
      // espera a rolagem suave terminar
      await expect
        .poll(async () => Math.round((await section.boundingBox())?.y ?? 0))
        .toBeLessThanOrEqual(90);

      const header = await page.getByRole('banner').boundingBox();
      const eyebrow = await section.getByText('Nosso studio', { exact: true }).boundingBox();
      const slides = await scroller.boundingBox();
      if (!header || !eyebrow || !slides) throw new Error('seção incompleta');

      expect(eyebrow.y).toBeGreaterThanOrEqual(header.height);
      expect(slides.y + slides.height).toBeLessThanOrEqual(size.height);
    });
  }

  test('mostra um aparelho por vez, e as setas passam para o seguinte e voltam', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToStudio(page);
    const { slide, previous, next, dot } = studio(page);

    await expect(slide('Bicicleta')).toBeInViewport();
    await expect(slide('Reformer')).not.toBeInViewport();
    await expect(previous).toHaveAttribute('aria-disabled', 'true');

    await next.click();
    await expect(slide('Reformer')).toBeInViewport({ ratio: 1 });
    await expect(slide('Bicicleta')).not.toBeInViewport();
    await expect(dot('Reformer')).toHaveAttribute('aria-current', 'true');

    await previous.click();
    await expect(slide('Bicicleta')).toBeInViewport({ ratio: 1 });
  });

  test('um marcador leva direto ao aparelho; no último, não há próximo', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToStudio(page);
    const { slide, next, dot } = studio(page);

    await dot('Chair').click();

    await expect(slide('Chair')).toBeInViewport({ ratio: 1 });
    await expect(dot('Chair')).toHaveAttribute('aria-current', 'true');
    await expect(next).toHaveAttribute('aria-disabled', 'true');
  });

  test('dá para percorrer os cinco aparelhos só com o teclado, sem perder o foco no último', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToStudio(page);
    const { slide, next } = studio(page);

    await next.focus();
    for (const name of EQUIPMENT.slice(1)) {
      await page.keyboard.press('Enter');
      await expect(slide(name)).toBeInViewport({ ratio: 1 });
    }

    await expect(next).toHaveAttribute('aria-disabled', 'true');
    await expect(next).toBeFocused();
  });

  test('arrastar os slides (rolagem lateral) atualiza o marcador', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 664 });
    await page.goto('/');
    const { scroller, dot } = studio(page);
    await scroller.scrollIntoViewIfNeeded();

    await scroller.evaluate((element) => element.scrollTo({ left: element.clientWidth * 2 }));

    await expect(dot('Cadillac')).toHaveAttribute('aria-current', 'true');
  });

  test('os cinco aparelhos estão no HTML entregue, mesmo com só um à vista', async ({
    request
  }) => {
    const html = await (await request.get('/')).text();

    for (const name of EQUIPMENT) expect(html).toContain(`>${name}</h3>`);
  });

  test('todos os slides têm a mesma altura: a página não pula ao trocar de aparelho', async ({
    page
  }) => {
    await page.setViewportSize({ width: 390, height: 664 });
    await page.goto('/');

    const heights = await page
      .locator('#studio [aria-roledescription="slide"]')
      .evaluateAll((slides) =>
        slides.map((slide) => Math.round(slide.getBoundingClientRect().height))
      );

    expect(heights).toHaveLength(5);
    expect(new Set(heights).size).toBe(1);
  });

  test('no desktop, o desenho fica à esquerda e o texto à direita', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToStudio(page);
    const { section, slide } = studio(page);

    // a área do desenho, e não a imagem: a folha é inclinada e a imagem amplia sob o mouse
    const drawing = await section
      .getByRole('img', { name: /bicicleta/i })
      .locator('xpath=ancestor::div[2]')
      .boundingBox();
    const heading = await slide('Bicicleta').boundingBox();

    expect((drawing?.x ?? 0) + (drawing?.width ?? 0)).toBeLessThanOrEqual(heading?.x ?? 0);
  });

  for (const width of [390, 320]) {
    test(`no celular (${width}px), setas e marcadores ficam acima do cartão, à vista junto com o título`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 664 });
      await page.goto('/');
      const { section, slide, previous, next, scroller } = studio(page);
      await section.scrollIntoViewIfNeeded();
      await page
        .getByRole('heading', { level: 2, name: /aparelhos de alta precisão/i })
        .scrollIntoViewIfNeeded();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      const nextBox = await next.boundingBox();
      const slidesBox = await scroller.boundingBox();
      const image = await section.getByRole('img', { name: /bicicleta/i }).boundingBox();
      const heading = await slide('Bicicleta').boundingBox();

      expect(overflow).toBe(0);
      await expect(previous).toBeInViewport({ ratio: 1 });
      await expect(next).toBeInViewport({ ratio: 1 });
      expect((nextBox?.y ?? 0) + (nextBox?.height ?? 0)).toBeLessThanOrEqual(slidesBox?.y ?? 0);
      // no celular, o desenho vem em cima do texto
      expect((image?.y ?? 0) + (image?.height ?? 0)).toBeLessThanOrEqual(heading?.y ?? 0);
    });
  }

  test('ao passar o mouse, só o desenho amplia; a folha de papel fica parada', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToStudio(page);
    const image = studio(page).section.getByRole('img', { name: /bicicleta/i });
    const sheet = image.locator('xpath=ancestor::div[1]');
    // o clique no botão do hero pode ter deixado o ponteiro em cima da folha
    await page.mouse.move(0, 0);
    // O Tailwind 4 aplica ampliação e giro pelas propriedades CSS `scale` e `rotate`.
    await expect(sheet).toHaveCSS('rotate', '-2deg');

    // Repete o gesto se preciso: com a suíte inteira rodando, a página às vezes ainda se
    // acomoda quando o mouse chega, e ele acaba fora do desenho.
    await expect(async () => {
      await image.hover();
      await expect(image).toHaveCSS('scale', '1.25', { timeout: 2000 });
    }).toPass();
    await expect(sheet).toHaveCSS('rotate', '-2deg');
    await expect(sheet).toHaveCSS('scale', 'none');
    // ampliado, o desenho pode passar da folha: nada o corta
    await expect(sheet).toHaveCSS('overflow', 'visible');
  });

  test('quem pediu menos movimento não vê a ampliação', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToStudio(page);
    const image = studio(page).section.getByRole('img', { name: /bicicleta/i });

    await image.hover();

    await expect(image).toHaveCSS('scale', '1');
  });

  // Fundo branco gravado no arquivo aparece como um retângulo quando a imagem passa da folha.
  test('os desenhos têm fundo transparente de verdade, sem depender de mistura de cores', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToStudio(page);
    const image = studio(page).section.getByRole('img', { name: /bicicleta/i });
    await expect
      .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);

    const result = await image.evaluate((img: HTMLImageElement) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      context.drawImage(img, 0, 0);
      return {
        cornerAlpha: context.getImageData(2, 2, 1, 1).data[3],
        blend: getComputedStyle(img).mixBlendMode
      };
    });

    expect(result.cornerAlpha).toBe(0);
    expect(result.blend).toBe('normal');
  });

  // Quando baixar uma imagem "lazy" é decisão do navegador (ele antecipa o que está perto da
  // tela), então o teste confere o que controlamos: o atributo e o formato.
  test('os desenhos são marcados para carregamento sob demanda e servidos em formato moderno', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToStudio(page);
    const { section, next } = studio(page);
    const images = section.getByRole('img');
    await expect(images).toHaveCount(5);

    for (const [position, image] of (await images.all()).entries()) {
      if (position > 0) await next.click();
      await expect(image).toHaveAttribute('loading', 'lazy');
      await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth))
        .toBeGreaterThan(0);
      expect(await image.evaluate((img: HTMLImageElement) => img.currentSrc)).toMatch(
        /\.(avif|webp)$/
      );
    }
  });

  test('a seção não tem violações de acessibilidade, no primeiro e no último aparelho', async ({
    page
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToStudio(page);
    const { slide, dot } = studio(page);

    for (const name of ['Bicicleta', 'Chair']) {
      await dot(name).click();
      await expect(slide(name)).toBeInViewport({ ratio: 1 });
      const { violations } = await new AxeBuilder({ page }).include('#studio').analyze();
      expect(violations).toEqual([]);
    }
  });
});
