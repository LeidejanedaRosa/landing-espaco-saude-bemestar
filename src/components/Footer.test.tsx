import { render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Footer } from './Footer';

const NAV = [
  { label: 'Studio', href: '#studio' },
  { label: 'Serviços', href: '#servicos' }
];

describe('Footer', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '5535900001111');
    vi.stubEnv('VITE_INSTAGRAM_URL', 'https://www.instagram.com/studio.exemplo/');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('é o rodapé da página, com o nome do espaço', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const footer = screen.getByRole('contentinfo');

    expect(footer).toHaveTextContent('Luiza Espaço');
    expect(footer).toHaveTextContent('Saúde e Bem-estar');
  });

  it('repete a navegação recebida, em uma região própria, distinta do menu do topo', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const nav = screen.getByRole('navigation', { name: 'Rodapé' });
    const links = within(nav).getAllByRole('link');

    expect(links.map((link) => link.getAttribute('href'))).toEqual(['#studio', '#servicos']);
    for (const link of links) expect(link).not.toHaveAttribute('target');
  });

  it('traz endereço, WhatsApp e Instagram, cada um abrindo em nova aba com proteção', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const map = screen.getByRole('link', { name: /av\. comendador costa, 505/i });
    const whatsApp = screen.getByRole('link', { name: /whatsapp \+55 35 90000-1111/i });
    const instagram = screen.getByRole('link', { name: /instagram @studio\.exemplo/i });

    expect(map.getAttribute('href')).toContain('google.com/maps');
    expect(whatsApp.getAttribute('href')).toContain('https://wa.me/5535900001111');
    expect(instagram).toHaveAttribute('href', 'https://www.instagram.com/studio.exemplo/');
    for (const link of [map, whatsApp, instagram]) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('identifica as duas profissionais com os registros nos conselhos, a Luiza primeiro', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const text = screen.getByRole('contentinfo').textContent ?? '';

    expect(text).toContain('Dra. Luiza Rafaela de Castro Dolabella · CREFITO 4 MG 213042-F');
    expect(text).toContain('Dra. Veronika Baptista · CRM MG 98407');
    expect(text.indexOf('Dra. Luiza')).toBeLessThan(text.indexOf('Dra. Veronika'));
  });

  it('mostra o aviso de direitos com o ano recebido', () => {
    render(<Footer navItems={NAV} year={2031} />);

    expect(
      screen.getByText('© 2031 Luiza — Espaço Saúde e Bem-estar. Todos os direitos reservados.')
    ).toBeInTheDocument();
  });

  it('a faixa de passagem para o verde é só enfeite e não tem texto', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const band = screen.getByRole('contentinfo').firstElementChild;

    expect(band).toHaveAttribute('aria-hidden', 'true');
    expect(band).toBeEmptyDOMElement();
  });
});
