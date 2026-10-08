import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Studio } from './Studio';

describe('Studio', () => {
  it('é a seção de destino do link "#studio" e se identifica pelo próprio título', () => {
    render(<Studio />);

    const section = screen.getByRole('region', {
      name: 'Aparelhos de alta precisão para o seu treino'
    });

    expect(section).toHaveAttribute('id', 'studio');
  });

  it('apresenta os cinco aparelhos do studio, na ordem aprovada pela cliente', () => {
    render(<Studio />);

    const names = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);

    expect(names).toEqual(['Bicicleta', 'Reformer', 'Cadillac', 'Barrel', 'Chair']);
  });

  it('cada aparelho traz rótulo, descrição e quatro benefícios', () => {
    render(<Studio />);

    for (const heading of screen.getAllByRole('heading', { level: 3 })) {
      const card = heading.closest('[aria-roledescription="slide"]') as HTMLElement;

      const [tag, description] = [...card.querySelectorAll('p')];

      expect(tag.textContent?.length).toBeGreaterThan(5);
      expect(description.textContent?.length).toBeGreaterThan(20);
      expect(within(card).getAllByRole('listitem')).toHaveLength(4);
    }
  });

  it('cada desenho tem texto alternativo próprio, que nomeia o aparelho', () => {
    render(<Studio />);

    const alts = screen.getAllByRole('img').map((img) => img.getAttribute('alt') ?? '');

    expect(alts).toHaveLength(5);
    expect(new Set(alts).size).toBe(5);
    for (const name of ['Reformer', 'Cadillac', 'Barrel', 'Chair', 'bicicleta']) {
      expect(alts.some((alt) => alt.includes(name))).toBe(true);
    }
  });

  it('os desenhos ficam fora da primeira tela e por isso carregam sob demanda', () => {
    render(<Studio />);

    for (const img of screen.getAllByRole('img')) {
      expect(img).toHaveAttribute('loading', 'lazy');
    }
  });

  it('destaca o começo de cada benefício, como na landing aprovada', () => {
    render(<Studio />);

    const reformer = screen
      .getByRole('heading', { level: 3, name: 'Reformer' })
      .closest('[aria-roledescription="slide"]');
    const firstBenefit = within(reformer as HTMLElement).getAllByRole('listitem')[0];

    expect(firstBenefit).toHaveTextContent(
      'Trabalha o corpo todo em diferentes posições (deitado, sentado, em pé)'
    );
    expect(firstBenefit.querySelector('strong')).toHaveTextContent('Trabalha o corpo todo');
  });

  it('usa o texto da bicicleta exatamente como aprovado', () => {
    render(<Studio />);

    expect(
      screen.getByText(
        'A bicicleta ergométrica horizontal é uma forma segura, confortável e eficiente de se exercitar, ajudando a:'
      )
    ).toBeInTheDocument();
  });

  it('o cabeçalho traz o nome da seção e a frase de destaque, sem parágrafo extra', () => {
    render(<Studio />);

    const heading = screen.getByRole('heading', { level: 2 });
    const header = heading.parentElement as HTMLElement;

    expect(within(header).getByText('Nosso studio')).toBeInTheDocument();
    expect(header.querySelectorAll('p')).toHaveLength(1);
  });

  it('mostra os aparelhos em carrossel, com cada slide dizendo o aparelho e a posição', () => {
    render(<Studio />);

    const carousel = screen.getByRole('group', { name: 'Aparelhos do studio' });
    const slides = [...carousel.querySelectorAll('[aria-roledescription="slide"]')].map((slide) =>
      slide.getAttribute('aria-label')
    );

    expect(carousel).toHaveAttribute('aria-roledescription', 'carrossel');
    expect(slides).toEqual([
      'Bicicleta, 1 de 5',
      'Reformer, 2 de 5',
      'Cadillac, 3 de 5',
      'Barrel, 4 de 5',
      'Chair, 5 de 5'
    ]);
  });

  it('as setas e os marcadores dizem o que fazem, com o nome de cada aparelho', () => {
    render(<Studio />);

    expect(screen.getByRole('button', { name: 'Aparelho anterior' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próximo aparelho' })).toBeInTheDocument();
    for (const name of ['Bicicleta', 'Reformer', 'Cadillac', 'Barrel', 'Chair']) {
      expect(screen.getByRole('button', { name: `Ver ${name}` })).toBeInTheDocument();
    }
  });
});
