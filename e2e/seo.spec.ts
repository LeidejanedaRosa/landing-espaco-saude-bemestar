import { expect, test } from '@playwright/test';

test.describe('SEO', () => {
  test('a página declara o endereço canônico, absoluto e em https', async ({ page }) => {
    await page.goto('/');

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');

    expect(canonical).toMatch(/^https:\/\/[^/]+\/$/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });

  test('ao ser compartilhada, a página leva título, descrição e imagem do mesmo site', async ({
    page,
    request
  }) => {
    await page.goto('/');
    const content = (property: string) =>
      page.locator(`meta[property="${property}"]`).getAttribute('content');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');

    expect(await content('og:title')).toBe(await page.title());
    expect(await content('og:description')).toBe(
      await page.locator('meta[name="description"]').getAttribute('content')
    );
    expect(await content('og:url')).toBe(canonical);

    const image = new URL((await content('og:image')) ?? '');
    expect(image.origin).toBe(new URL(canonical ?? '').origin);
    // o endereço absoluto é o de produção; aqui confere que o arquivo existe no build
    const response = await request.get(image.pathname);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('image/jpeg');
  });

  test('os dados estruturados descrevem o studio, com endereço e telefone', async ({ page }) => {
    await page.goto('/');

    const block = page.locator('script[type="application/ld+json"]');
    await expect(block).toHaveCount(1);
    const data = JSON.parse((await block.textContent()) ?? '');

    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('MedicalBusiness');
    expect(data.name).toBe('Luiza — Espaço Saúde e Bem-estar');
    expect(data.address.addressLocality).toBe('São Lourenço');
    expect(data.address.addressRegion).toBe('MG');
    expect(data.telephone).toMatch(/^\+\d{12,13}$/);
    // o mesmo número dos botões de WhatsApp da página
    const whatsApp = await page.locator('a[href^="https://wa.me/"]').first().getAttribute('href');
    expect(whatsApp).toContain(data.telephone.slice(1));
  });

  test('robots.txt libera o site e aponta para o sitemap, que lista a página', async ({
    request
  }) => {
    const robots = await request.get('/robots.txt');
    const sitemap = await request.get('/sitemap.xml');

    expect(robots.ok()).toBe(true);
    expect(sitemap.ok()).toBe(true);
    const robotsText = await robots.text();
    const sitemapText = await sitemap.text();
    const sitemapUrl = robotsText.match(/^Sitemap: (.+)$/m)?.[1];
    const pageUrl = sitemapText.match(/<loc>([^<]+)<\/loc>/)?.[1];

    expect(robotsText).toContain('Allow: /');
    expect(robotsText).not.toMatch(/^Disallow: \/$/m);
    expect(sitemapUrl).toBe(`${pageUrl}sitemap.xml`);
    expect(sitemapText).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
  });

  test('o favicon e o ícone de tela inicial existem e são imagens', async ({ page, request }) => {
    await page.goto('/');

    for (const selector of ['link[rel="icon"]', 'link[rel="apple-touch-icon"]']) {
      const href = await page.locator(selector).getAttribute('href');
      const response = await request.get(href ?? '');

      expect(response.ok(), selector).toBe(true);
      expect(response.headers()['content-type']).toContain('image/png');
    }
  });
});
