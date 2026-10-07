import type { ReactNode } from 'react';

/**
 * Lista de cartões em 1, 2 ou 3 colunas. É flex com justify-center, e não grid: a última
 * linha, quando incompleta, fica centralizada em vez de encostar à esquerda.
 */
export function CardGrid({ children }: { children: ReactNode }) {
  return <ul className="flex flex-wrap justify-center gap-6">{children}</ul>;
}
