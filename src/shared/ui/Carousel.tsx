import { Children, type ReactNode } from 'react';
import { useCarousel } from '../hooks/useCarousel';

interface CarouselProps {
  /** Nome do conjunto, para o leitor de tela (ex.: "Aparelhos do studio"). */
  label: string;
  /** Nome de cada slide, na ordem dos filhos. */
  slideLabels: string[];
  previousLabel: string;
  nextLabel: string;
  /** Um filho por slide. */
  children: ReactNode;
}

const ARROW_CLASSES =
  'border-olive-deep text-olive-deep hover:bg-olive-deep hover:text-cream focus-visible:outline-olive-deep inline-flex size-11 items-center justify-center rounded-full border focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-40';

function Arrow({ direction }: Readonly<{ direction: 'left' | 'right' }>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  );
}

/**
 * Um item por vez, sem troca automática (padrão "Carousel" da WAI-ARIA). Todos os slides ficam
 * no HTML e ao alcance do leitor de tela; setas e marcadores são botões de verdade.
 */
export function Carousel({
  label,
  slideLabels,
  previousLabel,
  nextLabel,
  children
}: Readonly<CarouselProps>) {
  const slides = Children.toArray(children);
  const carousel = useCarousel(slides.length);
  const position = (slideIndex: number) =>
    `${slideLabels[slideIndex]}, ${slideIndex + 1} de ${slides.length}`;

  return (
    <div
      role="group"
      aria-roledescription="carrossel"
      aria-label={label}
      className="flex flex-col gap-[clamp(0.5rem,2dvh,1.25rem)]"
    >
      {/* Os controles vêm antes dos slides: no celular o cartão é mais alto que a tela, e
          embaixo dele ninguém os encontraria. */}
      <div className="flex items-center justify-center gap-3">
        {/* `aria-disabled`, e não `disabled`: um botão desabilitado perde o foco, e quem
            navega pelo teclado seria jogado para fora do carrossel ao chegar na ponta. */}
        <button
          type="button"
          aria-label={previousLabel}
          aria-disabled={carousel.isFirst}
          onClick={carousel.goToPrevious}
          className={ARROW_CLASSES}
        >
          <Arrow direction="left" />
        </button>

        <div className="flex">
          {slideLabels.map((slideLabel, slideIndex) => (
            <button
              key={slideLabel}
              type="button"
              aria-label={`Ver ${slideLabel}`}
              aria-current={slideIndex === carousel.index ? 'true' : undefined}
              onClick={() => carousel.goTo(slideIndex)}
              className="group/dot focus-visible:outline-olive-deep inline-flex size-6 items-center justify-center rounded-full focus-visible:outline-2"
            >
              <span className="border-olive-deep group-aria-[current]/dot:bg-olive-deep size-2.5 rounded-full border transition-[width] duration-300 group-aria-[current]/dot:w-5 motion-reduce:transition-none" />
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label={nextLabel}
          aria-disabled={carousel.isLast}
          onClick={carousel.goToNext}
          className={ARROW_CLASSES}
        >
          <Arrow direction="right" />
        </button>
      </div>

      {/* A área que rola precisa receber foco: sem isso, quem usa só o teclado em um navegador
          que não foca áreas de rolagem por conta própria não consegue deslizar. */}
      <div
        {...carousel.scrollerProps}
        role="group"
        aria-label={`${label}: deslize para os lados`}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className="focus-visible:outline-olive-deep flex snap-x snap-mandatory scrollbar-none overflow-x-auto rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:scroll-smooth"
      >
        {slides.map((slide, slideIndex) => (
          <div
            key={slideLabels[slideIndex]}
            role="group"
            aria-roledescription="slide"
            aria-label={position(slideIndex)}
            className="w-full shrink-0 snap-center"
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Avisa o leitor de tela qual slide entrou, quando a troca vem de um botão. */}
      <p className="sr-only" aria-live="polite">
        {position(carousel.index)}
      </p>
    </div>
  );
}
