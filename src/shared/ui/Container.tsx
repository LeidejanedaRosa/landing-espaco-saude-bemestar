import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  const classes = ['max-w-page px-gutter mx-auto w-full', className].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
}
