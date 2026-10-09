import type { ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
  /** Destino do link do menu (ex.: "servicos" para "#servicos"). */
  id: string;
  /** id do título da seção, para ela se identificar por ele. */
  labelledBy: string;
  /**
   * Ocupa a altura da tela menos o header, com o conteúdo centralizado na vertical. Em tela
   * alta (monitor grande) a altura para em 44rem: acima disso sobrava um vazio entre as seções.
   */
  fullScreen?: boolean;
  children: ReactNode;
}

/** Casca de toda seção depois do hero: largura, respiro vertical e espaço entre os blocos. */
export function Section({ id, labelledBy, fullScreen = false, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      // `overflow-clip`: antes de surgir, o conteúdo fica deslocado para baixo; sem o recorte,
      // esse deslocamento na última seção aumentaria a altura da página.
      className={`overflow-clip ${fullScreen ? 'min-h-fullscreen flex' : ''}`.trim()}
    >
      <Container className="py-section reveal-on-scroll flex flex-col justify-center gap-[clamp(0.75rem,2.5dvh,2rem)]">
        {children}
      </Container>
    </section>
  );
}
