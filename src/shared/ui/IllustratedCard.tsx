import { Picture, type PictureImage } from './Picture';

export interface CardItem {
  /** Começo do item, em destaque. Opcional. */
  lead?: string;
  rest: string;
}

interface IllustratedCardProps {
  image: PictureImage;
  imageAlt: string;
  /** Rótulo curto acima do título. */
  tag?: string;
  title: string;
  description?: string;
  items: CardItem[];
}

const IMAGE_SIZES = '(min-width: 64rem) 22rem, (min-width: 48rem) 45vw, 90vw';

/** Cartão com ilustração, título e lista. Vai sempre dentro de um CardGrid. */
export function IllustratedCard({
  image,
  imageAlt,
  tag,
  title,
  description,
  items
}: IllustratedCardProps) {
  return (
    <li className="group bg-cream/80 border-olive/40 flex w-full flex-col overflow-hidden rounded-3xl border md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
      {/* Painel branco de proporção fixa: as ilustrações têm formatos diferentes (umas largas,
          outras altas); aqui todas ocupam a mesma área, inteiras, sem distorcer. */}
      <div className="relative m-3 aspect-4/3 overflow-hidden rounded-2xl bg-white">
        <Picture
          image={image}
          alt={imageAlt}
          sizes={IMAGE_SIZES}
          className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] object-contain transition-transform duration-500 ease-out group-hover:scale-130 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="flex flex-col gap-3 px-6 pt-2 pb-6">
        <div className="flex flex-col gap-1">
          {tag && (
            <p className="text-rose-deep text-xs font-semibold tracking-widest uppercase">{tag}</p>
          )}
          <h3 className="text-2xl font-medium">{title}</h3>
        </div>
        {description && <p>{description}</p>}
        <ul className="flex flex-col gap-2 text-sm">
          {items.map((item) => (
            <li key={`${item.lead ?? ''}${item.rest}`} className="flex gap-2">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="text-teal-deep mt-0.5 size-4 shrink-0"
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
      </div>
    </li>
  );
}
