import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const SERVICE_NAMES = [
  'Fisioterapia',
  'Pilates Clínico e Funcional',
  'Treinamento Funcional',
  'Massoterapia',
  'Atendimento Médico'
];

// Área útil do navegador em notebook e desktop.
const DESKTOP_SIZES = [
  { width: 1280, height: 600 },
  { width: 1366, height: 625 },
  { width: 1440, height: 780 },
  { width: 1920, height: 950 }
];

function services(page: Page) {
  const section = page.locator('#servicos');

  return {
    section,
    tabs: section.getByRole('tab'),
    tab: (name: string) => section.getByRole('tab', { name, exact: true }),
    panel: section.getByRole('tabpanel'),
    goal: section.getByText(/nosso objetivo/i).locator('xpath=ancestor-or-self::p')
  };
}

async function goToServices(page: Page) {
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Principal' })
    .getByRole('link', { name: 'Serviços' })
    .click();
  await expect(
    page.getByRole('heading', { level: 2, name: /o que luiza espaço/i })
  ).toBeInViewport();
}

test.describe('seção Serviços', () => {
  for (const size of DESKTOP_SIZES) {
    test(`em ${size.width}x${size.height}, a seção inteira cabe na tela, da primeira linha à frase final`, async ({
      page
    }) => {
      await page.setViewportSize(size);
      await goToServices(page);
      const { section, tabs, goal } = services(page);
      // espera a rolagem suave terminar
      await expect
        .poll(async () => Math.round((await section.boundingBox())?.y ?? 0))
        .toBeLessThanOrEqual(90);

      const header = await page.getByRole('banner').boundingBox();
      const eyebrow = await section.getByText('Serviços', { exact: true }).boundingBox();
      const goalBox = await goal.boundingBox();
      if (!header || !eyebrow || !goalBox) throw new Error('seção incompleta');

      await expect(tabs).toHaveCount(5);
      expect(eyebrow.y).toBeGreaterThanOrEqual(header.height);
      expect(goalBox.y + goalBox.height).toBeLessThanOrEqual(size.height);
    });
  }

  for (const size of [
    { width: 1366, height: 625 },
    { width: 768, height: 950 },
    { width: 390, height: 664 }
  ]) {
    test(`em ${size.width}px, o cartão tem a mesma altura em todas as abas e a frase final não sai do lugar`, async ({
      page
    }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      const { section, tab, panel, goal } = services(page);
      await section.scrollIntoViewIfNeeded();
      const measure = async () => ({
        panel: Math.round((await panel.boundingBox())?.height ?? 0),
        goalOffset: await goal.evaluate((element: HTMLElement) => element.offsetTop)
      });
      const first = await measure();

      for (const name of ['Pilates', 'Funcional', 'Massoterapia', 'Atendimento médico']) {
        await tab(name).click();
        await expect(panel.getByRole('heading', { level: 3 })).toBeVisible();
        expect(await measure()).toEqual(first);
      }
    });
  }

  test('as cinco ilustrações já estão carregadas antes de a pessoa trocar de aba', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToServices(page);
    const images = page.locator('#servicos img');

    await expect(images).toHaveCount(5);
    await expect
      .poll(() =>
        images.evaluateAll(
          (list: HTMLImageElement[]) =>
            list.filter((image) => image.complete && image.naturalWidth > 0).length
        )
      )
      .toBe(5);
  });

  test('só o serviço ativo é alcançável: os outros ficam fora do teclado e do leitor de tela', async ({
    page
  }) => {
    await page.goto('/');
    const { section, panel } = services(page);

    await expect(panel).toHaveCount(1);
    await expect(section.getByRole('link', { name: /agendar/i })).toHaveCount(1);
    await expect(section.getByRole('img')).toHaveCount(1);
  });

  for (const size of [
    { width: 1366, height: 625 },
    { width: 768, height: 950 },
    { width: 390, height: 664 }
  ]) {
    test(`em ${size.width}px, o botão do serviço fica centralizado na coluna do texto, abaixo dele e afastado`, async ({
      page
    }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      const { panel } = services(page);
      const column = await panel.getByRole('heading', { level: 3 }).locator('..').boundingBox();
      const button = await panel.getByRole('link').boundingBox();
      const list = await panel.getByRole('list').boundingBox();
      if (!column || !button || !list) throw new Error('cartão incompleto');

      const columnCenter = column.x + column.width / 2;
      const buttonCenter = button.x + button.width / 2;
      expect(Math.abs(columnCenter - buttonCenter)).toBeLessThanOrEqual(1);
      expect(button.y - (list.y + list.height)).toBeGreaterThanOrEqual(16);
    });
  }

  test('a ilustração amplia ao passar o mouse, e fica parada para quem pediu menos movimento', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await goToServices(page);
    const image = services(page).panel.getByRole('img');

    await image.hover();
    await expect(image).toHaveCSS('scale', '1.3');
    // ampliada, a figura passa da própria área, e nada em volta a corta
    const clipped = await image.evaluate((element) => {
      const parents: string[] = [];
      for (let p = element.parentElement; p && p.id !== 'servicos'; p = p.parentElement) {
        parents.push(getComputedStyle(p).overflow);
      }
      return parents.some((overflow) => overflow !== 'visible');
    });
    expect(clipped).toBe(false);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await image.hover();
    await expect(image).toHaveCSS('scale', '1');
  });

  test('clicar em uma aba troca o serviço mostrado, com figura à esquerda e texto à direita', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');
    const { tab, panel } = services(page);

    await tab('Massoterapia').click();

    await expect(panel.getByRole('heading', { level: 3 })).toHaveText('Massoterapia');
    const image = await panel.getByRole('img').boundingBox();
    const heading = await panel.getByRole('heading', { level: 3 }).boundingBox();
    expect((image?.x ?? 0) + (image?.width ?? 0)).toBeLessThanOrEqual(heading?.x ?? 0);
  });

  test('dá para percorrer os serviços só com o teclado', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');
    const { tab, panel } = services(page);

    await tab('Fisioterapia').focus();
    await page.keyboard.press('ArrowRight');
    await expect(tab('Pilates')).toBeFocused();
    await expect(panel.getByRole('heading', { level: 3 })).toHaveText(
      'Pilates Clínico e Funcional'
    );

    await page.keyboard.press('End');
    await expect(panel.getByRole('heading', { level: 3 })).toHaveText('Atendimento Médico');

    await page.keyboard.press('Tab');
    await expect(panel.getByRole('link', { name: /agendar consulta médica/i })).toBeFocused();
  });

  test('o botão do serviço abre o WhatsApp dizendo qual serviço a pessoa quer', async ({
    page
  }) => {
    await page.goto('/');
    const { tab, panel } = services(page);

    await tab('Funcional').click();
    const href = await panel
      .getByRole('link', { name: /agendar treino funcional/i })
      .getAttribute('href');
    const url = new URL(href ?? '');

    expect(url.origin).toBe('https://wa.me');
    expect(url.searchParams.get('text')).toBe('Olá! Gostaria de agendar um treino funcional.');
  });

  test('os cinco serviços estão no HTML entregue, mesmo com só um visível', async ({ request }) => {
    const html = await (await request.get('/')).text();

    for (const name of SERVICE_NAMES) expect(html).toContain(`>${name}</h3>`);
    expect(html).toContain('Reumatologia');
  });

  test('a ilustração do serviço ativo carrega em formato moderno, inteira no painel', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 625 });
    await page.goto('/');
    const { tab, panel } = services(page);

    for (const name of ['Fisioterapia', 'Atendimento médico']) {
      await tab(name).click();
      const image = panel.getByRole('img');
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth))
        .toBeGreaterThan(0);
      const info = await image.evaluate((img: HTMLImageElement) => ({
        fit: getComputedStyle(img).objectFit,
        src: img.currentSrc
      }));

      expect(info.fit).toBe('contain');
      expect(info.src).toMatch(/\.(avif|webp)$/);
    }
  });

  for (const width of [390, 320]) {
    test(`no celular (${width}px), as cinco abas aparecem inteiras, sem a página rolar na horizontal`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 664 });
      await page.goto('/');
      const { section, tabs, tab, panel } = services(page);
      await section.getByRole('tablist').scrollIntoViewIfNeeded();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow).toBe(0);
      for (const item of await tabs.all()) await expect(item).toBeInViewport({ ratio: 1 });

      await tab('Atendimento médico').click();
      await expect(panel.getByRole('heading', { level: 3 })).toHaveText('Atendimento Médico');

      // no celular, a figura vem em cima do texto
      const image = await panel.getByRole('img').boundingBox();
      const heading = await panel.getByRole('heading', { level: 3 }).boundingBox();
      expect((image?.y ?? 0) + (image?.height ?? 0)).toBeLessThanOrEqual(heading?.y ?? 0);
    });
  }

  test('a seção não tem violações de acessibilidade, em nenhuma aba', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    const { tab } = services(page);

    for (const name of ['Fisioterapia', 'Massoterapia', 'Atendimento médico']) {
      await tab(name).click();
      const { violations } = await new AxeBuilder({ page }).include('#servicos').analyze();
      expect(violations).toEqual([]);
    }
  });
});
