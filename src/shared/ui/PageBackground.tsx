import type { ReactNode } from 'react';
import wallpaper from '../../assets/fundos/bonecas.svg';

interface PageBackgroundProps {
  children: ReactNode;
}

// O papel de parede some quase todo atrás da coluna de conteúdo e aparece inteiro nas
// margens laterais, que só existem em telas mais largas que o conteúdo.
const WALLPAPER_MASK =
  'linear-gradient(to right, black calc(50% - 42rem), rgb(0 0 0 / 0.3) calc(50% - 34rem), rgb(0 0 0 / 0.3) calc(50% + 34rem), black calc(50% + 42rem))';

// Degradê da página inteira, nas cores dos posts da cliente: creme no topo e o rosa entrando
// em diagonal, pela esquerda, até tomar a página. O verde-oliva do fim sobe a partir do
// rodapé (ver `Footer`), para ficar sempre no mesmo lugar em relação aos Depoimentos.
const ROSE = 'color-mix(in oklab, var(--color-rose) 80%, var(--color-cream))';
const ROSE_LIGHT = 'color-mix(in oklab, var(--color-rose) 40%, var(--color-cream))';
const WASH = [
  `radial-gradient(ellipse 135% 28% at 0% 50%, ${ROSE} 0%, ${ROSE} 25%, transparent 100%)`,
  `linear-gradient(192deg, var(--color-cream) 0%, var(--color-cream) 20%, ${ROSE_LIGHT} 48%, ${ROSE} 78%)`
].join(', ');

export function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="from-cream to-blush relative isolate min-h-dvh bg-linear-to-b">
      <div
        aria-hidden="true"
        data-wash
        className="pointer-events-none absolute inset-0 -z-20 opacity-(--wash-opacity,1)"
        style={{ backgroundImage: WASH }}
      />
      {/* background-image, e não <img>: é um único arquivo pequeno, repetido na página toda. */}
      <div
        aria-hidden="true"
        data-wallpaper
        className="pointer-events-none absolute inset-0 -z-10 bg-[length:110rem_auto] bg-top"
        style={{
          backgroundImage: `url(${wallpaper})`,
          maskImage: WALLPAPER_MASK,
          WebkitMaskImage: WALLPAPER_MASK
        }}
      />
      {children}
    </div>
  );
}
