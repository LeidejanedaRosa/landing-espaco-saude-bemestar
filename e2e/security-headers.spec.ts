import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';

interface Header {
  key: string;
  value: string;
}

// Os cabeçalhos são aplicados pela Vercel, a partir do vercel.json; o servidor local de
// preview não os envia. Os testes leem o arquivo e os aplicam à resposta da página.
const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8')) as {
  headers: { source: string; headers: Header[] }[];
};
const HEADERS = config.headers.find((rule) => rule.source === '/(.*)')?.headers ?? [];
const headerValue = (key: string) => HEADERS.find((header) => header.key === key)?.value ?? '';

function contentSecurityPolicy() {
  const directives = headerValue('Content-Security-Policy')
    .split(';')
    .map((directive) => directive.trim().split(/\s+/));

  return new Map(directives.map(([name, ...sources]) => [name, sources]));
}

async function openWithProductionHeaders(page: Page) {
  await page.addInitScript(() => {
    const violations: string[] = [];
    Object.assign(window, { __cspViolations: violations });
    document.addEventListener('securitypolicyviolation', (event) => {
      violations.push(`${event.violatedDirective}: ${event.blockedURI || 'inline'}`);
    });
  });
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() !== 'document') return route.continue();

    const response = await route.fetch();
    // `upgrade-insecure-requests` sai só aqui: o servidor de teste é http://localhost, e a
    // diretiva trocaria cada pedido por https, que não existe na máquina. Em produção o site
    // já é https e ela não muda nada.
    const extra = Object.fromEntries(
      HEADERS.map((header) => [
        header.key,
        header.value.replace(/;\s*upgrade-insecure-requests/, '')
      ])
    );
    await route.fulfill({ response, headers: { ...response.headers(), ...extra } });
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
}

const violations = (page: Page) =>
  page.evaluate(() => (window as unknown as { __cspViolations: string[] }).__cspViolations);

test.describe('cabeçalhos de segurança', () => {
  test('a política de conteúdo só aceita script do próprio site, sem inline nem eval', () => {
    const policy = contentSecurityPolicy();

    expect(policy.get('default-src')).toEqual(["'self'"]);
    expect(policy.get('script-src')).toEqual(["'self'"]);
    expect(policy.get('object-src')).toEqual(["'none'"]);
    expect(policy.get('base-uri')).toEqual(["'self'"]);
    // 'self' + o portfólio da Leidejane: único site autorizado a embutir
    // este em iframe (preview ao vivo dos projetos, ver leidejanedarosa.dev.br)
    // — qualquer outra origem continua bloqueada (prevenção de clickjacking).
    expect(policy.get('frame-ancestors')).toEqual(["'self'", 'https://leidejanedarosa.dev.br']);
    expect(headerValue('Content-Security-Policy')).not.toContain('unsafe-eval');

    // Nenhuma OUTRA diretiva pode ter URL http(s) nem curinga — só
    // frame-ancestors tem exceção, e só pro portfólio (checado acima).
    for (const [name, sources] of policy) {
      if (name === 'frame-ancestors') continue;
      for (const source of sources) {
        expect(source).not.toMatch(/https?:|\*/);
      }
    }
  });

  test('o site não pode ter o tipo de arquivo adivinhado', () => {
    expect(headerValue('X-Content-Type-Options')).toBe('nosniff');
    expect(headerValue('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(headerValue('Cross-Origin-Opener-Policy')).toBe('same-origin');
  });

  test('câmera, microfone, localização e pagamento ficam desligados', () => {
    const policy = headerValue('Permissions-Policy');

    for (const feature of ['camera', 'microphone', 'geolocation', 'payment']) {
      expect(policy).toContain(`${feature}=()`);
    }
  });

  test('com os cabeçalhos de produção, a página carrega inteira sem nada bloqueado', async ({
    page
  }) => {
    await openWithProductionHeaders(page);

    // rola a página toda: as imagens de carregamento lento também passam pela política
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
    });
    await page.evaluate(() => document.fonts.ready);

    // As imagens chegam: uma imagem bloqueada pela política entraria na lista de violações,
    // conferida no fim. (Imagem de carregamento lento fora da tela pode nem ser pedida, com
    // ou sem cabeçalhos, por isso o teste não exige todas.)
    await expect
      .poll(() =>
        page.evaluate(() => [...document.images].filter((image) => image.naturalWidth > 0).length)
      )
      .toBeGreaterThan(20);
    expect(
      await page.evaluate(() => getComputedStyle(document.querySelector('h1')!).fontFamily)
    ).toContain('Playfair Display');
    expect(await page.evaluate(() => document.fonts.check('1rem "Playfair Display"'))).toBe(true);
    // o degradê e o papel de parede usam estilo no próprio elemento
    await expect(page.locator('[data-wallpaper]')).toHaveCSS('background-image', /bonecas/);
    expect(await violations(page)).toEqual([]);
  });

  test('com os cabeçalhos de produção, o JavaScript da página continua funcionando', async ({
    page
  }) => {
    await page.setViewportSize({ width: 1366, height: 700 });
    await openWithProductionHeaders(page);
    const services = page.locator('#servicos');

    await services.getByRole('tab', { name: 'Massoterapia', exact: true }).click();

    await expect(services.getByRole('tabpanel').getByRole('heading', { level: 3 })).toHaveText(
      'Massoterapia'
    );
    expect(await violations(page)).toEqual([]);
  });
});
