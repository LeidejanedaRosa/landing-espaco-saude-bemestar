import { useId, useRef, useState, type KeyboardEvent } from 'react';

/**
 * Abas acessíveis (padrão "Tabs" da WAI-ARIA): só a aba ativa entra na ordem do Tab; as setas,
 * Home e End trocam de aba e levam o foco junto.
 */
export function useTabs(count: number) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const baseId = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function selectAndFocus(index: number) {
    const next = (index + count) % count;
    setSelectedIndex(next);
    tabs.current[next]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent) {
    const targets: Record<string, number> = {
      ArrowRight: selectedIndex + 1,
      ArrowLeft: selectedIndex - 1,
      Home: 0,
      End: count - 1
    };
    if (!(event.key in targets)) return;

    event.preventDefault();
    selectAndFocus(targets[event.key]);
  }

  return {
    selectedIndex,
    getTabProps: (index: number) => ({
      id: `${baseId}-tab-${index}`,
      role: 'tab' as const,
      type: 'button' as const,
      'aria-selected': index === selectedIndex,
      'aria-controls': `${baseId}-panel-${index}`,
      tabIndex: index === selectedIndex ? 0 : -1,
      onClick: () => setSelectedIndex(index),
      onKeyDown: handleKeyDown,
      ref: (element: HTMLButtonElement | null) => {
        tabs.current[index] = element;
      }
    }),
    getPanelProps: (index: number) => ({
      id: `${baseId}-panel-${index}`,
      role: 'tabpanel' as const,
      'aria-labelledby': `${baseId}-tab-${index}`,
      // `inert`, e não `hidden`: o painel inativo sai do teclado e do leitor de tela, mas segue
      // ocupando espaço. Quem usa decide como escondê-lo da vista (`inert:invisible`).
      inert: index !== selectedIndex
    })
  };
}
