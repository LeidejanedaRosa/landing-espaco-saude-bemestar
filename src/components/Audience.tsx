import eucaliptoClaro from '../assets/folhagens/eucalipto-claro.svg';
import { DecorativeImage } from '../shared/ui/DecorativeImage';
import { LineIcon } from '../shared/ui/LineIcon';
import { OrnamentDivider } from '../shared/ui/OrnamentDivider';
import { Section } from '../shared/ui/Section';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { AUDIENCES } from './audienceList';

const HEADING_ID = 'para-quem-titulo';
const FRONDS = [
  '-bottom-16 -left-6 h-72 rotate-[28deg] lg:h-80',
  '-bottom-24 left-16 hidden h-56 rotate-[62deg] opacity-70 md:block',
  '-top-16 -right-6 h-72 rotate-[208deg] lg:h-80',
  '-top-24 right-16 hidden h-56 rotate-[242deg] opacity-70 md:block'
];

export function Audience() {
  return (
    <Section id="para-quem" labelledBy={HEADING_ID}>
      <div className="relative isolate flex flex-col gap-[clamp(0.75rem,2.5dvh,2rem)]">
        {/* Ramos claros saem de dois cantos opostos, em leque, e emolduram a seção, como as
          folhas claras nos cantos dos posts da cliente. Ficam atrás do conteúdo. */}
        {FRONDS.map((className) => (
          <DecorativeImage
            key={className}
            src={eucaliptoClaro}
            width={160}
            height={320}
            className={`pointer-events-none absolute -z-10 w-auto ${className}`}
          />
        ))}
        <div className="flex flex-col items-center gap-3">
          <SectionHeading
            id={HEADING_ID}
            eyebrow="Indicações"
            title="Para quem o pilates é indicado?"
            highlight="indicado"
            tone="rose"
          />
          <OrnamentDivider tone="cream" className="w-40" />
        </div>

        {/* Seis públicos: 2, 3 ou 6 colunas, sempre sem linha incompleta. */}
        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {AUDIENCES.map((audience) => (
            <li key={audience.name} className="group flex flex-col items-center gap-3 text-center">
              {/* Ícone de linha dentro de um círculo, como nos posts da cliente. */}
              <span className="bg-cream border-gold text-teal-deep inline-flex size-20 items-center justify-center rounded-full border-2 shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                <LineIcon paths={audience.iconPaths} className="size-9" />
              </span>
              <span className="font-medium">{audience.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
