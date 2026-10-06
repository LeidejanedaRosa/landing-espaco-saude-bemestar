import { render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Hero } from './Hero';

describe('Hero', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '5500000000000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('traz o título principal da página', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Saúde, movimento e bem-estar em um só espaço'
    );
  });

  it('a ação principal abre o WhatsApp com a mensagem de agendamento', () => {
    render(<Hero />);

    const link = screen.getByRole('link', { name: /agendar avaliação/i });
    const url = new URL(link.getAttribute('href') ?? '');

    expect(url.origin + url.pathname).toBe('https://wa.me/5500000000000');
    expect(url.searchParams.get('text')).toBe('Olá! Gostaria de agendar uma avaliação.');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('a ação secundária leva à seção do studio, na mesma aba', () => {
    render(<Hero />);

    const link = screen.getByRole('link', { name: 'Conhecer o studio' });

    expect(link).toHaveAttribute('href', '#studio');
    expect(link).not.toHaveAttribute('target');
  });

  it('apresenta os três números do studio, cada um com o seu rótulo', () => {
    render(<Hero />);

    const stats = screen.getAllByRole('term').map((term) => {
      const group = term.parentElement as HTMLElement;
      return [within(group).getByRole('definition').textContent, term.textContent];
    });

    expect(stats).toEqual([
      ['10+', 'anos de experiência'],
      ['5', 'aparelhos de pilates'],
      ['1:1', 'atendimento individual']
    ]);
  });

  it('traz a frase da recepção como texto, legível por leitor de tela e buscador', () => {
    render(<Hero />);

    const phrase = screen.getByText('Acredite!').parentElement;

    expect(phrase?.tagName).toBe('P');
    expect(phrase).toHaveTextContent('Acredite! O movimento cura');
  });

  it('o desenho é decorativo, carrega na hora e é a única imagem com prioridade alta', () => {
    const { container } = render(<Hero />);

    const drawing = container.querySelector('img[src*="guerreira"]') as HTMLImageElement;
    const highPriority = [...container.querySelectorAll('img[fetchpriority="high"]')];

    expect(drawing).toHaveAttribute('alt', '');
    expect(drawing).toHaveAttribute('loading', 'eager');
    expect(highPriority).toEqual([drawing]);
  });

  it('as folhagens são só enfeite: nenhuma imagem do hero tem texto alternativo', () => {
    const { container } = render(<Hero />);

    const images = [...container.querySelectorAll('img')];

    expect(images).toHaveLength(5);
    expect(
      images.every((img) => img.alt === '' && img.getAttribute('aria-hidden') === 'true')
    ).toBe(true);
  });
});
