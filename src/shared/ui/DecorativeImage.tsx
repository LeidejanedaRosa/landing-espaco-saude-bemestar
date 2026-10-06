interface DecorativeImageProps {
  src: string;
  width: number;
  height: number;
  /** Só para imagem que aparece na primeira tela: carrega na hora. */
  priority?: boolean;
  /** `high` só para a ilustração principal da primeira tela; enfeite secundário fica em `auto`. */
  fetchPriority?: 'high' | 'low' | 'auto';
  className?: string;
}

/** Imagem só de enfeite (desenho em traço, folhagem). Leitores de tela a ignoram. */
export function DecorativeImage({
  src,
  width,
  height,
  priority = false,
  fetchPriority = 'auto',
  className
}: DecorativeImageProps) {
  return (
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
}
