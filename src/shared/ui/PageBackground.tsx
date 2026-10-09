import type { ReactNode } from 'react';
import wallpaper from '../../assets/fundos/bonecas.svg';

interface PageBackgroundProps {
  children: ReactNode;
}

// O papel de parede some quase todo atrás da coluna de conteúdo e aparece inteiro nas
// margens laterais, que só existem em telas mais largas que o conteúdo.
const WALLPAPER_MASK =
  'linear-gradient(to right, black calc(50% - 42rem), rgb(0 0 0 / 0.3) calc(50% - 34rem), rgb(0 0 0 / 0.3) calc(50% + 34rem), black calc(50% + 42rem))';

export function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="from-cream to-blush relative isolate min-h-dvh bg-linear-to-b">
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
