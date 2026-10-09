interface SectionHeadingProps {
  /** id do título; a seção aponta para ele com aria-labelledby. */
  id: string;
  eyebrow?: string;
  title: string;
  /**
   * Trecho do título que vai em destaque, na fonte manuscrita e em rosa. Uma palavra ou
   * expressão curta, escrita exatamente como aparece no título.
   */
  highlight?: string;
  description?: string;
  /**
   * `start` quando o cabeçalho vai dentro de um cartão, ao lado de uma foto.
   * `center-then-start` quando ele só fica ao lado da imagem a partir do tablet: no celular,
   * empilhado com ela, fica centralizado.
   */
  align?: 'center' | 'start' | 'center-then-start';
  /** `dark` quando o cabeçalho fica sobre fundo escuro (bloco verde-oliva): cores claras. */
  tone?: 'light' | 'dark';
}

// Em cada fundo, o rótulo (texto pequeno) precisa de 4,5:1 e o destaque (texto grande), de 3:1.
const TONE_CLASSES = {
  light: { eyebrow: 'text-rose-ink', highlight: 'text-rose-vivid' },
  dark: { eyebrow: 'text-blush', highlight: 'text-rose-soft' }
};

const ALIGN_CLASSES = {
  center: 'mx-auto max-w-3xl items-center text-center',
  start: 'items-start text-left',
  'center-then-start': 'items-center text-center sm:items-start sm:text-left'
};

/** Divide o título em antes, destaque e depois. Sem destaque (ou se ele não está no título), devolve só o título. */
function splitTitle(title: string, highlight?: string) {
  const start = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || start === -1) return { before: title, highlighted: '', after: '' };

  return {
    before: title.slice(0, start),
    highlighted: highlight,
    after: title.slice(start + highlight.length)
  };
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  tone = 'light'
}: Readonly<SectionHeadingProps>) {
  const { before, highlighted, after } = splitTitle(title, highlight);

  return (
    <div className={`flex flex-col gap-2 ${ALIGN_CLASSES[align]}`}>
      {eyebrow && (
        <p
          className={`${TONE_CLASSES[tone].eyebrow} text-sm font-semibold tracking-widest uppercase`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="text-[clamp(1.5rem,min(3vw,5.5dvh),2.25rem)] leading-tight font-medium wrap-anywhere"
      >
        {before}
        {highlighted && (
          // Mesmo gesto do hero: a manuscrita é mais miúda que a serifada, por isso é maior; a
          // altura de linha abaixo de 1 não deixa a linha do título crescer por causa dela.
          // Sem `nowrap`: em tela estreita, com a fonte do navegador aumentada, o destaque
          // precisa poder quebrar (o `wrap-anywhere` do título quebra até uma palavra só).
          // `inline-block`: enquanto couber, o destaque desce inteiro para a linha seguinte, em
          // vez de se partir ao meio ("cuidado" em uma linha e "humano" na outra).
          <span
            className={`${TONE_CLASSES[tone].highlight} font-script inline-block text-[1.4em] leading-[0.85] font-normal`}
          >
            {highlighted}
          </span>
        )}
        {after}
      </h2>
      {description && <p className="text-lg">{description}</p>}
    </div>
  );
}
