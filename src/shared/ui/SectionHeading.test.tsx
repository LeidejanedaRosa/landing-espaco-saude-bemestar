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

  it('fica centralizado por padrão e alinhado à esquerda quando vai dentro de um cartão', () => {
    const { rerender } = render(<SectionHeading id="t" title="Título" />);
    const wrapper = () => screen.getByRole('heading', { level: 2 }).parentElement;

    expect(wrapper()).toHaveClass('text-center', 'mx-auto');

    rerender(<SectionHeading id="t" title="Título" align="start" />);
    expect(wrapper()).toHaveClass('text-left');
    expect(wrapper()).not.toHaveClass('text-center', 'mx-auto');
  });

  it('destaca um trecho do título na fonte manuscrita, sem mudar o texto nem o nome lido', () => {
    render(<SectionHeading id="t" title="Aparelhos para o seu treino diário" highlight="treino" />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Aparelhos para o seu treino diário'
    });
    const highlighted = heading.querySelector('span');

    expect(heading).toHaveTextContent('Aparelhos para o seu treino diário');
    expect(highlighted).toHaveTextContent(/^treino$/);
    expect(highlighted).toHaveClass('font-script', 'text-rose-vivid');
  });

  it('sem destaque, ou com um trecho que não está no título, mostra o título simples', () => {
    const { rerender } = render(<SectionHeading id="t" title="Serviços do espaço" />);
    const heading = () => screen.getByRole('heading', { level: 2, name: 'Serviços do espaço' });

    expect(heading().querySelector('span')).toBeNull();

    rerender(<SectionHeading id="t" title="Serviços do espaço" highlight="studio" />);
    expect(heading().querySelector('span')).toBeNull();
  });

  it('sobre fundo escuro, rótulo e destaque usam as cores claras', () => {
    render(
      <SectionHeading
        id="t"
        eyebrow="Sobre"
        title="Cuidado individual"
        highlight="individual"
        tone="dark"
      />
    );

    expect(screen.getByText('Sobre')).toHaveClass('text-blush');
    expect(screen.getByText('individual')).toHaveClass('text-rose-soft');
  });

  it('sobre fundo claro, que é o padrão, usam os rosas escuro e vivo', () => {
    render(
      <SectionHeading id="t" eyebrow="Sobre" title="Cuidado individual" highlight="individual" />
    );

    expect(screen.getByText('Sobre')).toHaveClass('text-rose-ink');
    expect(screen.getByText('individual')).toHaveClass('text-rose-vivid');
  });
});
