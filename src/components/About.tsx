import retrato from '../../design/originais/luiza-retrato.png?w=186;372&format=avif;webp&as=picture';
import eucalipto from '../assets/folhagens/eucalipto-claro.svg';
import ramoDourado from '../assets/folhagens/ramo-traco-dourado.svg';
import { ButtonLink } from '../shared/ui/ButtonLink';
import { DecorativeImage } from '../shared/ui/DecorativeImage';
import { LineIcon } from '../shared/ui/LineIcon';
import { OrnamentDivider } from '../shared/ui/OrnamentDivider';
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
      {/* O bloco verde-escuro é o elemento mais forte da página, e é da Luiza: ela é a figura
          principal. A seção inteira fica dentro dele: título, foto, apresentação, botão e as
          certificações. */}
      {/* `grid-cols-1` (coluna que pode encolher) e `wrap-anywhere`: com a fonte do navegador
          aumentada em tela estreita, palavras longas quebram em vez de alargar o bloco e
          ficarem cortadas pelo `overflow-hidden`. */}
      <div className="bg-olive-deep text-cream relative grid grid-cols-1 items-center gap-x-12 gap-y-6 overflow-hidden rounded-[2rem] p-6 wrap-anywhere shadow-lg sm:p-8 lg:grid-cols-[2fr_3fr] lg:gap-y-4 lg:p-12">
        {/* Folhagens próprias desta seção, claras sobre o verde: eucalipto em um canto e um
            ramo em traço dourado no outro. */}
        <DecorativeImage
          src={eucalipto}
          width={160}
          height={320}
          className="pointer-events-none absolute -top-16 -right-10 h-56 w-auto rotate-[205deg] opacity-25 lg:h-64"
        />
        <DecorativeImage
          src={ramoDourado}
          width={140}
          height={320}
          className="pointer-events-none absolute top-1/3 -left-6 h-56 w-auto rotate-[18deg] opacity-40 lg:h-72"
        />
        <DecorativeImage
          src={eucalipto}
          width={160}
          height={320}
          className="pointer-events-none absolute -right-6 -bottom-20 h-48 w-auto rotate-[-25deg] opacity-20"
        />

        {/* No HTML a ordem é título, foto, apresentação. No desktop a foto vai para a coluna da
            esquerda só pela posição na grade. */}
        <div className="relative lg:col-start-2 lg:row-start-1 lg:self-end">
          <SectionHeading
            id={HEADING_ID}
            eyebrow="Sobre a Luiza"
            title="Atendimento individualizado, com foco na reabilitação, na prevenção de lesões e na melhora da qualidade de vida"
            highlight="individualizado"
            align="start"
            tone="dark"
          />
        </div>

        {/* Foto grande, em moldura orgânica, com formas claras saindo de trás. */}
        <div className="relative mx-auto w-[min(65vw,19rem)] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:w-full lg:max-w-88">
          <div
            aria-hidden="true"
            className="bg-rose/60 absolute -top-4 -left-5 size-3/4 rounded-[58%_42%_55%_45%/48%_56%_44%_52%]"
          />
          <div
            aria-hidden="true"
            className="bg-cream/25 absolute -right-5 -bottom-4 size-2/3 rounded-[45%_55%_42%_58%/55%_45%_55%_45%]"
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

        <div className="relative flex flex-col items-start gap-4 lg:col-start-2 lg:row-start-2 lg:self-start">
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
          <p className="border-rose-soft flex flex-col border-l-2 pl-4">
            <span className="font-display text-xl font-medium">
              Dra. Luiza Rafaela de Castro Dolabella
            </span>
            <span className="text-sm">CREFITO 4 MG 213042-F</span>
          </p>
          <ButtonLink href={buildWhatsAppUrl(SCHEDULE_MESSAGE)} external variant="light">
            Agendar avaliação
          </ButtonLink>
        </div>

        {/* As certificações fazem parte da apresentação dela: ficam dentro do bloco, depois de
            um divisor, ocupando a largura toda. */}
        <div className="relative flex flex-col gap-5 pt-2 lg:col-span-2">
          <OrnamentDivider tone="dark" className="w-full" />
          <h3 id={CREDENTIALS_HEADING_ID} className="text-center text-xl font-medium sm:text-2xl">
            Certificações e qualificações
          </h3>
          <ul
            aria-labelledby={CREDENTIALS_HEADING_ID}
            className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {CREDENTIALS.map((credential) => (
              <li key={credential.title} className="flex gap-4">
                <span className="border-rose-soft text-rose-soft bg-cream/10 inline-flex size-12 shrink-0 items-center justify-center rounded-full border">
                  <LineIcon paths={credential.iconPaths} />
                </span>
                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold">{credential.title}</h4>
                  <p className="text-sm">{credential.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
