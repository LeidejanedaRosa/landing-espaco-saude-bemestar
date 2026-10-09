import type { ReactNode } from 'react';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  /** Link para fora do site: abre em nova aba e avisa disso ao leitor de tela. */
  external?: boolean;
  size?: 'sm' | 'md';
  /** `light` é o botão cheio para fundo escuro (bloco verde-oliva). */
  variant?: 'primary' | 'secondary' | 'light';
  className?: string;
}

// `text-center`, `py` e `leading-snug`: em tela muito estreita o texto pode quebrar em duas
// linhas, e aí ele fica centralizado e com respiro, em vez de encostado à esquerda.
const BASE_CLASSES =
  'inline-flex min-h-11 items-center justify-center rounded-full py-1.5 text-center leading-snug font-medium focus-visible:outline-2 focus-visible:outline-offset-2';

// O contorno de foco muda com o fundo: escuro sobre fundo claro, claro sobre fundo escuro.
const VARIANT_CLASSES = {
  primary: 'bg-olive-deep text-cream hover:bg-ink focus-visible:outline-olive-deep',
  secondary:
    'border-olive-deep text-olive-deep hover:bg-olive-deep hover:text-cream focus-visible:outline-olive-deep border',
  light: 'bg-cream text-olive-deep hover:bg-blush focus-visible:outline-cream'
};

const SIZE_CLASSES = {
  sm: 'px-4 text-sm',
  md: 'px-5'
};

export function ButtonLink({
  href,
  children,
  external = false,
  size = 'md',
  variant = 'primary',
  className
}: ButtonLinkProps) {
  const classes = [BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className]
    .filter(Boolean)
    .join(' ');
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a href={href} className={classes} {...externalProps}>
      {children}
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}
