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

  it('a variante secundária é vazada, para não competir com a ação principal', () => {
    render(
      <ButtonLink href="#studio" variant="secondary">
        Conhecer o studio
      </ButtonLink>
    );

    const link = screen.getByRole('link', { name: 'Conhecer o studio' });

    expect(link).toHaveClass('border', 'text-olive-deep');
    expect(link).not.toHaveClass('bg-olive-deep');
  });

  it('a variante clara é o botão cheio para fundo escuro, com contorno de foco claro', () => {
    render(
      <ButtonLink href="#a" variant="light">
        Agendar avaliação
      </ButtonLink>
    );

    const link = screen.getByRole('link', { name: 'Agendar avaliação' });

    expect(link).toHaveClass('bg-cream', 'text-olive-deep', 'focus-visible:outline-cream');
    expect(link).not.toHaveClass('focus-visible:outline-olive-deep');
  });

  it('sobre fundo claro, o contorno de foco é escuro', () => {
    render(<ButtonLink href="#a">Agendar</ButtonLink>);

    expect(screen.getByRole('link', { name: 'Agendar' })).toHaveClass(
      'focus-visible:outline-olive-deep'
    );
  });

  it('se o texto quebrar em duas linhas, fica centralizado e com respiro', () => {
    render(<ButtonLink href="#a">Agendar consulta médica</ButtonLink>);

    expect(screen.getByRole('link', { name: 'Agendar consulta médica' })).toHaveClass(
      'text-center',
      'py-1.5'
    );
  });

  it('a variante vazada clara é o botão secundário para fundo escuro', () => {
    render(
      <ButtonLink href="#a" variant="outline-light">
        Ver no mapa
      </ButtonLink>
    );

    const link = screen.getByRole('link', { name: 'Ver no mapa' });

    expect(link).toHaveClass('border', 'border-cream', 'text-cream', 'focus-visible:outline-cream');
    expect(link).not.toHaveClass('bg-cream');
  });
});
