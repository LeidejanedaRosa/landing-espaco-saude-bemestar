import { LineIcon } from '../shared/ui/LineIcon';
import { Section } from '../shared/ui/Section';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { AUDIENCES } from './audienceList';

const HEADING_ID = 'para-quem-titulo';

export function Audience() {
  return (
    <Section id="para-quem" labelledBy={HEADING_ID}>
      <SectionHeading
        id={HEADING_ID}
        eyebrow="Indicações"
        title="Para quem o pilates é indicado?"
        highlight="indicado"
      />

      {/* Seis públicos: 2, 3 ou 6 colunas, sempre sem linha incompleta. */}
      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
        {AUDIENCES.map((audience) => (
          <li key={audience.name} className="group flex flex-col items-center gap-3 text-center">
            {/* Ícone de linha dentro de um círculo, como nos posts da cliente. */}
            <span className="bg-cream border-rose text-teal-deep inline-flex size-20 items-center justify-center rounded-full border-2 shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
              <LineIcon paths={audience.iconPaths} className="size-9" />
            </span>
            <span className="font-medium">{audience.name}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
