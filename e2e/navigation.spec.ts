import { expect, test } from '@playwright/test';

// Seções que o menu e os botões já anunciam, mas que ainda não foram construídas.
// Ao construir uma seção, tire o destino dela desta lista: o segundo teste falha enquanto
// ela continuar aqui. A landing só pode ir para a `main` com esta lista vazia.
const PENDING_SECTIONS = [
  '#servicos',
  '#sobre',
  '#atendimento-medico',
  '#metodologia',
  '#depoimentos'
];

async function collectInternalLinks(page: import('@playwright/test').Page) {
  return page
    .locator('a[href^="#"]')
    .evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute('href') ?? ''))]);
}

test.describe('links internos', () => {
  test('todo link interno leva a uma seção que existe, salvo as pendentes declaradas', async ({
    page
  }) => {
    await page.goto('/');

    const broken: string[] = [];
    for (const href of await collectInternalLinks(page)) {
      if (PENDING_SECTIONS.includes(href)) continue;
      if ((await page.locator(`[id="${href.slice(1)}"]`).count()) === 0) broken.push(href);
    }

    expect(broken).toEqual([]);
  });

  test('nenhuma seção já construída continua marcada como pendente', async ({ page }) => {
    await page.goto('/');

    const alreadyBuilt: string[] = [];
    for (const href of PENDING_SECTIONS) {
      if ((await page.locator(`[id="${href.slice(1)}"]`).count()) > 0) alreadyBuilt.push(href);
    }

    expect(alreadyBuilt).toEqual([]);
  });

  test('toda seção pendente é de fato anunciada por algum link da página', async ({ page }) => {
    await page.goto('/');

    const links = await collectInternalLinks(page);

    expect(PENDING_SECTIONS.filter((href) => !links.includes(href))).toEqual([]);
  });
});
