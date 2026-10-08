import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LineIcon } from './LineIcon';

describe('LineIcon', () => {
  it('é decorativo: o leitor de tela o ignora', () => {
    const { container } = render(<LineIcon paths={['M2 12h20']} />);

    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('desenha um traço para cada caminho recebido', () => {
    const { container } = render(<LineIcon paths={['M2 12h20', 'M12 2v20']} />);

    const drawn = [...container.querySelectorAll('path')].map((path) => path.getAttribute('d'));

    expect(drawn).toEqual(['M2 12h20', 'M12 2v20']);
  });

  it('herda a cor do texto e tem um tamanho padrão, que quem usa pode trocar', () => {
    const { container, rerender } = render(<LineIcon paths={['M2 12h20']} />);
    const icon = () => container.querySelector('svg');

    expect(icon()).toHaveAttribute('stroke', 'currentColor');
    expect(icon()).toHaveClass('size-6');

    rerender(<LineIcon paths={['M2 12h20']} className="size-5" />);
    expect(icon()).toHaveClass('size-5');
    expect(icon()).not.toHaveClass('size-6');
  });
});
