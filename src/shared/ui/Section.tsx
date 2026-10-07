import type { ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
  /** Destino do link do menu (ex.: "servicos" para "#servicos"). */
  id: string;
  /** id do título da seção, para ela se identificar por ele. */
  labelledBy: string;
  /** Ocupa a altura da tela menos o header, com o conteúdo centralizado na vertical. */
  fullScreen?: boolean;
  children: ReactNode;
}

/** Casca de toda seção depois do hero: largura, respiro vertical e espaço entre os blocos. */
export function Section({ id, labelledBy, fullScreen = false, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={fullScreen ? 'flex min-h-[calc(100dvh-var(--spacing-header))]' : undefined}
    >
      <Container className="py-section flex flex-col justify-center gap-[clamp(0.75rem,2.5dvh,2rem)]">
        {children}
      </Container>
    </section>
  );
}
