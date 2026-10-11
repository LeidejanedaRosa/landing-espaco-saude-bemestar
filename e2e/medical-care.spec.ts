import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

function medicalCare(page: Page) {
  const section = page.locator('#atendimento-medico');

  return {
    section,
    photo: section.getByRole('img', { name: /dra\. veronika baptista/i }),
    name: section.getByRole('heading', { level: 3, name: 'Dra. Veronika Baptista' }),
    terms: section.getByRole('term'),
    button: section.getByRole('link', { name: /agendar consulta médica/i })
  };
}

// Área útil do navegador em notebook, desktop e tablet. No celular a foto é grande e a seção
// passa de uma tela.
const FULL_SCREEN_SIZES = [
  { width: 1280, height: 600 },
  { width: 1366, height: 625 },
  { width: 1440, height: 780 },
  { width: 1920, height: 950 },
  { width: 1024, height: 650 },
  { width: 820, height: 1100 },
  { width: 768, height: 950 }
];

test.describe('seção Atendimento médico', () => {
  for (const size of FULL_SCREEN_SIZES) {
    test(`em ${size.width}x${size.height}, a seção inteira cabe na tela, sem rolar`, async ({
      page
    }) => {
      await page.setViewportSize(size);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/#atendimento-medico');
      const { section, button } = medicalCare(page);
      await expect(button).toBeInViewport({ ratio: 1 });

      const header = await page.getByRole('banner').boundingBox();
      const box = await section.boundingBox();
      if (!header || !box) throw new Error('seção incompleta');

      expect(Math.round(box.height)).toBeLessThanOrEqual(size.height - header.height);
      await expect(
        page.getByRole('heading', { level: 2, name: /consultas integrativas/i })
      ).toBeInViewport({ ratio: 1 });
    });
  }

  test('o link do menu leva à seção, sem o header cobrir o título', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');
    await page
      .getByRole('navigation', { name: 'Principal' })
      .getByRole('link', { name: 'Atendimento médico' })
      .click();
    const { section } = medicalCare(page);
    await expect(
      page.getByRole('heading', { level: 2, name: /consultas integrativas/i })
    ).toBeInViewport();

    const header = await page.getByRole('banner').boundingBox();
    const eyebrow = await section.getByText('Atendimento médico', { exact: true }).boundingBox();

    expect(eyebrow?.y).toBeGreaterThanOrEqual(header?.height ?? 0);
  });

  for (const size of [
    { width: 1366, height: 625 },
    { width: 390, height: 664 }
  ]) {
    test(`em ${size.width}px, a foto da médica é menor que a da Luiza, que é a principal, e a seção é mais baixa`, async ({
      page
    }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      const { section, photo } = medicalCare(page);
      const about = page.locator('#sobre');

      const doctorPhoto = await photo.boundingBox();
      const luizaPhoto = await about.getByRole('img', { name: /luiza/i }).boundingBox();
      const medicalBox = await section.boundingBox();
      const aboutBox = await about.boundingBox();

      expect(doctorPhoto?.width ?? 0).toBeLessThan(luizaPhoto?.width ?? 0);
      expect(medicalBox?.height ?? 0).toBeLessThan(aboutBox?.height ?? 0);
    });
  }

  test('no desktop, a foto fica à esquerda, as três especialidades lado a lado e o botão abaixo delas', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');
    const { photo, terms, button } = medicalCare(page);
    await expect(terms).toHaveCount(3);

    const photoBox = await photo.boundingBox();
    const buttonBox = await button.boundingBox();
    const termBoxes = await terms.evaluateAll((list) =>
      list.map((term) => {
        const box = term.getBoundingClientRect();
        return { x: box.x, y: Math.round(box.y) };
      })
    );

    expect(new Set(termBoxes.map((box) => box.y)).size).toBe(1);
    expect((photoBox?.x ?? 0) + (photoBox?.width ?? 0)).toBeLessThanOrEqual(termBoxes[0].x);
    expect(buttonBox?.y ?? 0).toBeGreaterThan(termBoxes[0].y);
  });

  for (const size of [
    { width: 768, height: 950 },
    { width: 820, height: 1100 }
  ]) {
    test(`no tablet (${size.width}px), título, foto e botão ficam à esquerda, e as três especialidades à direita`, async ({
      page
    }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      const { section, photo, terms, button } = medicalCare(page);
      await section.scrollIntoViewIfNeeded();

      const title = await page
        .getByRole('heading', { level: 2, name: /consultas integrativas/i })
        .boundingBox();
      const photoBox = await photo.boundingBox();
      const buttonBox = await button.boundingBox();
      const termBoxes = await terms.evaluateAll((list) =>
        list.map((term) => {
          const rect = term.getBoundingClientRect();
          return { x: rect.x, y: rect.y };
        })
      );
      if (!title || !photoBox || !buttonBox) throw new Error('seção incompleta');

      // coluna da esquerda, de cima para baixo, com o mesmo eixo à esquerda
      expect(photoBox.y).toBeGreaterThanOrEqual(title.y + title.height);
      expect(buttonBox.y).toBeGreaterThanOrEqual(photoBox.y + photoBox.height);
      // a foto fica dentro de uma moldura de 4px, por isso a folga
      expect(Math.abs(photoBox.x - title.x)).toBeLessThanOrEqual(5);
      expect(Math.abs(buttonBox.x - title.x)).toBeLessThanOrEqual(2);
      // coluna da direita: as especialidades, uma embaixo da outra
      const leftEdge = Math.max(photoBox.x + photoBox.width, buttonBox.x + buttonBox.width);
      for (const term of termBoxes) expect(term.x).toBeGreaterThanOrEqual(leftEdge);
      expect(termBoxes.map((term) => term.y)).toEqual(
        [...termBoxes.map((term) => term.y)].sort((first, second) => first - second)
      );
      expect(new Set(termBoxes.map((term) => Math.round(term.y))).size).toBe(3);
    });
  }

  test('no celular, a foto é grande e fica centralizada, com o crachá sobreposto', async ({
    page
  }) => {
    await page.setViewportSize({ width: 390, height: 664 });
    await page.goto('/');
    const { section, photo, name } = medicalCare(page);
    await section.scrollIntoViewIfNeeded();

    const photoBox = await photo.boundingBox();
    const nameBox = await name.boundingBox();
    if (!photoBox || !nameBox) throw new Error('seção incompleta');

    expect(photoBox.width).toBeGreaterThanOrEqual(140);
    expect(Math.abs(photoBox.x + photoBox.width / 2 - 195)).toBeLessThanOrEqual(2);
    // o crachá começa antes do fim da foto
    expect(nameBox.y).toBeLessThan(photoBox.y + photoBox.height);
  });

  for (const width of [390, 320]) {
    test(`no celular (${width}px), vêm o título, a foto com o nome, as especialidades e por último o botão, sem rolagem horizontal`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 664 });
      await page.goto('/');
      const { photo, name, terms, button } = medicalCare(page);
      await name.scrollIntoViewIfNeeded();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      const title = page.getByRole('heading', { level: 2, name: /consultas integrativas/i });
      const tops = [
        (await title.boundingBox())?.y ?? 0,
        // foto e nome ficam lado a lado: vale o topo da linha dos dois
        Math.min((await photo.boundingBox())?.y ?? 0, (await name.boundingBox())?.y ?? 0),
        ...(await terms.evaluateAll((list) => list.map((term) => term.getBoundingClientRect().y))),
        (await button.boundingBox())?.y ?? 0
      ];

      expect(overflow).toBe(0);
      expect(tops).toEqual([...tops].sort((a, b) => a - b));
    });
  }

  test('a foto carrega em formato moderno', async ({ page }) => {
    await page.goto('/');
    const { photo } = medicalCare(page);
    await photo.scrollIntoViewIfNeeded();

    await expect
      .poll(() => photo.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
    expect(await photo.evaluate((img: HTMLImageElement) => img.currentSrc)).toMatch(
      /\.(avif|webp)$/
    );
  });

  for (const width of [320, 360, 390]) {
    test(`no celular (${width}px), o texto do botão fica em uma linha só`, async ({ page }) => {
      await page.setViewportSize({ width, height: 664 });
      await page.goto('/');
      const { button } = medicalCare(page);
      await button.scrollIntoViewIfNeeded();

      const lines = await button.evaluate((link) => {
        const range = document.createRange();
        range.selectNodeContents(link.firstChild as Node);
        return new Set([...range.getClientRects()].map((rect) => Math.round(rect.top))).size;
      });

      expect(lines).toBe(1);
    });
  }

  test('o botão abre o WhatsApp para agendar uma consulta médica', async ({ page }) => {
    await page.goto('/');

    const href = await medicalCare(page).button.getAttribute('href');
    const url = new URL(href ?? '');

    expect(url.origin).toBe('https://wa.me');
    expect(url.searchParams.get('text')).toBe('Olá! Gostaria de agendar uma consulta médica.');
  });

  test('a seção não tem violações de acessibilidade', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await medicalCare(page).section.scrollIntoViewIfNeeded();

    const { violations } = await new AxeBuilder({ page }).include('#atendimento-medico').analyze();

    expect(violations).toEqual([]);
  });
});
