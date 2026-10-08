import retrato from '../../design/originais/luiza-retrato.png?w=186;372&format=avif;webp&as=picture';
import { ButtonLink } from '../shared/ui/ButtonLink';
import { Picture } from '../shared/ui/Picture';
import { Section } from '../shared/ui/Section';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { buildWhatsAppUrl } from '../shared/utils/whatsapp';
import { CREDENTIALS } from './aboutCredentials';
import { SCHEDULE_MESSAGE } from './whatsappMessages';

const HEADING_ID = 'sobre-titulo';
const CREDENTIALS_HEADING_ID = 'sobre-certificacoes';
const PHOTO_SIZES = '(min-width: 64rem) 22rem, (min-width: 40rem) 20rem, 70vw';

export function About() {
  return (
    <Section id="sobre" labelledBy={HEADING_ID}>
      <SectionHeading
        id={HEADING_ID}
        eyebrow="Sobre a Luiza"
        title="Atendimento individualizado, com foco na reabilitação, na prevenção de lesões e na melhora da qualidade de vida"
      />

      <div className="grid items-center gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12">
        {/* A Luiza é a figura principal da página: foto grande, em moldura orgânica, com as
            formas coloridas dos posts da cliente saindo de trás. */}
        <div className="relative mx-auto w-[min(70vw,20rem)] lg:w-full lg:max-w-88">
          <div
            aria-hidden="true"
            className="bg-rose/35 absolute -top-4 -left-5 size-3/4 rounded-[58%_42%_55%_45%/48%_56%_44%_52%]"
          />
          <div
            aria-hidden="true"
            className="bg-teal/30 absolute -right-5 -bottom-4 size-2/3 rounded-[45%_55%_42%_58%/55%_45%_55%_45%]"
          />
          <div className="border-cream relative aspect-3/4 overflow-hidden rounded-[52%_48%_46%_54%/40%_42%_58%_60%] border-4 shadow-lg">
            <Picture
              image={retrato}
              alt="Luiza, de jaleco branco, sentada à mesa do consultório, sorrindo"
              sizes={PHOTO_SIZES}
              className="size-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-4">
          <p>
            Sou a Luiza, formada em Fisioterapia há 10 anos, com pós-graduação em Fisiologia e
            Prescrição de Exercícios e em Fisioterapia nas Disfunções Musculoesqueléticas. Tenho
            formação em Pilates clínico e funcional, fisioterapia aquática (hidroterapia), terapia
            manual para coluna vertebral, tratamento de hérnia de disco, liberação miofascial e
            massoterapia, além de formação contínua em Raciocínio Clínico Avançado (RCA).
          </p>
          <p>
            Minha prática une conhecimento científico atualizado e técnicas especializadas para
            oferecer atendimento individualizado, com foco na reabilitação, na prevenção de lesões e
            na melhora da qualidade de vida.
          </p>
          <p className="border-rose flex flex-col border-l-2 pl-4">
            <span className="font-display text-xl font-medium">
              Dra. Luiza Rafaela de Castro Dolabella
            </span>
            <span className="text-sm">CREFITO 4 MG 213042-F</span>
          </p>
          <ButtonLink href={buildWhatsAppUrl(SCHEDULE_MESSAGE)} external>
            Agendar avaliação
          </ButtonLink>
        </div>
      </div>

      <div className="flex flex-col gap-5 pt-4">
        <h3 id={CREDENTIALS_HEADING_ID} className="text-center text-xl font-medium sm:text-2xl">
          Certificações e qualificações
        </h3>
        <ul
          aria-labelledby={CREDENTIALS_HEADING_ID}
          className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CREDENTIALS.map((credential) => (
            <li key={credential.title} className="flex gap-4">
              <span className="bg-cream border-rose text-rose-deep inline-flex size-12 shrink-0 items-center justify-center rounded-full border">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {credential.iconPaths.map((path) => (
                    <path key={path} d={path} />
                  ))}
                </svg>
              </span>
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold">{credential.title}</h4>
                <p className="text-sm">{credential.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
