import ramoRosa from '../assets/folhagens/ramo-rosa.svg';
import ramoDourado from '../assets/folhagens/ramo-traco-dourado.svg';
import ramoVerde from '../assets/folhagens/ramo-verde.svg';
import { ButtonLink } from '../shared/ui/ButtonLink';
import { DecorativeImage } from '../shared/ui/DecorativeImage';
import { OrnamentDivider } from '../shared/ui/OrnamentDivider';
import { Picture } from '../shared/ui/Picture';
import { Section } from '../shared/ui/Section';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { GOOGLE_REVIEWS_URL, TESTIMONIALS, type Testimonial } from './testimonialsList';

const HEADING_ID = 'depoimentos-titulo';
// Posição em fração da área dos cartões, para acompanhar qualquer largura de tela.
const FALLEN_LEAVES = [
  {
    src: ramoDourado,
    width: 140,
    height: 320,
    className: '-bottom-10 -left-4 h-44 rotate-[28deg] lg:h-56'
  },
  {
    src: ramoDourado,
    width: 140,
    height: 320,
    className: 'top-[18%] left-[29%] hidden h-32 -rotate-[62deg] md:block lg:h-40'
  },
  {
    src: ramoVerde,
    width: 120,
    height: 300,
    className: 'top-2 left-[4%] h-24 rotate-[120deg] opacity-70 lg:h-28'
  },
  {
    src: ramoDourado,
    width: 140,
    height: 320,
    className: 'top-[6%] right-[-1%] h-40 rotate-[155deg] lg:h-52'
  },
  {
    src: ramoRosa,
    width: 120,
    height: 300,
    className: '-bottom-8 left-[58%] hidden h-24 rotate-[78deg] opacity-70 md:block lg:h-28'
  },
  {
    src: ramoDourado,
    width: 140,
    height: 320,
    className: 'bottom-[12%] right-[27%] hidden h-28 rotate-[12deg] md:block lg:h-36'
  }
];

const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z';

function Stars({ rating }: Readonly<{ rating: number }>) {
  return (
    <p className="text-gold flex gap-0.5">
      <span className="sr-only">Nota {rating} de 5</span>
      {Array.from({ length: rating }, (_, position) => (
        <svg
          key={position}
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-4"
          fill="currentColor"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </p>
  );
}

function TestimonialCard({
  testimonial,
  index
}: Readonly<{ testimonial: Testimonial; index: number }>) {
  // As fotos alternam a inclinação, como polaroides presas em um mural.
  const tilt = index % 2 === 0 ? '-rotate-3' : 'rotate-3';

  return (
    // `group` e `tabIndex`: o cartão abre com o mouse e também com o foco. É `group-focus`, e
    // não `group-focus-visible`: o toque na tela dá foco sem ativar o `:focus-visible`, e o
    // cartão ficaria fechado no tablet. Só o contorno é exclusivo do teclado.
    <li
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className="group focus-visible:outline-olive-deep relative mt-16 flex flex-col items-center gap-3 rounded-3xl bg-white px-6 pt-20 pb-6 text-center shadow-md transition-shadow duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none"
    >
      {/* A foto "salta" para fora do topo do cartão, em moldura de polaroide. */}
      <div
        className={`${tilt} absolute -top-16 left-1/2 w-32 -translate-x-1/2 rounded-md bg-white p-2 pb-4 shadow-lg transition-[rotate,scale] duration-300 ease-out group-hover:scale-110 group-hover:rotate-0 group-focus:scale-110 group-focus:rotate-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
      >
        <Picture
          image={testimonial.photo}
          alt=""
          sizes="8rem"
          className="aspect-square w-full rounded-sm object-cover"
        />
      </div>

      {/* Aspas grandes, só de enfeite, no canto do cartão. */}
      <span
        aria-hidden="true"
        className="font-display text-rose/50 absolute top-3 left-5 text-6xl leading-none"
      >
        “
      </span>
      <h3 className="text-xl font-medium">{testimonial.name}</h3>
      <Stars rating={testimonial.rating} />
      {/* No celular o texto aparece inteiro. No desktop o cartão mostra o começo e abre com o
          mouse ou com o foco: o depoimento nunca depende só do mouse. */}
      <blockquote className="text-sm md:max-h-[4.5em] md:overflow-hidden md:mask-[linear-gradient(black_55%,transparent)] md:transition-[max-height] md:duration-500 md:ease-out md:group-hover:max-h-[40em] md:group-hover:mask-none md:group-focus:max-h-[40em] md:group-focus:mask-none motion-reduce:md:transition-none">
        <p>{testimonial.text}</p>
      </blockquote>
    </li>
  );
}

export function Testimonials() {
  return (
    <Section id="depoimentos" labelledBy={HEADING_ID}>
      <div className="flex flex-col items-center gap-3">
        <SectionHeading
          id={HEADING_ID}
          eyebrow="Depoimentos"
          title="O que dizem sobre nós"
          highlight="sobre nós"
          tone="rose"
        />
        <OrnamentDivider tone="cream" className="w-40" />
      </div>

      <div className="relative">
        <ul className="grid items-start gap-x-8 gap-y-4 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </ul>
        {/* Folhagens espalhadas, como se tivessem caído de uma árvore: cada uma com tamanho,
            inclinação e lugar próprios, sem simetria. Algumas pousam sobre os cartões; são
            finas e não atrapalham a leitura. Ficam por cima e não recebem cliques. */}
        {FALLEN_LEAVES.map((leaf) => (
          <DecorativeImage
            key={leaf.className}
            src={leaf.src}
            width={leaf.width}
            height={leaf.height}
            className={`pointer-events-none absolute w-auto ${leaf.className}`}
          />
        ))}
      </div>

      <ButtonLink
        href={GOOGLE_REVIEWS_URL}
        external
        variant="outline-light"
        className="self-center"
      >
        Ver todas as avaliações no Google
      </ButtonLink>
    </Section>
  );
}
