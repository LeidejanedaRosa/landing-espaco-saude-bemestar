import retrato from '../../design/originais/dra-veronika-retrato.png?w=140;279&format=avif;webp&as=picture';
import ramoRosa from '../assets/folhagens/ramo-rosa.svg';
import ramoVerde from '../assets/folhagens/ramo-verde.svg';
import { ButtonLink } from '../shared/ui/ButtonLink';
import { DecorativeImage } from '../shared/ui/DecorativeImage';
import { LineIcon } from '../shared/ui/LineIcon';
import { OrnamentDivider } from '../shared/ui/OrnamentDivider';
import { Picture } from '../shared/ui/Picture';
import { Section } from '../shared/ui/Section';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { buildWhatsAppUrl } from '../shared/utils/whatsapp';
import { MEDICAL_SPECIALTIES } from './medicalSpecialties';
import { MEDICAL_APPOINTMENT_MESSAGE } from './whatsappMessages';

const HEADING_ID = 'atendimento-medico-titulo';
const PHOTO_SIZES = '(min-width: 40rem) 16rem, 14rem';
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

        {/* No HTML a ordem é título, foto e nome, especialidades, botão; a grade só reposiciona.
            - celular: tudo empilhado, com título, foto e botão centralizados;
            - tablet: duas colunas. À esquerda, título, foto e botão; à direita, as três
              especialidades, uma embaixo da outra;
            - desktop: a foto na coluna da esquerda, de cima a baixo. */}
        <div className="bg-cream border-olive/40 relative grid gap-x-12 gap-y-6 overflow-hidden rounded-3xl border p-[clamp(0.875rem,5vw,1.25rem)] sm:grid-cols-2 sm:grid-rows-[auto_1fr_auto] sm:gap-x-6 sm:gap-y-[clamp(0.5rem,1.6dvh,1.5rem)] sm:p-6 lg:grid-cols-[auto_1fr] lg:grid-rows-none lg:gap-x-12 lg:p-[clamp(1rem,4dvh,2.5rem)]">
          {/* Um ramo claro no canto, por dentro do cartão, como marca-d'água. */}
          <DecorativeImage
            src={ramoVerde}
            width={120}
            height={300}
            className="pointer-events-none absolute -top-10 -right-4 h-40 w-auto rotate-[200deg] opacity-15 lg:h-56"
          />

          <div className="relative flex flex-col items-center gap-3 sm:col-start-1 sm:row-start-1 sm:items-start sm:gap-[clamp(0.375rem,1.5dvh,0.75rem)] lg:col-start-2">
            <SectionHeading
              id={HEADING_ID}
              eyebrow="Atendimento médico"
              title="Consultas integrativas com atendimento humanizado e tratamento integrado"
              highlight="integrado"
              align="center-then-start"
            />
            <OrnamentDivider />
          </div>

          {/* Foto com o crachá do nome sobreposto à base, em todas as telas. */}
          <div className="relative flex flex-col items-center justify-self-center sm:col-start-1 sm:row-start-2 sm:justify-self-start lg:row-span-3 lg:row-start-1 lg:self-center">
            <div className="border-olive/40 aspect-4/5 w-[min(62vw,14rem)] shrink-0 overflow-hidden rounded-3xl border-4 shadow-md sm:w-[clamp(13rem,30dvh,16rem)] lg:aspect-2/3 lg:w-[clamp(9rem,36dvh,15rem)]">
              <Picture
                image={retrato}
                alt="Dra. Veronika Baptista, sorrindo, de blazer branco"
                sizes={PHOTO_SIZES}
                className="size-full object-cover object-top"
              />
            </div>
            {/* Crachá: nome em destaque e o registro em um selo. Branco, para se soltar do
                cartão creme, e sobreposto à base da foto. */}
            <div className="relative -mt-8 flex w-max flex-col items-center gap-1.5 rounded-2xl bg-white px-4 py-2.5 text-center shadow-lg lg:-mt-10 lg:px-5 lg:py-3">
              <h3 className="text-lg font-semibold lg:text-xl">Dra. Veronika Baptista</h3>
              <p className="bg-rose-deep text-cream inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-semibold tracking-wide">
                <LineIcon paths={VERIFIED_ICON} className="size-3.5" />
                CRM MG 98407
              </p>
            </div>
          </div>

          {/* Lista de definições: cada especialidade (termo) com o que ela trata (descrição). */}
          <dl className="relative grid gap-4 sm:col-start-2 sm:row-span-3 sm:row-start-1 sm:gap-3 sm:self-center lg:row-span-1 lg:row-start-2 lg:grid-cols-3 lg:gap-4">
            {MEDICAL_SPECIALTIES.map((specialty) => (
              <div
                key={specialty.name}
                className="border-olive/30 flex flex-col gap-2 border-t pt-4 first:border-t-0 first:pt-0 sm:gap-2 sm:rounded-2xl sm:border sm:p-4 sm:first:border-t sm:first:pt-4"
              >
                {/* O ícone vai dentro do termo: um <dl> só aceita <dt> e <dd> em cada grupo. */}
                <dt className="flex items-center gap-3 font-semibold sm:gap-2 lg:flex-col lg:items-start">
                  <span className="bg-blush text-teal-deep inline-flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <LineIcon paths={specialty.iconPaths} className="size-5" />
                  </span>
                  {specialty.name}
                </dt>
                <dd className="text-sm">{specialty.description}</dd>
              </div>
            ))}
          </dl>

          <ButtonLink
            href={buildWhatsAppUrl(MEDICAL_APPOINTMENT_MESSAGE)}
            external
            variant="secondary"
            className="relative justify-self-center sm:col-start-1 sm:row-start-3 sm:justify-self-start lg:col-start-2"
          >
            Agendar consulta médica
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
