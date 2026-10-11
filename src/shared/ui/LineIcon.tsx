interface LineIconProps {
  /** Caminhos do desenho, em uma área de 24×24. */
  paths: string[];
  className?: string;
}

/** Ícone de linha, só de enfeite: o leitor de tela o ignora. A cor vem do texto em volta. */
export function LineIcon({ paths, className = 'size-6' }: Readonly<LineIconProps>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
