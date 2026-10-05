// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { render } from './entry-server';

describe('prerender', () => {
  it('gera o HTML da página com o título principal, sem precisar de navegador', () => {
    const html = render();

    expect(html).toContain('<main');
    expect(html).toMatch(/<h1[^>]*>Luiza — Espaço Saúde e Bem-estar<\/h1>/);
  });
});
