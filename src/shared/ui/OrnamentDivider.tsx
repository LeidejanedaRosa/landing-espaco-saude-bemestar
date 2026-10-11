interface OrnamentDividerProps {
  /** `dark` sobre fundo escuro (bloco verde-oliva); `cream` sobre o trecho rosa da página. */
  tone?: 'light' | 'dark' | 'cream';
  /** Largura do divisor; por padrão, um traço curto sob um título. */
  className?: string;
}

const LINE_CLASSES = {
  light: 'bg-rose/60',
  dark: 'bg-rose-soft/60',
  cream: 'bg-cream'
};
const DIAMOND_CLASSES = {
  light: 'bg-gold',
  dark: 'bg-gold',
  cream: 'bg-cream'
};

/** Linha fina com um pequeno losango dourado no meio, como nos posts da cliente. Só enfeite. */
export function OrnamentDivider({
  tone = 'light',
  className = 'w-28'
}: Readonly<OrnamentDividerProps>) {
  const line = `${LINE_CLASSES[tone]} h-px flex-1`;

  return (
    <span aria-hidden="true" className={`flex items-center gap-2 ${className}`}>
      <span className={line} />
      <span className={`${DIAMOND_CLASSES[tone]} size-1.5 shrink-0 rotate-45`} />
      <span className={line} />
    </span>
  );
}
