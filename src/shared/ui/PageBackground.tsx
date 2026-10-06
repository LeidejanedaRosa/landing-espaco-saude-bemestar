import type { ReactNode } from 'react';

interface PageBackgroundProps {
  children: ReactNode;
}

export function PageBackground({ children }: PageBackgroundProps) {
  return <div className="from-cream to-blush min-h-dvh bg-linear-to-b">{children}</div>;
}
