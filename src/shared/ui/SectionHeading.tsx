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
  /**
   * `dark` quando o cabeçalho fica sobre fundo escuro (bloco verde-oliva): destaque claro.
   * `rose` quando fica direto sobre o trecho rosa do degradê da página: o destaque ganha
   * fundo próprio.
   */
  tone?: 'light' | 'dark' | 'rose';
}

// O rótulo é igual em toda seção: um selo rosa-escuro com letra branca (5,9:1), que funciona
// sobre o creme, o rosa e o verde. Só o destaque muda com o fundo; ele é texto grande e
// precisa de 3:1.
const HIGHLIGHT_CLASSES = {
  light: 'text-rose-vivid',
  dark: 'text-rose-soft',
  // Sobre o rosa da página nenhum rosa chega ao contraste mínimo. O destaque ganha uma
  // pincelada creme por trás, com contorno e sombra chapada em dourado: o rosa vivo passa a
  // ser lido sobre creme (3,8:1), e não sobre rosa.
  rose: 'text-rose-vivid before:bg-cream before:border-gold relative isolate ml-[0.15em] px-[0.2em] before:absolute before:inset-x-0 before:inset-y-[0.02em] before:-z-10 before:-rotate-2 before:rounded-[45%_55%_50%_50%/60%_45%_55%_40%] before:border-2 before:shadow-[0.1em_0.1em_0_var(--color-gold)]'
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
        <p className="bg-rose-deep rounded-full px-3 py-0.5 text-sm font-semibold tracking-widest text-white uppercase">
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
            className={`${HIGHLIGHT_CLASSES[tone]} font-script inline-block text-[1.4em] leading-[0.85] font-normal`}
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
