import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CornerFronds } from './CornerFronds';

describe('CornerFronds', () => {
  it('desenha um ramo por posição recebida, cada um com as classes da sua posição', () => {
    const { container } = render(<CornerFronds positions={['top-0 left-0', 'right-0 bottom-0']} />);

    const fronds = [...container.querySelectorAll('img')];

    expect(fronds).toHaveLength(2);
    expect(fronds[0]).toHaveClass('top-0', 'left-0');
    expect(fronds[1]).toHaveClass('right-0', 'bottom-0');
  });

  it('os ramos são só enfeite: ficam atrás do conteúdo, sem texto e sem receber cliques', () => {
    const { container } = render(<CornerFronds positions={['top-0 left-0']} />);

    const frond = container.querySelector('img');

    expect(frond).toHaveAttribute('alt', '');
    expect(frond).toHaveAttribute('aria-hidden', 'true');
    expect(frond).toHaveClass('pointer-events-none', '-z-10');
  });

  it('sem posições, não desenha nada', () => {
    const { container } = render(<CornerFronds positions={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
