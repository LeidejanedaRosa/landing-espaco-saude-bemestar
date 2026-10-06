import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ButtonLink } from './ButtonLink';

describe('ButtonLink', () => {
  it('é um link de verdade, apontando para o destino recebido', () => {
    render(<ButtonLink href="#contato">Agendar</ButtonLink>);

    expect(screen.getByRole('link', { name: 'Agendar' })).toHaveAttribute('href', '#contato');
  });

  it('link interno abre na mesma aba', () => {
    render(<ButtonLink href="#contato">Agendar</ButtonLink>);

    const link = screen.getByRole('link', { name: 'Agendar' });

    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('link externo abre em nova aba, sem expor a página de origem, e avisa o leitor de tela', () => {
    render(
      <ButtonLink href="https://wa.me/5500000000000" external>
        Agendar
      </ButtonLink>
    );

    const link = screen.getByRole('link', { name: /agendar.*abre em nova aba/i });

    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('tem área de toque mínima em qualquer tamanho', () => {
    render(
      <ButtonLink href="#a" size="sm">
        Pequeno
      </ButtonLink>
    );

    expect(screen.getByRole('link', { name: 'Pequeno' })).toHaveClass('min-h-11');
  });
});
