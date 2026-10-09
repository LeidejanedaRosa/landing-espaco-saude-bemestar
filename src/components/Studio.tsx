import { Carousel } from '../shared/ui/Carousel';
import { CheckList } from '../shared/ui/CheckList';
import { Picture } from '../shared/ui/Picture';
import { Section } from '../shared/ui/Section';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { STUDIO_EQUIPMENT, type Equipment } from './studioEquipment';

const HEADING_ID = 'studio-titulo';
const IMAGE_SIZES = '(min-width: 48rem) 26rem, 90vw';

// Papel e fita de cada folha, em rodízio: cada aparelho ganha uma combinação.
const SHEET_STYLES = [
  { paper: 'bg-gold/30', tape: 'bg-teal/60' },
  { paper: 'bg-teal/20', tape: 'bg-rose/60' },
  { paper: 'bg-rose/20', tape: 'bg-gold/70' }
];

function EquipmentSlide({ equipment, index }: Readonly<{ equipment: Equipment; index: number }>) {
  const sheet = SHEET_STYLES[index % SHEET_STYLES.length];
  // As folhas alternam a inclinação, como desenhos soltos sobre a mesa.
  const tilt = index % 2 === 0 ? '-rotate-2' : 'rotate-2';

  return (
    <div className="bg-cream/80 border-olive/40 grid h-full content-start items-center gap-6 rounded-3xl border p-5 md:grid-cols-[2fr_3fr] md:content-stretch md:gap-8 md:p-[clamp(0.75rem,2.5dvh,2rem)]">
      {/* Ao lado do texto, a área do desenho não tem altura própria: acompanha a do texto. */}
      <div className="group relative mx-auto aspect-4/3 w-full max-w-sm md:aspect-auto md:max-w-none md:self-stretch">
        {/* Folha de caderno de desenho, em papel colorido e presa com fita: os aparelhos são
            desenhados a lápis. Ao passar o mouse a folha fica parada e só o desenho amplia,
            podendo passar da borda dela; por isso a folha não recorta o que sai. */}
        <div className={`${tilt} bg-cream absolute inset-2 rounded-md shadow-md`}>
          <div aria-hidden="true" className={`${sheet.paper} absolute inset-0 rounded-md`} />
          <div
            aria-hidden="true"
            className={`${sheet.tape} absolute -top-2.5 left-1/2 h-5 w-1/4 -translate-x-1/2 -rotate-3 rounded-xs`}
          />
          {/* O desenho tem fundo transparente: sobre o papel fica como grafite em papel
              colorido, e fora da folha não aparece nenhum retângulo. */}
          <Picture
            image={equipment.image}
            alt={equipment.imageAlt}
            sizes={IMAGE_SIZES}
            className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] object-contain transition-transform duration-500 ease-out group-hover:scale-125 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[clamp(0.375rem,1.2dvh,1rem)]">
        <div className="flex flex-col gap-1">
          <p className="text-rose-deep text-xs font-semibold tracking-widest uppercase">
            {equipment.tag}
          </p>
          <h3 className="text-[clamp(1.125rem,3.6dvh,1.875rem)] leading-tight font-medium">
            {equipment.name}
          </h3>
        </div>
        <p className="text-[clamp(0.875rem,2.5dvh,1rem)]">{equipment.description}</p>
        <CheckList
          items={equipment.benefits}
          className="gap-[clamp(0.25rem,1dvh,0.5rem)] text-[clamp(0.875rem,2.5dvh,1rem)]"
        />
      </div>
    </div>
  );
}

export function Studio() {
  return (
    <Section id="studio" labelledBy={HEADING_ID} fullScreen>
      <SectionHeading
        id={HEADING_ID}
        eyebrow="Nosso studio"
        title="Aparelhos de alta precisão para o seu treino"
        highlight="treino"
      />

      <Carousel
        label="Aparelhos do studio"
        slideLabels={STUDIO_EQUIPMENT.map((equipment) => equipment.name)}
        previousLabel="Aparelho anterior"
        nextLabel="Próximo aparelho"
      >
        {STUDIO_EQUIPMENT.map((equipment, index) => (
          <EquipmentSlide key={equipment.name} equipment={equipment} index={index} />
        ))}
      </Carousel>
    </Section>
  );
}
