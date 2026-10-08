import retrato from '../../design/originais/dra-veronika-retrato.png?w=140;279&format=avif;webp&as=picture';
import ramoRosa from '../assets/folhagens/ramo-rosa.svg';
import ramoVerde from '../assets/folhagens/ramo-verde.svg';
import { ButtonLink } from '../shared/ui/ButtonLink';
import { DecorativeImage } from '../shared/ui/DecorativeImage';
import { LineIcon } from '../shared/ui/LineIcon';
import { Picture } from '../shared/ui/Picture';
import { Section } from '../shared/ui/Section';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { buildWhatsAppUrl } from '../shared/utils/whatsapp';
import { MEDICAL_SPECIALTIES } from './medicalSpecialties';
import { MEDICAL_APPOINTMENT_MESSAGE } from './whatsappMessages';

const HEADING_ID = 'atendimento-medico-titulo';
const PHOTO_SIZES = '(min-width: 64rem) 15rem, 7rem';
const VERIFIED_ICON = ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M9 12l2 2 4-4'];

/**
 * Seção complementar: a Luiza é a figura principal da página. Aqui o cartão é claro, a foto é
 * menor que a dela e o botão é vazado. Cabe inteira em uma tela.
 */
export function MedicalCare() {
  return (
    <Section id="atendimento-medico" labelledBy={HEADING_ID} fullScreen>
      <div className="relative">
        {/* Folhagens saindo de trás do cartão, nos cantos opostos. */}
        <DecorativeImage
          src={ramoVerde}
          width={120}
          height={300}
          className="pointer-events-none absolute -top-24 right-[8%] h-40 w-auto rotate-[72deg] opacity-80 lg:-top-32 lg:h-56"
        />
        <DecorativeImage
          src={ramoRosa}
          width={120}
          height={300}
          className="pointer-events-none absolute -bottom-24 left-[8%] h-40 w-auto -rotate-[108deg] opacity-80 lg:-bottom-32 lg:h-56"
        />

        {/* No HTML a ordem é título, foto e nome, especialidades, botão. No desktop a foto vai
            para a coluna da esquerda só pela posição na grade. */}
        <div className="bg-cream border-olive/40 relative grid gap-x-12 gap-y-[clamp(0.5rem,1.6dvh,1.5rem)] overflow-hidden rounded-3xl border p-4 sm:p-6 lg:grid-cols-[auto_1fr] lg:p-[clamp(1rem,4dvh,2.5rem)]">
          {/* Um ramo claro no canto, por dentro do cartão, como marca-d'água. */}
          <DecorativeImage
            src={ramoVerde}
            width={120}
            height={300}
            className="pointer-events-none absolute -top-10 -right-4 h-40 w-auto rotate-[200deg] opacity-15 lg:h-56"
          />

          <div className="relative flex flex-col gap-[clamp(0.375rem,1.5dvh,0.75rem)] lg:col-start-2 lg:row-start-1">
            <SectionHeading
              id={HEADING_ID}
              eyebrow="Atendimento médico"
              title="Consultas integrativas com atendimento humanizado e tratamento integrado"
              highlight="integrado"
              align="start"
            />
            {/* Divisor fino com um pequeno ornamento, como nos posts da cliente. */}
            <span aria-hidden="true" className="flex items-center gap-2">
              <span className="bg-rose/60 h-px w-12" />
              <span className="bg-gold size-1.5 rotate-45" />
              <span className="bg-rose/60 h-px w-12" />
            </span>
          </div>

          {/* No celular, foto pequena ao lado do nome. No desktop, foto grande com a plaqueta
              do nome sobreposta à base, como um crachá. */}
          <div className="relative flex items-center gap-4 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:flex-col lg:gap-0 lg:self-center">
            <div className="border-olive/40 aspect-square w-16 shrink-0 overflow-hidden rounded-2xl border-2 shadow-md sm:w-28 lg:aspect-2/3 lg:w-[clamp(9rem,36dvh,15rem)] lg:rounded-3xl lg:border-4">
              <Picture
                image={retrato}
                alt="Dra. Veronika Baptista, sorrindo, de blazer branco"
                sizes={PHOTO_SIZES}
                className="size-full object-cover object-top"
              />
            </div>
            {/* Crachá: nome em destaque e o registro em um selo. Branco, para se soltar do
                cartão creme, e sobreposto à base da foto no desktop. */}
            <div className="flex flex-col items-start gap-1.5 lg:relative lg:-mt-10 lg:w-max lg:max-w-[125%] lg:items-center lg:rounded-2xl lg:bg-white lg:px-5 lg:py-3 lg:text-center lg:shadow-lg">
              <h3 className="text-lg font-semibold lg:text-xl">Dra. Veronika Baptista</h3>
              <p className="bg-rose-deep text-cream inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide">
                <LineIcon paths={VERIFIED_ICON} className="size-3.5" />
                CRM MG 98407
              </p>
            </div>
          </div>

          {/* Lista de definições: cada especialidade (termo) com o que ela trata (descrição). */}
          <dl className="relative grid gap-1.5 sm:grid-cols-3 sm:gap-4 lg:col-start-2">
            {MEDICAL_SPECIALTIES.map((specialty) => (
              <div
                key={specialty.name}
                className="border-olive/30 flex flex-col gap-1 border-t pt-1.5 first:border-t-0 first:pt-0 sm:gap-2 sm:rounded-2xl sm:border sm:p-4 sm:first:border-t sm:first:pt-4"
              >
                {/* O ícone vai dentro do termo: um <dl> só aceita <dt> e <dd> em cada grupo. */}
                <dt className="flex items-center gap-2 text-sm font-semibold sm:flex-col sm:items-start sm:text-base">
                  <span className="bg-blush text-teal-deep inline-flex size-7 shrink-0 items-center justify-center rounded-lg sm:size-10 sm:rounded-xl">
                    <LineIcon paths={specialty.iconPaths} className="size-4 sm:size-5" />
                  </span>
                  {specialty.name}
                </dt>
                <dd className="text-xs sm:text-sm">{specialty.description}</dd>
              </div>
            ))}
          </dl>

          <ButtonLink
            href={buildWhatsAppUrl(MEDICAL_APPOINTMENT_MESSAGE)}
            external
            variant="secondary"
            className="relative justify-self-start lg:col-start-2"
          >
            Agendar consulta médica
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
