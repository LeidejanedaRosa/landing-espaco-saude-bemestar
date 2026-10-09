import { describe, expect, it } from 'vitest';
import { ADDRESS_LINES, MAP_URL, instagramHandle } from './contactInfo';

describe('contactInfo', () => {
  it('traz o endereço confirmado pela cliente', () => {
    expect(ADDRESS_LINES).toEqual([
      'Av. Comendador Costa, 505, Centro',
      'São Lourenço, Minas Gerais',
      'CEP 37470-000'
    ]);
  });

  it('o link do mapa busca o endereço do studio no Google Maps', () => {
    const url = new URL(MAP_URL);

    expect(url.origin + url.pathname).toBe('https://www.google.com/maps/search/');
    expect(url.searchParams.get('query')).toContain('Av. Comendador Costa, 505');
    expect(url.searchParams.get('query')).toContain('São Lourenço');
  });

  it('tira o usuário do endereço do perfil do Instagram, com ou sem barra no final', () => {
    expect(instagramHandle('https://www.instagram.com/lufisio.pilates/')).toBe('@lufisio.pilates');
    expect(instagramHandle('https://www.instagram.com/lufisio.pilates')).toBe('@lufisio.pilates');
  });

  it('perfil sem usuário no endereço não quebra a página', () => {
    expect(instagramHandle('https://www.instagram.com/')).toBe('@');
  });
});
