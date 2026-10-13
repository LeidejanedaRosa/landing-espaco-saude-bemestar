import { expect, type Page } from '@playwright/test';

/**
 * Espera a rolagem suave da página terminar. Um teste que passa o mouse com a página ainda
 * andando acerta o lugar onde o elemento estava, e não onde ele está.
 */
export async function waitForScrollToSettle(page: Page, selector: string) {
  await expect
    .poll(
      () =>
        page.locator(selector).evaluate(async (element) => {
          const before = element.getBoundingClientRect().top;
          await new Promise((resolve) => setTimeout(resolve, 100));
          return element.getBoundingClientRect().top === before;
        }),
      { timeout: 15_000 }
    )
    .toBe(true);
}
