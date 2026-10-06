import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DecorativeImage } from './DecorativeImage';

function renderImage(priority?: boolean) {
  const { container } = render(
    <DecorativeImage src="/traco.svg" width={300} height={400} priority={priority} />
  );

  return container.querySelector('img') as HTMLImageElement;
}

describe('DecorativeImage', () => {
  it('é decorativo: sem texto alternativo e escondido de leitores de tela', () => {
    const img = renderImage();

    expect(img).toHaveAttribute('alt', '');
    expect(img).toHaveAttribute('aria-hidden', 'true');
  });

  it('adia o carregamento por padrão', () => {
    expect(renderImage()).toHaveAttribute('loading', 'lazy');
  });

  it('carrega na hora quando está na primeira tela', () => {
    expect(renderImage(true)).toHaveAttribute('loading', 'eager');
  });

  it('declara largura e altura para reservar o espaço na página', () => {
    const img = renderImage();

    expect(img).toHaveAttribute('width', '300');
    expect(img).toHaveAttribute('height', '400');
  });

  it('não disputa prioridade de download por padrão, mesmo quando carrega na hora', () => {
    expect(renderImage(true)).toHaveAttribute('fetchpriority', 'auto');
  });

  it('aceita prioridade alta de download, independente do modo de carregamento', () => {
    const { container } = render(
      <DecorativeImage src="/traco.svg" width={300} height={400} fetchPriority="high" />
    );

    const img = container.querySelector('img');

    expect(img).toHaveAttribute('fetchpriority', 'high');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('sem desenho alternativo, não cria o elemento picture', () => {
    const { container } = render(<DecorativeImage src="/traco.svg" width={300} height={400} />);

    expect(container.querySelector('picture')).toBeNull();
  });

  it('com desenho alternativo, oferece cada um à tela certa, com as próprias dimensões', () => {
    const { container } = render(
      <DecorativeImage
        src="/faixa.svg"
        width={900}
        height={300}
        alternate={{ media: '(min-width: 64rem)', src: '/figura.svg', width: 300, height: 400 }}
      />
    );

    const source = container.querySelector('picture > source');
    const img = container.querySelector('picture > img');

    expect(source).toHaveAttribute('media', '(min-width: 64rem)');
    expect(source).toHaveAttribute('srcset', '/figura.svg');
    expect(source).toHaveAttribute('width', '300');
    expect(img).toHaveAttribute('src', '/faixa.svg');
    expect(img).toHaveAttribute('width', '900');
    expect(img).toHaveAttribute('alt', '');
  });
});
