import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageBackground } from './PageBackground';

describe('PageBackground', () => {
  it('mostra o conteúdo recebido', () => {
    render(
      <PageBackground>
        <p>conteúdo da página</p>
      </PageBackground>
    );

    expect(screen.getByText('conteúdo da página')).toBeInTheDocument();
  });

  it('o papel de parede é só enfeite: escondido de leitores de tela e sem capturar cliques', () => {
    const { container } = render(
      <PageBackground>
        <p>conteúdo</p>
      </PageBackground>
    );

    const wallpaper = container.querySelector('[data-wallpaper]');

    expect(wallpaper).toHaveAttribute('aria-hidden', 'true');
    expect(wallpaper).toHaveClass('pointer-events-none');
    expect(wallpaper).toBeEmptyDOMElement();
  });

  it('o degradê é só enfeite e fica em uma camada própria, que não captura cliques', () => {
    const { container } = render(
      <PageBackground>
        <p>conteúdo</p>
      </PageBackground>
    );

    const wash = container.querySelector('[data-wash]');

    expect(wash).toHaveAttribute('aria-hidden', 'true');
    expect(wash).toHaveClass('pointer-events-none');
    expect(wash).toBeEmptyDOMElement();
  });
});
