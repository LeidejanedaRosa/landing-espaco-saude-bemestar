export interface PictureImage {
  /** Formato → srcset, na ordem de preferência (ex.: avif antes de webp). */
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
}

interface PictureProps {
  image: PictureImage;
  /** Texto alternativo. Use "" quando a imagem for só decorativa. */
  alt: string;
  /** Largura que a imagem ocupa na tela, para o navegador escolher o arquivo certo. */
  sizes: string;
  /** Só para a imagem principal da primeira tela: carrega na hora e com prioridade. */
  priority?: boolean;
  className?: string;
}

export function Picture({ image, alt, sizes, priority = false, className }: PictureProps) {
  return (
    <picture>
      {Object.entries(image.sources).map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={image.img.src}
        width={image.img.w}
        height={image.img.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
