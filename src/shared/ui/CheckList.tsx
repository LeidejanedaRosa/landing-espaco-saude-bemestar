export interface CheckListItem {
  /** Começo do item, em destaque. Opcional. */
  lead?: string;
  rest: string;
}

interface CheckListProps {
  items: CheckListItem[];
  /** Tamanho de fonte e espaço entre os itens; quem usa decide. */
  className?: string;
}

/** Lista de itens marcados. É `<ul>` para o leitor de tela anunciar quantos são. */
export function CheckList({ items, className }: Readonly<CheckListProps>) {
  const classes = ['flex flex-col', className].filter(Boolean).join(' ');

  return (
    <ul className={classes}>
      {items.map((item) => (
        <li key={`${item.lead ?? ''}${item.rest}`} className="flex gap-2">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="text-teal-deep mt-[0.2em] size-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <span>
            {item.lead && <strong className="font-semibold">{item.lead} </strong>}
            {item.rest}
          </span>
        </li>
      ))}
    </ul>
  );
}
