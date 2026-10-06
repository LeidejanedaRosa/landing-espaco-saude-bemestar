import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorFallback } from './ErrorFallback';

describe('ErrorFallback', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '5500000000000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('avisa o leitor de tela de que houve um erro', () => {
    render(<ErrorFallback />);

    expect(screen.getByRole('alert')).toHaveTextContent('Algo deu errado por aqui');
  });

  it('oferece o WhatsApp do studio com a mensagem de erro já preenchida', () => {
    render(<ErrorFallback />);

    const link = screen.getByRole('link', { name: /falar no whatsapp/i });
    const url = new URL(link.getAttribute('href') ?? '');

    expect(url.origin + url.pathname).toBe('https://wa.me/5500000000000');
    expect(url.searchParams.get('text')).toBe(
      'Olá! Tentei acessar o site e ele apresentou um erro. Pode me ajudar?'
    );
  });

  it('abre o WhatsApp em nova aba sem expor a página de origem, e avisa disso', () => {
    render(<ErrorFallback />);

    const link = screen.getByRole('link', { name: /abre em nova aba/i });

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
