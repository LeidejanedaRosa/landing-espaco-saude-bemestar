import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Carousel } from './Carousel';

const LABELS = ['Bicicleta', 'Reformer', 'Cadillac'];
const SLIDE_WIDTH = 600;

function renderCarousel() {
  render(
    <Carousel
      label="Aparelhos do studio"
      slideLabels={LABELS}
      previousLabel="Aparelho anterior"
      nextLabel="Próximo aparelho"
    >
      {LABELS.map((label) => (
        <p key={label}>{label}</p>
      ))}
    </Carousel>
  );
  const scroller = screen.getByRole('group', { name: /deslize/i });
  // O jsdom não calcula layout: a largura visível da área de rolagem é informada à mão.
  Object.defineProperty(scroller, 'clientWidth', { value: SLIDE_WIDTH, configurable: true });

  return {
    user: userEvent.setup(),
    scroller,
    previous: screen.getByRole('button', { name: 'Aparelho anterior' }),
    next: screen.getByRole('button', { name: 'Próximo aparelho' }),
    dot: (name: string) => screen.getByRole('button', { name: `Ver ${name}` }),
    // simula a pessoa arrastando (ou a rolagem suave chegando) até o slide pedido
    scrollToSlide: (slideIndex: number) => {
      scroller.scrollLeft = slideIndex * SLIDE_WIDTH;
      fireEvent.scroll(scroller);
    }
  };
}

describe('Carousel', () => {
  const scrollTo = vi.fn();

  beforeEach(() => {
    Element.prototype.scrollTo = scrollTo;
  });

  afterEach(() => {
    scrollTo.mockReset();
    vi.useRealTimers();
  });

  it('se apresenta ao leitor de tela como carrossel, com o nome do conjunto', () => {
    renderCarousel();

    const carousel = screen.getByRole('group', { name: 'Aparelhos do studio' });

    expect(carousel).toHaveAttribute('aria-roledescription', 'carrossel');
  });

  it('mantém todos os slides no HTML, cada um dizendo qual é e a posição', () => {
    renderCarousel();

    const slides = screen
      .getAllByRole('group')
      .filter((group) => group.getAttribute('aria-roledescription') === 'slide')
      .map((slide) => slide.getAttribute('aria-label'));

    expect(slides).toEqual(['Bicicleta, 1 de 3', 'Reformer, 2 de 3', 'Cadillac, 3 de 3']);
  });

  it('a área que rola recebe foco, para quem usa só o teclado conseguir deslizar', () => {
    const { scroller } = renderCarousel();

    expect(scroller).toHaveAttribute('tabindex', '0');
  });

  it('começa no primeiro slide: não há anterior, mas há próximo', () => {
    const { previous, next, dot } = renderCarousel();

    expect(previous).toHaveAttribute('aria-disabled', 'true');
    expect(next).toHaveAttribute('aria-disabled', 'false');
    expect(dot('Bicicleta')).toHaveAttribute('aria-current', 'true');
    expect(dot('Reformer')).not.toHaveAttribute('aria-current');
  });

  it('"próximo" rola até o slide seguinte', async () => {
    const { user, next } = renderCarousel();

    await user.click(next);

    expect(scrollTo).toHaveBeenCalledWith({ left: SLIDE_WIDTH });
  });

  it('um marcador leva direto ao slide dele', async () => {
    const { user, dot } = renderCarousel();

    await user.click(dot('Cadillac'));

    expect(scrollTo).toHaveBeenCalledWith({ left: 2 * SLIDE_WIDTH });
  });

  it('acompanha a rolagem: marcador, aviso ao leitor de tela e setas mudam com o slide à vista', () => {
    const { scrollToSlide, previous, next, dot } = renderCarousel();

    scrollToSlide(2);

    expect(dot('Cadillac')).toHaveAttribute('aria-current', 'true');
    expect(dot('Bicicleta')).not.toHaveAttribute('aria-current');
    expect(screen.getByText('Cadillac, 3 de 3', { selector: '[aria-live]' })).toBeInTheDocument();
    expect(previous).toHaveAttribute('aria-disabled', 'false');
    expect(next).toHaveAttribute('aria-disabled', 'true');
  });

  it('"anterior" volta um slide a partir do que está à vista', async () => {
    const { user, scrollToSlide, previous } = renderCarousel();
    scrollToSlide(2);

    await user.click(previous);

    expect(scrollTo).toHaveBeenCalledWith({ left: SLIDE_WIDTH });
  });

  it('nas pontas, as setas não rolam para além do primeiro nem do último slide', async () => {
    const { user, scrollToSlide, previous, next } = renderCarousel();

    await user.click(previous);
    scrollToSlide(2);
    await user.click(next);

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('dois cliques seguidos em "próximo" avançam dois slides, mesmo com a rolagem suave no meio do caminho', async () => {
    const { user, next, dot } = renderCarousel();

    await user.click(next);
    await user.click(next);

    expect(scrollTo).toHaveBeenNthCalledWith(1, { left: SLIDE_WIDTH });
    expect(scrollTo).toHaveBeenNthCalledWith(2, { left: 2 * SLIDE_WIDTH });
    expect(dot('Cadillac')).toHaveAttribute('aria-current', 'true');
  });

  it('a caminho do slide pedido, os slides por onde a rolagem passa não mudam o marcador', () => {
    const { scrollToSlide, dot } = renderCarousel();

    fireEvent.click(dot('Cadillac'));
    scrollToSlide(1);

    expect(dot('Cadillac')).toHaveAttribute('aria-current', 'true');
  });

  it('chegando ao slide pedido, volta a acompanhar a rolagem da pessoa', () => {
    const { scrollToSlide, dot } = renderCarousel();

    fireEvent.click(dot('Cadillac'));
    scrollToSlide(2);
    scrollToSlide(0);

    expect(dot('Bicicleta')).toHaveAttribute('aria-current', 'true');
  });

  it('se a pessoa arrasta para outro lado no meio do caminho, passa a valer o slide à vista', () => {
    vi.useFakeTimers();
    const { scrollToSlide, dot } = renderCarousel();

    fireEvent.click(dot('Cadillac'));
    scrollToSlide(1);
    act(() => vi.advanceTimersByTime(2000));

    expect(dot('Reformer')).toHaveAttribute('aria-current', 'true');
  });

  it('as setas continuam focáveis nas pontas, para o teclado não ser jogado para fora', () => {
    const { previous } = renderCarousel();

    expect(previous).not.toBeDisabled();
    previous.focus();
    expect(previous).toHaveFocus();
  });

  it('ignora rolagem enquanto a área ainda não tem largura', () => {
    const { scroller, dot } = renderCarousel();
    Object.defineProperty(scroller, 'clientWidth', { value: 0, configurable: true });

    scroller.scrollLeft = 900;
    fireEvent.scroll(scroller);

    expect(dot('Bicicleta')).toHaveAttribute('aria-current', 'true');
  });
});
