import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCarousel } from './useCarousel';

describe('useCarousel', () => {
  it('começa no primeiro slide', () => {
    const { result } = renderHook(() => useCarousel(5));

    expect(result.current.index).toBe(0);
    expect(result.current.isFirst).toBe(true);
    expect(result.current.isLast).toBe(false);
  });

  it('com um slide só, ele é o primeiro e o último', () => {
    const { result } = renderHook(() => useCarousel(1));

    expect(result.current.isFirst).toBe(true);
    expect(result.current.isLast).toBe(true);
  });

  it('antes de a área de rolagem existir na página, pedir um slide não quebra', () => {
    const { result } = renderHook(() => useCarousel(5));

    expect(() => {
      result.current.goTo(2);
      result.current.goToNext();
      result.current.goToPrevious();
      result.current.scrollerProps.onScroll();
    }).not.toThrow();
    expect(result.current.index).toBe(0);
  });
});
