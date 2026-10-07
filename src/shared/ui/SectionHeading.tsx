interface SectionHeadingProps {
  /** id do título; a seção aponta para ele com aria-labelledby. */
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
      {eyebrow && (
        <p className="text-rose-deep text-sm font-semibold tracking-widest uppercase">{eyebrow}</p>
      )}
      <h2
        id={id}
        className="text-[clamp(1.5rem,min(3vw,5.5dvh),2.25rem)] leading-tight font-medium"
      >
        {title}
      </h2>
      {description && <p className="text-lg">{description}</p>}
    </div>
  );
}
