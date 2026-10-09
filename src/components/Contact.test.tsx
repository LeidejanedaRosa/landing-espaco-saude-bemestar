import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Contact } from './Contact';

describe('Contact', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '5535900001111');
    vi.stubEnv('VITE_INSTAGRAM_URL', 'https://www.instagram.com/studio.exemplo/');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('é a seção de destino do link "#contato" e se identifica pela chamada final', () => {
    render(<Contact />);

    const section = screen.getByRole('region', { name: 'Priorize o que realmente importa: Você!' });

    expect(section).toHaveAttribute('id', 'contato');
  });

  it('não tem formulário: a ação principal leva ao WhatsApp, com a mensagem de agendamento', () => {
    render(<Contact />);

    const link = screen.getByRole('link', { name: /agendar avaliação/i });
    const url = new URL(link.getAttribute('href') ?? '');

    expect(document.querySelector('form')).toBeNull();
    expect(url.origin + url.pathname).toBe('https://wa.me/5535900001111');
    expect(url.searchParams.get('text')).toBe('Olá! Gostaria de agendar uma avaliação.');
  });

  it('mostra o endereço do studio em um elemento de endereço, com link para o mapa', () => {
    render(<Contact />);

    const address = screen.getByRole('group');
    const map = screen.getByRole('link', { name: /ver no mapa/i });

    expect(address.tagName).toBe('ADDRESS');
    expect(address).toHaveTextContent('Av. Comendador Costa, 505, Centro');
    expect(address).toHaveTextContent('CEP 37470-000');
    expect(map.getAttribute('href')).toContain('google.com/maps');
  });

  it('mostra o WhatsApp e o Instagram a partir das variáveis de ambiente, legíveis', () => {
    render(<Contact />);

    const whatsApp = screen.getByRole('link', { name: /\+55 35 90000-1111/ });
    const instagram = screen.getByRole('link', { name: /@studio\.exemplo/ });

    expect(whatsApp.getAttribute('href')).toContain('https://wa.me/5535900001111');
    expect(instagram).toHaveAttribute('href', 'https://www.instagram.com/studio.exemplo/');
  });

  it('todo link para fora abre em nova aba, protegido, e avisa o leitor de tela', () => {
    render(<Contact />);

    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveTextContent('(abre em nova aba)');
    }
  });

  it('os três meios de contato são termos com descrição, e os ícones são só enfeite', () => {
    render(<Contact />);

    const terms = screen.getAllByRole('term').map((term) => term.textContent);

    expect(terms).toEqual(['Endereço', 'WhatsApp', 'Instagram']);
    for (const term of screen.getAllByRole('term')) {
      expect(term.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    }
  });
});
