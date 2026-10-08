interface OrnamentDividerProps {
  /** `dark` quando fica sobre fundo escuro (bloco verde-oliva): linha clara. */
  tone?: 'light' | 'dark';
  /** Largura do divisor; por padrão, um traço curto sob um título. */
  className?: string;
}

const LINE_CLASSES = {
  light: 'bg-rose/60',
  dark: 'bg-rose-soft/60'
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
      <span className="bg-gold size-1.5 shrink-0 rotate-45" />
      <span className={line} />
    </span>
  );
}
