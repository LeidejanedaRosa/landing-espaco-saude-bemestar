import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CardGrid } from './CardGrid';
import { IllustratedCard } from './IllustratedCard';
import type { PictureImage } from './Picture';

const image: PictureImage = {
  sources: { avif: '/a-400.avif 400w', webp: '/a-400.webp 400w' },
  img: { src: '/a-400.webp', w: 400, h: 300 }
};

function renderCard(props: Partial<Parameters<typeof IllustratedCard>[0]> = {}) {
  render(
    <CardGrid>
      <IllustratedCard
        image={image}
        imageAlt="Ilustração de teste"
        title="Fisioterapia"
        items={[{ rest: 'Avaliação detalhada' }]}
        {...props}
      />
    </CardGrid>
  );

  return screen.getByRole('heading', { level: 3 }).closest('li') as HTMLElement;
}

describe('IllustratedCard', () => {
  it('é um item de lista dentro do CardGrid, para o leitor de tela contar os cartões', () => {
    const card = renderCard();

    expect(card.parentElement?.tagName).toBe('UL');
  });

  it('mostra só título e itens quando rótulo e descrição não são informados', () => {
    const card = renderCard();

    expect(card.querySelectorAll('p')).toHaveLength(0);
    expect(within(card).getAllByRole('listitem')).toHaveLength(1);
  });

  it('mostra o rótulo acima do título e a descrição abaixo, quando informados', () => {
    const card = renderCard({ tag: 'O clássico', description: 'Um aparelho conhecido.' });

    const [tag, description] = [...card.querySelectorAll('p')].map((p) => p.textContent);

    expect(tag).toBe('O clássico');
    expect(description).toBe('Um aparelho conhecido.');
  });

  it('destaca o começo do item quando há destaque, sem colar no resto do texto', () => {
    const card = renderCard({ items: [{ lead: 'Fortalece pernas', rest: 'e articulações' }] });

    const item = within(card).getByRole('listitem');

    expect(item).toHaveTextContent('Fortalece pernas e articulações');
    expect(item.querySelector('strong')).toHaveTextContent('Fortalece pernas');
  });

  it('a ilustração tem texto alternativo e carrega sob demanda', () => {
    const card = renderCard();

    const img = within(card).getByRole('img', { name: 'Ilustração de teste' });

    expect(img).toHaveAttribute('loading', 'lazy');
  });
});
