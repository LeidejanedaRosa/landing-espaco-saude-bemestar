import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Picture, type PictureImage } from './Picture';

const image: PictureImage = {
  sources: {
    avif: '/foto-480.avif 480w, /foto-960.avif 960w',
    webp: '/foto-480.webp 480w, /foto-960.webp 960w'
  },
  img: { src: '/foto-960.webp', w: 960, h: 640 }
};

function renderPicture(props: Partial<Parameters<typeof Picture>[0]> = {}) {
  const { container } = render(
    <Picture image={image} alt="Sala do studio" sizes="50vw" {...props} />
  );

  return {
    img: container.querySelector('img') as HTMLImageElement,
    sources: [...container.querySelectorAll('source')]
  };
}

describe('Picture', () => {
  it('adia o carregamento por padrão, para não baixar o que ainda não está visível', () => {
    const { img } = renderPicture();

    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
    expect(img).toHaveAttribute('fetchpriority', 'auto');
  });

  it('carrega na hora e com prioridade quando é a imagem principal da primeira tela', () => {
    const { img } = renderPicture({ priority: true });

    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
  });

  it('declara largura e altura para o navegador reservar o espaço antes de a imagem chegar', () => {
    const { img } = renderPicture();

    expect(img).toHaveAttribute('width', '960');
    expect(img).toHaveAttribute('height', '640');
  });

  it('oferece AVIF antes de WebP, cada um com seus tamanhos', () => {
    const { sources } = renderPicture();

    expect(sources.map((source) => source.getAttribute('type'))).toEqual([
      'image/avif',
      'image/webp'
    ]);
    expect(sources[0]).toHaveAttribute('srcset', image.sources.avif);
    expect(sources[0]).toHaveAttribute('sizes', '50vw');
  });

  it('aceita texto alternativo vazio para imagem decorativa', () => {
    const { img } = renderPicture({ alt: '' });

    expect(img).toHaveAttribute('alt', '');
  });
});
