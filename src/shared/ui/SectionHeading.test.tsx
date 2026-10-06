import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SectionHeading } from './SectionHeading';

describe('SectionHeading', () => {
  it('o título é um h2 com o id recebido, para a seção se identificar por ele', () => {
    render(<SectionHeading id="servicos-titulo" eyebrow="Serviços" title="Cuidados" />);

    const heading = screen.getByRole('heading', { level: 2, name: 'Cuidados' });

    expect(heading).toHaveAttribute('id', 'servicos-titulo');
  });

  it('mostra o rótulo acima do título e a descrição abaixo', () => {
    render(
      <SectionHeading id="t" eyebrow="Nosso studio" title="Aparelhos" description="Conheça." />
    );

    expect(screen.getByText('Nosso studio')).toBeInTheDocument();
    expect(screen.getByText('Conheça.')).toBeInTheDocument();
  });

  it('rótulo e descrição são opcionais e não deixam parágrafo vazio', () => {
    const { container } = render(<SectionHeading id="t" title="Título" />);

    expect(container.querySelectorAll('p')).toHaveLength(0);
  });
});
