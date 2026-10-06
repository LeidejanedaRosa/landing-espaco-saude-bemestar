import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDisclosure } from './useDisclosure';

function pressKey(key: string) {
  act(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key }));
  });
}

describe('useDisclosure', () => {
  it('começa fechado', () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.isOpen).toBe(false);
  });

  it('alterna entre aberto e fechado', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  it('fecha com close mesmo se já estiver fechado', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => result.current.toggle());
    act(() => result.current.close());
    act(() => result.current.close());

    expect(result.current.isOpen).toBe(false);
  });

  it('fecha com Esc e avisa quem usa, para devolver o foco', () => {
    const onEscapeClose = vi.fn();
    const { result } = renderHook(() => useDisclosure({ onEscapeClose }));

    act(() => result.current.toggle());
    pressKey('Escape');

    expect(result.current.isOpen).toBe(false);
    expect(onEscapeClose).toHaveBeenCalledTimes(1);
  });

  it('ignora outras teclas enquanto está aberto', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => result.current.toggle());
    pressKey('Enter');

    expect(result.current.isOpen).toBe(true);
  });

  it('não reage ao Esc quando já está fechado', () => {
    const onEscapeClose = vi.fn();
    renderHook(() => useDisclosure({ onEscapeClose }));

    pressKey('Escape');

    expect(onEscapeClose).not.toHaveBeenCalled();
  });
});
