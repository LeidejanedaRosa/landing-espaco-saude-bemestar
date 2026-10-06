import type { ReactNode } from 'react';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  /** Link para fora do site: abre em nova aba e avisa disso ao leitor de tela. */
  external?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const BASE_CLASSES =
  'bg-olive-deep text-cream hover:bg-ink focus-visible:outline-olive-deep inline-flex min-h-11 items-center justify-center rounded-full font-medium focus-visible:outline-2 focus-visible:outline-offset-2';

const SIZE_CLASSES = {
  sm: 'px-4 text-sm',
  md: 'px-6'
};

export function ButtonLink({
  href,
  children,
  external = false,
  size = 'md',
  className
}: ButtonLinkProps) {
  const classes = [BASE_CLASSES, SIZE_CLASSES[size], className].filter(Boolean).join(' ');
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a href={href} className={classes} {...externalProps}>
      {children}
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}
