import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CheckList } from './CheckList';

describe('CheckList', () => {
  it('é uma lista, para o leitor de tela anunciar quantos itens são', () => {
    render(<CheckList items={[{ rest: 'Ortomolecular' }, { rest: 'Reumatologia' }]} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('destaca o começo do item sem mudar o texto', () => {
    render(<CheckList items={[{ lead: 'Trabalha força,', rest: 'flexibilidade e postura.' }]} />);

    const item = screen.getByRole('listitem');

    expect(item).toHaveTextContent('Trabalha força, flexibilidade e postura.');
    expect(item.querySelector('strong')).toHaveTextContent('Trabalha força,');
  });

  it('item sem destaque sai só com o texto', () => {
    render(<CheckList items={[{ rest: 'Endocrinologia' }]} />);

    expect(screen.getByRole('listitem').querySelector('strong')).toBeNull();
  });

  it('o ícone de marcação é decorativo', () => {
    render(<CheckList items={[{ rest: 'Endocrinologia' }]} />);

    expect(screen.getByRole('listitem').querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });

  it('aceita classes de quem usa, mantendo a coluna', () => {
    render(<CheckList items={[{ rest: 'Endocrinologia' }]} className="gap-2 text-sm" />);

    expect(screen.getByRole('list')).toHaveClass('flex', 'flex-col', 'gap-2', 'text-sm');
  });
});
