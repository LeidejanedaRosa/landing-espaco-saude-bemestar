import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OrnamentDivider } from './OrnamentDivider';

function renderDivider(props: Parameters<typeof OrnamentDivider>[0] = {}) {
  const { container } = render(<OrnamentDivider {...props} />);
  const divider = container.firstElementChild as HTMLElement;
  const [firstLine, ornament, secondLine] = [...divider.children];

  return { divider, firstLine, ornament, secondLine };
}

describe('OrnamentDivider', () => {
  it('é só enfeite: o leitor de tela o ignora', () => {
    expect(renderDivider().divider).toHaveAttribute('aria-hidden', 'true');
  });

  it('tem uma linha de cada lado de um losango dourado', () => {
    const { firstLine, ornament, secondLine } = renderDivider();

    expect(ornament).toHaveClass('bg-gold', 'rotate-45');
    expect(firstLine).toHaveClass('h-px');
    expect(secondLine).toHaveClass('h-px');
  });

  it('por padrão é um traço curto, com a linha rosa do fundo claro', () => {
    const { divider, firstLine } = renderDivider();

    expect(divider).toHaveClass('w-28');
    expect(firstLine).toHaveClass('bg-rose/60');
  });

  it('sobre fundo escuro a linha é clara, e a largura é de quem usa', () => {
    const { divider, firstLine } = renderDivider({ tone: 'dark', className: 'w-full' });

    expect(divider).toHaveClass('w-full');
    expect(divider).not.toHaveClass('w-28');
    expect(firstLine).toHaveClass('bg-rose-soft/60');
  });
});
