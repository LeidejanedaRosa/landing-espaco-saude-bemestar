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

  it('é o rodapé da página, com o logo do espaço e a frase da recepção', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const footer = screen.getByRole('contentinfo');

    expect(
      within(footer).getByRole('img', { name: /luiza — espaço saúde e bem-estar/i })
    ).toBeInTheDocument();
    const phrase = within(footer).getByText('Acredite!').parentElement as HTMLElement;

    expect(phrase).toHaveClass('font-script');
    expect(phrase).toHaveTextContent('Acredite! O movimento cura');
  });

  it('traz a chamada final como destino do link "#contato"', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const section = screen.getByRole('region', { name: 'Priorize o que realmente importa: Você!' });

    expect(section).toHaveAttribute('id', 'contato');
    expect(
      within(section).getByText(/agende sua consulta ou aula experimental/i)
    ).toBeInTheDocument();
  });

  it('a frase fica em duas linhas, com a segunda começando embaixo do "!", como na parede', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const second = screen.getByText('O movimento cura');

    expect(screen.getByText('Acredite!')).toHaveClass('block');
    expect(second).toHaveClass('block', 'ml-[min(2.57em,30cqw)]');
    expect(second.parentElement).not.toHaveClass('whitespace-nowrap');
  });

  it('a boneca em traço ao fundo é só enfeite', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const doll = screen.getByRole('contentinfo').querySelector('img[alt=""]');

    expect(doll).toHaveAttribute('aria-hidden', 'true');
    expect(doll).toHaveClass('pointer-events-none');
  });

  it('não tem formulário: os dois botões levam ao WhatsApp e ao mapa', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const schedule = screen.getByRole('link', { name: /agendar avaliação/i });
    const map = screen.getByRole('link', { name: /ver no mapa/i });
    const url = new URL(schedule.getAttribute('href') ?? '');

    expect(document.querySelector('form')).toBeNull();
    expect(url.origin + url.pathname).toBe('https://wa.me/5535900001111');
    expect(url.searchParams.get('text')).toBe('Olá! Gostaria de agendar uma avaliação.');
    expect(map.getAttribute('href')).toContain('google.com/maps');
  });

  it('repete a navegação recebida, em uma região própria, distinta do menu do topo', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const nav = screen.getByRole('navigation', { name: 'Rodapé' });
    const links = within(nav).getAllByRole('link');

    expect(links.map((link) => link.getAttribute('href'))).toEqual(['#studio', '#servicos']);
    for (const link of links) expect(link).not.toHaveAttribute('target');
  });

  it('mostra o endereço do studio uma vez só, em um elemento de endereço', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const address = screen.getByRole('group');

    expect(address.tagName).toBe('ADDRESS');
    expect(address).toHaveTextContent('Av. Comendador Costa, 505, Centro');
    expect(screen.getAllByText(/Av\. Comendador Costa/)).toHaveLength(1);
  });

  it('WhatsApp e Instagram são botões de ícone, com nome para o leitor de tela', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const whatsApp = screen.getByRole('link', { name: 'WhatsApp (abre em nova aba)' });
    const instagram = screen.getByRole('link', { name: 'Instagram (abre em nova aba)' });

    expect(whatsApp.getAttribute('href')).toContain('https://wa.me/5535900001111');
    expect(instagram).toHaveAttribute('href', 'https://www.instagram.com/studio.exemplo/');
    for (const link of [whatsApp, instagram]) {
      expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
      expect(link).toHaveClass('size-14', 'pop-on-scroll');
    }
  });

  it('todo link para fora abre em nova aba, protegido', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const external = screen
      .getAllByRole('link')
      .filter((link) => !link.getAttribute('href')?.startsWith('#'));

    expect(external).toHaveLength(4);
    for (const link of external) {
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

  it('os dois botões de ação ficam depois dos ícones de rede, na mesma coluna do endereço', () => {
    render(<Footer navItems={NAV} year={2026} />);

    const instagram = screen.getByRole('link', { name: 'Instagram (abre em nova aba)' });
    const schedule = screen.getByRole('link', { name: /agendar avaliação/i });
    const address = screen.getByRole('group');

    expect(
      instagram.compareDocumentPosition(schedule) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(address.parentElement).toContainElement(schedule);
  });
});
