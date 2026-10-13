import eucaliptoClaro from '../../assets/folhagens/eucalipto-claro.svg';
import { DecorativeImage } from './DecorativeImage';

interface CornerFrondsProps {
  /** Classes de posição, tamanho e giro de cada ramo. */
  positions: string[];
}

/**
 * Ramos claros em leque, saindo dos cantos e emoldurando a seção, como as folhas claras nos
 * cantos dos posts da cliente. Ficam atrás do conteúdo: o elemento de fora precisa de
 * `relative isolate`.
 */
export function CornerFronds({ positions }: Readonly<CornerFrondsProps>) {
  return positions.map((position) => (
    <DecorativeImage
      key={position}
      src={eucaliptoClaro}
      width={160}
      height={320}
      className={`pointer-events-none absolute -z-10 w-auto ${position}`}
    />
  ));
}
