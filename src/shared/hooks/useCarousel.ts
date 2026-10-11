import { useEffect, useRef, useState } from 'react';

/**
 * Prazo para a rolagem pedida por um botão chegar ao destino. Passado ele, vale o slide que
 * estiver à vista: é o caso de a pessoa ter arrastado para outro lado no meio do caminho.
 */
const ARRIVAL_TIMEOUT_MS = 2000;

/**
 * Carrossel sobre rolagem nativa (scroll-snap): o arrasto com o dedo, a roda do mouse e as
 * setas do teclado já funcionam sem JavaScript. O hook só acompanha qual slide está à vista e
 * leva a rolagem até outro quando um botão pede.
 */
export function useCarousel(count: number) {
  const [index, setIndex] = useState(0);
  // O mesmo valor de `index`, lido na hora: o estado só muda na próxima renderização, e uma
  // tecla apertada antes dela calcularia o próximo slide a partir do slide antigo.
  const current = useRef(0);
  const scroller = useRef<HTMLDivElement>(null);
  // Slide pedido por um botão enquanto a rolagem suave ainda está a caminho dele. Nesse
  // intervalo o slide atual é o pedido, e não o que está passando pela tela: sem isso, dois
  // cliques seguidos em "próximo" contariam a partir do mesmo slide e avançariam só um.
  const target = useRef<number | null>(null);
  const arrivalTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(arrivalTimer.current), []);

  function visibleIndex(element: HTMLDivElement) {
    return Math.round(element.scrollLeft / element.clientWidth);
  }

  function show(slideIndex: number) {
    current.current = slideIndex;
    setIndex(slideIndex);
  }

  function followScrollAgain(element: HTMLDivElement) {
    clearTimeout(arrivalTimer.current);
    target.current = null;
    show(visibleIndex(element));
  }

  function goTo(requested: number) {
    const element = scroller.current;
    if (!element) return;

    const next = Math.min(Math.max(requested, 0), count - 1);
    if (next === current.current) return;

    target.current = next;
    show(next);
    // A chegada não pode ser medida por "parou de vir evento de rolagem": o Safari avisa só
    // no começo e no fim da rolagem suave, e o intervalo entre os dois pareceria uma parada.
    clearTimeout(arrivalTimer.current);
    arrivalTimer.current = setTimeout(() => followScrollAgain(element), ARRIVAL_TIMEOUT_MS);
    // Sem `behavior`: quem decide se a rolagem é suave é o CSS, que respeita a preferência
    // de redução de movimento (`motion-safe:scroll-smooth`).
    element.scrollTo({ left: next * element.clientWidth });
  }

  function handleScroll() {
    const element = scroller.current;
    if (!element || element.clientWidth === 0) return;

    const isOnTheWay = target.current !== null && visibleIndex(element) !== target.current;
    if (!isOnTheWay) followScrollAgain(element);
  }

  return {
    index,
    isFirst: index === 0,
    isLast: index === count - 1,
    goTo,
    goToPrevious: () => goTo(current.current - 1),
    goToNext: () => goTo(current.current + 1),
    scrollerProps: { ref: scroller, onScroll: handleScroll }
  };
}
