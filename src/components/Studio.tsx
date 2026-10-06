import { Container } from '../shared/ui/Container';
import { Picture } from '../shared/ui/Picture';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { STUDIO_EQUIPMENT, type Equipment } from './studioEquipment';

const HEADING_ID = 'studio-titulo';
const IMAGE_SIZES = '(min-width: 64rem) 22rem, (min-width: 48rem) 45vw, 90vw';

function EquipmentCard({ equipment }: { equipment: Equipment }) {
  return (
    <li className="group bg-cream/80 border-olive/40 flex w-full flex-col overflow-hidden rounded-3xl border md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
      {/* Painel branco de proporção fixa: os desenhos têm fundo branco e formatos diferentes
          (uns largos, outros altos); aqui todos ocupam a mesma área, inteiros, sem distorcer. */}
      <div className="relative m-3 aspect-[4/3] overflow-hidden rounded-2xl bg-white">
        <Picture
          image={equipment.image}
          alt={equipment.imageAlt}
          sizes={IMAGE_SIZES}
          className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] object-contain transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="flex flex-col gap-3 px-6 pt-2 pb-6">
        <div className="flex flex-col gap-1">
          <p className="text-rose-deep text-xs font-semibold tracking-widest uppercase">
            {equipment.tag}
          </p>
          <h3 className="text-2xl font-medium">{equipment.name}</h3>
        </div>
        <p>{equipment.description}</p>
        <ul className="flex flex-col gap-2 text-sm">
          {equipment.benefits.map((benefit) => (
            <li key={benefit.lead} className="flex gap-2">
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
                <strong className="font-semibold">{benefit.lead}</strong> {benefit.rest}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Studio() {
  return (
    <section id="studio" aria-labelledby={HEADING_ID}>
      <Container className="flex flex-col gap-10 py-16 lg:py-24">
        <SectionHeading
          id={HEADING_ID}
          eyebrow="Nosso studio"
          title="Aparelhos de alta precisão para o seu treino"
        />

        {/* flex com justify-center, e não grid: a última linha, incompleta, fica centralizada. */}
        <ul className="flex flex-wrap justify-center gap-6">
          {STUDIO_EQUIPMENT.map((equipment) => (
            <EquipmentCard key={equipment.name} equipment={equipment} />
          ))}
        </ul>
      </Container>
    </section>
  );
}
