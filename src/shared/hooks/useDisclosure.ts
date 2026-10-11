import { useCallback, useEffect, useState } from 'react';

interface UseDisclosureOptions {
  /** Chamado quando o conteúdo é fechado pela tecla Esc (ex.: devolver o foco ao botão). */
  onEscapeClose?: () => void;
}

export function useDisclosure({ onEscapeClose }: UseDisclosureOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((current) => !current), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      onEscapeClose?.();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onEscapeClose]);

  return { isOpen, toggle, close };
}
