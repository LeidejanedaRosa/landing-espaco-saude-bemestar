interface SectionHeadingProps {
  /** id do título; a seção aponta para ele com aria-labelledby. */
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
      {eyebrow && (
        <p className="text-rose-deep text-sm font-semibold tracking-widest uppercase">{eyebrow}</p>
      )}
      <h2 id={id} className="text-3xl leading-tight font-medium sm:text-4xl">
        {title}
      </h2>
      {description && <p className="text-lg">{description}</p>}
    </div>
  );
}
