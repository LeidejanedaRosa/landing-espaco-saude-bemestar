interface DecorativeImageSource {
  src: string;
  width: number;
  height: number;
}

interface DecorativeImageProps extends DecorativeImageSource {
  /** Só para imagem que aparece na primeira tela: carrega na hora. */
  priority?: boolean;
  /** `high` só para a ilustração principal da primeira tela; enfeite secundário fica em `auto`. */
  fetchPriority?: 'high' | 'low' | 'auto';
  /**
   * Outro desenho para telas que casam com `media` (ex.: uma figura em pé no desktop e uma
   * faixa larga no celular). O navegador baixa só o que vai usar.
   */
  alternate?: DecorativeImageSource & { media: string };
  className?: string;
}

/** Imagem só de enfeite (desenho em traço, folhagem). Leitores de tela a ignoram. */
export function DecorativeImage({
  src,
  width,
  height,
  priority = false,
  fetchPriority = 'auto',
  alternate,
  className
}: DecorativeImageProps) {
  const image = (
    <img
      src={src}
      width={width}
      height={height}
      alt=""
      aria-hidden="true"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={fetchPriority}
      decoding="async"
      className={className}
    />
  );

  if (!alternate) return image;

  return (
    <picture>
      <source
        media={alternate.media}
        srcSet={alternate.src}
        width={alternate.width}
        height={alternate.height}
      />
      {image}
    </picture>
  );
}
