import { expect, test, type Page } from '@playwright/test';

type Rgb = [number, number, number];

const SCREENS = [
  { name: 'desktop', width: 1440, height: 800 },
  { name: 'tablet', width: 820, height: 1100 },
  { name: 'celular', width: 390, height: 780 }
];
// Seções cujo título fica direto sobre o degradê da página (as outras têm bloco ou cartão).
const ON_PAGE_BACKGROUND = ['studio', 'servicos', 'metodologia', 'para-quem', 'depoimentos'];
// Dessas, as que ficam no trecho rosa: o destaque ganha fundo próprio.
const ON_ROSE = ['metodologia', 'para-quem', 'depoimentos'];
const ALL_SECTIONS = [...ON_PAGE_BACKGROUND, 'sobre', 'atendimento-medico', 'contato'];

function luminance([red, green, blue]: Rgb) {
  const channel = (value: number) => {
    const normalized = value / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue);
}

function contrast(first: Rgb, second: Rgb) {
  const [lighter, darker] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

async function openWholePage(page: Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
}

/** Cores do cabeçalho de uma seção, já convertidas para RGB pelo próprio navegador. */
async function headingColors(page: Page, id: string) {
  return page.locator(`#${id}`).evaluate((section) => {
    const toRgb = (color: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const context = canvas.getContext('2d')!;
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      return [...context.getImageData(0, 0, 1, 1).data].slice(0, 3) as [number, number, number];
    };
    const title = section.querySelector('h2')!;
    const label = title.previousElementSibling!;
    const highlight = title.querySelector('span')!;

    return {
      title: toRgb(getComputedStyle(title).color),
      label: toRgb(getComputedStyle(label).color),
      labelBackground: toRgb(getComputedStyle(label).backgroundColor),
      highlight: toRgb(getComputedStyle(highlight).color),
      highlightHasOwnBackground: getComputedStyle(highlight, '::before').content !== 'none',
      highlightBackground: toRgb(getComputedStyle(highlight, '::before').backgroundColor)
    };
  });
}

/**
 * Cor do degradê atrás de um elemento, em três pontos da largura dele. O conteúdo das seções e
 * o papel de parede ficam escondidos durante a medida: o que se mede é só o fundo.
 */
async function backgroundBehind(page: Page, selector: string): Promise<Rgb[]> {
  const target = page.locator(selector).first();
  await target.scrollIntoViewIfNeeded();
  const box = await target.boundingBox();
  if (!box) throw new Error(`${selector} não está na tela`);

  const hide = await page.addStyleTag({
    content: 'section > *, [data-wallpaper] { visibility: hidden !important; }'
  });
  const row = await page.screenshot({
    clip: { x: box.x, y: Math.round(box.y + box.height / 2), width: box.width, height: 1 }
  });
  await hide.evaluate((style) => (style as HTMLStyleElement).remove());

  return page.evaluate(async (base64) => {
    const image = new Image();
    image.src = `data:image/png;base64,${base64}`;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = 1;
    const context = canvas.getContext('2d')!;
    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, image.width, 1).data;
    const at = (x: number) => [...pixels.slice(x * 4, x * 4 + 3)] as [number, number, number];

    return [at(0), at(Math.floor(image.width / 2)), at(image.width - 1)];
  }, row.toString('base64'));
}

test.describe('degradê da página', () => {
  for (const screen of SCREENS) {
    test(`${screen.name}: o texto escuro continua legível sobre o degradê, do creme ao rosa`, async ({
      page
    }) => {
      await page.setViewportSize(screen);
      await openWholePage(page);

      for (const id of ON_PAGE_BACKGROUND) {
        const { title } = await headingColors(page, id);
        const backgrounds = await backgroundBehind(page, `#${id} h2`);

        // 4,5:1 e não só os 3:1 de título: o texto corrido da seção usa a mesma cor
        for (const background of backgrounds) {
          expect(contrast(title, background), `título de #${id}`).toBeGreaterThanOrEqual(4.5);
        }
      }
    });

    test(`${screen.name}: o destaque dos títulos tem contraste de texto grande em todo o degradê`, async ({
      page
    }) => {
      await page.setViewportSize(screen);
      await openWholePage(page);

      for (const id of ON_PAGE_BACKGROUND) {
        const colors = await headingColors(page, id);
        // sobre o rosa, o destaque é lido sobre a própria pincelada creme
        const backgrounds = colors.highlightHasOwnBackground
          ? [colors.highlightBackground]
          : await backgroundBehind(page, `#${id} h2 span`);

        expect(colors.highlightHasOwnBackground, `pincelada em #${id}`).toBe(ON_ROSE.includes(id));
        for (const background of backgrounds) {
          expect(
            contrast(colors.highlight, background),
            `destaque de #${id}`
          ).toBeGreaterThanOrEqual(3);
        }
      }
    });
  }

  test('o rótulo é o mesmo selo em todas as seções, com letra legível', async ({ page }) => {
    await openWholePage(page);

    const labels = await Promise.all(ALL_SECTIONS.map((id) => headingColors(page, id)));

    for (const { label, labelBackground } of labels) {
      expect(label).toEqual(labels[0].label);
      expect(labelBackground).toEqual(labels[0].labelBackground);
    }
    expect(contrast(labels[0].label, labels[0].labelBackground)).toBeGreaterThanOrEqual(4.5);
  });

  for (const screen of SCREENS) {
    test(`${screen.name}: o verde do rodapé sobe por trás dos Depoimentos, e o botão continua legível e clicável`, async ({
      page
    }) => {
      await page.setViewportSize(screen);
      await openWholePage(page);
      const button = page
        .locator('#depoimentos')
        .getByRole('link', { name: /ver todas as avaliações no google/i });
      const text = await button.evaluate((element) => {
        const [red, green, blue] = getComputedStyle(element)
          .color.match(/[\d.]+/g)!
          .map(Number);
        return [red, green, blue] as [number, number, number];
      });

      const backgrounds = await backgroundBehind(page, '#depoimentos a[target="_blank"]');

      for (const background of backgrounds) {
        expect(contrast(text, background)).toBeGreaterThanOrEqual(4.5);
      }
      // a faixa verde é do rodapé e fica por baixo: não pode cobrir o botão
      await button.click({ trial: true });
    });
  }

  test('o arco dourado do hero é só enfeite e só aparece no desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 800 });
    await openWholePage(page);
    const arc = page.getByRole('region').first().locator('span[aria-hidden="true"].rounded-full');

    await expect(arc).toBeVisible();

    await page.setViewportSize({ width: 390, height: 780 });
    await expect(arc).toBeHidden();
  });

  for (const width of [1440, 820, 390, 320]) {
    test(`em ${width}px, os ramos e o degradê não fazem a página rolar na horizontal`, async ({
      page
    }) => {
      await page.setViewportSize({ width, height: 780 });
      await openWholePage(page);
      await page.locator('#contato').scrollIntoViewIfNeeded();

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );

      expect(overflow).toBe(0);
    });
  }
});
