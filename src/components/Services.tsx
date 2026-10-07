import { useTabs } from '../shared/hooks/useTabs';
import { ButtonLink } from '../shared/ui/ButtonLink';
import { Picture } from '../shared/ui/Picture';
import { Section } from '../shared/ui/Section';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { buildWhatsAppUrl } from '../shared/utils/whatsapp';
import { SERVICES, type Service } from './servicesList';

const HEADING_ID = 'servicos-titulo';
const IMAGE_SIZES = '(min-width: 48rem) 26rem, 90vw';

// Cores das formas atrás de cada ilustração, em rodízio: cada serviço ganha uma combinação.
const BLOB_COLORS = [
  { back: 'bg-teal/40', front: 'bg-gold/50' },
  { back: 'bg-gold/50', front: 'bg-rose/40' },
  { back: 'bg-rose/40', front: 'bg-teal/40' }
];
const BLOB =
  'motion-safe:animate-blob-in absolute transition-[border-radius] duration-700 ease-out inert:animate-none motion-reduce:transition-none';

function ServicePanel({ service, index }: Readonly<{ service: Service; index: number }>) {
  const blobs = BLOB_COLORS[index % BLOB_COLORS.length];

  return (
    <div className="bg-cream/80 border-olive/40 motion-safe:animate-panel-in grid h-full content-center items-center gap-6 rounded-3xl border p-5 inert:animate-none md:grid-cols-[2fr_3fr] md:content-stretch md:gap-8 md:p-[clamp(0.75rem,2.5dvh,2rem)]">
      {/* Ao lado do texto, a área da ilustração não tem altura própria: acompanha a do texto,
          para o cartão nunca crescer por causa da figura. Sem `overflow-hidden`: ampliada, a
          figura passa da área e aparece inteira, por cima do texto ao lado. E sem `z-index`
          aqui: ele isolaria o `mix-blend-multiply` e o fundo branco das imagens voltaria. */}
      <div className="group relative mx-auto aspect-4/3 w-full max-w-sm md:aspect-auto md:max-w-none md:self-stretch">
        {/* Formas orgânicas no lugar de um painel branco, como as dos adesivos da fachada do
            studio: duas coloridas e, por cima, uma clara, onde a figura se apoia sem perder as
            cores. Mudam de contorno quando o mouse passa. */}
        <div
          aria-hidden="true"
          className={`${blobs.back} ${BLOB} inset-[2%_30%_22%_2%] rounded-[58%_42%_55%_45%/48%_56%_44%_52%] group-hover:rounded-[45%_55%_48%_52%/56%_44%_56%_44%]`}
        />
        <div
          aria-hidden="true"
          className={`${blobs.front} ${BLOB} inset-[28%_2%_2%_34%] rounded-[45%_55%_42%_58%/55%_45%_55%_45%] group-hover:rounded-[56%_44%_58%_42%/44%_56%_44%_56%]`}
        />
        <div
          aria-hidden="true"
          className={`${BLOB} inset-[7%_9%] rounded-[52%_48%_46%_54%/55%_47%_53%_45%] bg-white/80 group-hover:rounded-[46%_54%_53%_47%/48%_55%_45%_52%]`}
        />
        {/* `mix-blend-multiply`: o branco do fundo de algumas ilustrações some sobre a forma
            clara, sem precisar recortar o arquivo. */}
        <Picture
          image={service.image}
          alt={service.imageAlt}
          sizes={IMAGE_SIZES}
          className="absolute inset-[5%] size-[90%] object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-130 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <div className="flex flex-col items-start gap-[clamp(0.375rem,1.2dvh,1rem)]">
        <h3 className="text-[clamp(1.125rem,3.6dvh,1.875rem)] leading-tight font-medium">
          {service.name}
        </h3>
        {service.description && <p>{service.description}</p>}
        <ul className="flex flex-col gap-[clamp(0.25rem,1dvh,0.5rem)] text-[clamp(0.875rem,2.5dvh,1rem)]">
          {service.items.map((item) => (
            <li key={`${item.lead ?? ''}${item.rest}`} className="flex gap-2">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="text-teal-deep mt-1 size-4 shrink-0"
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
        {/* Centralizado na coluna do texto e afastado dele: é o passo seguinte à leitura, não
            parte dela. Vazado, para não pesar mais que o texto nem se confundir com a aba
            ativa, que é cheia. */}
        <ButtonLink
          href={buildWhatsAppUrl(`Olá! Gostaria de agendar ${service.cta.subject}.`)}
          external
          variant="secondary"
          className="mt-[clamp(0.25rem,1.5dvh,0.75rem)] self-center"
        >
          {service.cta.label}
        </ButtonLink>
      </div>
    </div>
  );
}

export function Services() {
  const tabs = useTabs(SERVICES.length);

  return (
    <Section id="servicos" labelledBy={HEADING_ID} fullScreen>
      <SectionHeading
        id={HEADING_ID}
        eyebrow="Serviços"
        title="O que Luiza Espaço Saúde e bem estar oferece?"
      />

      {/* As abas quebram em linhas quando não cabem: as cinco ficam sempre à vista. Em fileira
          deslizante, as últimas ficavam fora da tela do celular, sem sinal de que existiam. */}
      <div
        role="tablist"
        aria-labelledby={HEADING_ID}
        className="flex flex-wrap justify-center gap-2"
      >
        {SERVICES.map((service, index) => (
          <button
            key={service.name}
            {...tabs.getTabProps(index)}
            className="border-olive/40 bg-cream/80 hover:border-olive-deep focus-visible:outline-olive-deep aria-selected:bg-olive-deep aria-selected:border-olive-deep aria-selected:text-cream min-h-11 rounded-full border px-5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {service.tabLabel}
          </button>
        ))}
      </div>

      {/* Os cinco painéis ocupam a mesma célula da grade, um sobre o outro, e só o ativo fica
          visível. A célula tem a altura do maior, então o cartão não muda de tamanho ao trocar
          de aba; e, como todos estão na tela, as ilustrações já chegam antes do clique. */}
      <div className="grid">
        {SERVICES.map((service, index) => (
          <div
            key={service.name}
            {...tabs.getPanelProps(index)}
            className="col-start-1 row-start-1 inert:invisible"
          >
            <ServicePanel service={service} index={index} />
          </div>
        ))}
      </div>

      <p className="mx-auto max-w-4xl text-center text-sm">
        <strong className="font-semibold">Nosso objetivo:</strong> O objetivo é promover mais saúde,
        movimento e qualidade de vida, com um ambiente acolhedor e profissionais qualificados, onde
        cada paciente se sente cuidado de forma única.
      </p>
    </Section>
  );
}
