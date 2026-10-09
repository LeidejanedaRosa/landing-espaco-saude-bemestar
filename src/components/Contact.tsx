import ramoRosa from '../assets/folhagens/ramo-rosa.svg';
import ramoVerde from '../assets/folhagens/ramo-verde.svg';
import { ButtonLink } from '../shared/ui/ButtonLink';
import { DecorativeImage } from '../shared/ui/DecorativeImage';
import { LineIcon } from '../shared/ui/LineIcon';
import { Section } from '../shared/ui/Section';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { buildWhatsAppUrl, formatWhatsAppNumber } from '../shared/utils/whatsapp';
import { ADDRESS_LINES, MAP_URL, instagramHandle } from './contactInfo';
import { SCHEDULE_MESSAGE } from './whatsappMessages';

const HEADING_ID = 'contato-titulo';
const PIN_ICON = [
  'M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0z',
  'M9 10a3 3 0 1 0 6 0a3 3 0 1 0-6 0'
];
const CHAT_ICON = ['M7.9 20A9 9 0 1 0 4 16.1L2 22z'];
const CAMERA_ICON = [
  'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z',
  'M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0',
  'M17.5 6.5h.01'
];
const LINK_CLASSES =
  'focus-visible:outline-olive-deep rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2';

function ContactRow({
  icon,
  label,
  children
}: Readonly<{ icon: string[]; label: string; children: React.ReactNode }>) {
  // Um grupo de <dl> só aceita <dt> e <dd>: o ícone vai dentro do termo, posicionado à
  // esquerda, e o grupo reserva o espaço dele.
  return (
    <div className="relative flex min-h-11 flex-col justify-center pl-15">
      <dt className="text-sm font-semibold">
        <span className="bg-blush text-teal-deep absolute top-0 left-0 inline-flex size-11 items-center justify-center rounded-full">
          <LineIcon paths={icon} className="size-5" />
        </span>
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  );
}

/** Fecho da página: a chamada final e todos os jeitos de chegar ao studio. Não há formulário. */
export function Contact() {
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL;
  const whatsAppUrl = buildWhatsAppUrl(SCHEDULE_MESSAGE);

  return (
    <Section id="contato" labelledBy={HEADING_ID} fullScreen>
      <div className="relative">
        <DecorativeImage
          src={ramoRosa}
          width={120}
          height={300}
          className="pointer-events-none absolute -top-24 left-[8%] h-40 w-auto rotate-[108deg] opacity-80 lg:-top-32 lg:h-56"
        />
        <DecorativeImage
          src={ramoVerde}
          width={120}
          height={300}
          className="pointer-events-none absolute right-[8%] -bottom-24 h-40 w-auto -rotate-[72deg] opacity-80 lg:-bottom-32 lg:h-56"
        />

        <div className="bg-cream border-olive/40 relative grid items-center gap-x-12 gap-y-6 rounded-3xl border p-6 sm:p-8 lg:grid-cols-[3fr_2fr] lg:p-[clamp(1.5rem,5dvh,3rem)]">
          <div className="flex flex-col items-start gap-[clamp(0.75rem,2.5dvh,1.25rem)]">
            <SectionHeading
              id={HEADING_ID}
              eyebrow="Contato"
              title="Priorize o que realmente importa: Você!"
              highlight="Você!"
              align="start"
            />
            <p>
              Agende sua consulta ou aula experimental e sinta a diferença de um cuidado
              verdadeiramente individualizado.
            </p>
            <div className="flex flex-wrap gap-2">
              <ButtonLink href={whatsAppUrl} external>
                Agendar avaliação
              </ButtonLink>
              <ButtonLink href={MAP_URL} external variant="secondary">
                Ver no mapa
              </ButtonLink>
            </div>
          </div>

          <dl className="border-olive/30 flex flex-col gap-[clamp(0.75rem,2.5dvh,1.25rem)] border-t pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            <ContactRow icon={PIN_ICON} label="Endereço">
              <address className="not-italic">
                {ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </ContactRow>
            <ContactRow icon={CHAT_ICON} label="WhatsApp">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASSES}
              >
                {formatWhatsAppNumber()}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </ContactRow>
            <ContactRow icon={CAMERA_ICON} label="Instagram">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASSES}
              >
                {instagramHandle(instagramUrl)}
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </ContactRow>
          </dl>
        </div>
      </div>
    </Section>
  );
}
