import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  it('renderiza o conteúdo recebido', () => {
    render(
      <Container>
        <p>conteúdo da seção</p>
      </Container>
    );

    expect(screen.getByText('conteúdo da seção')).toBeInTheDocument();
  });

  it('mantém a largura máxima e a centralização ao receber classes extras', () => {
    render(
      <Container className="grid gap-4">
        <p>conteúdo</p>
      </Container>
    );

    const container = screen.getByText('conteúdo').parentElement;

    expect(container).toHaveClass('max-w-page', 'mx-auto', 'px-gutter', 'grid', 'gap-4');
  });

  it('não deixa "undefined" nas classes quando nenhuma classe extra é passada', () => {
    render(
      <Container>
        <p>conteúdo</p>
      </Container>
    );

    expect(screen.getByText('conteúdo').parentElement?.className).not.toContain('undefined');
  });
});
