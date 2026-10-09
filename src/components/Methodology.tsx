import ilustracao from '../../design/originais/metodologia-acompanhamento.png?w=333;665&format=avif;webp&as=picture';
import { LineIcon } from '../shared/ui/LineIcon';
import { Picture } from '../shared/ui/Picture';
import { Section } from '../shared/ui/Section';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { METHODOLOGY_STEPS } from './methodologySteps';

const HEADING_ID = 'metodologia-titulo';
// Desktop: coluna estreita. Tablet (duas colunas): metade da tela. Celular: figura pequena.
const IMAGE_SIZES = '(min-width: 64rem) 28rem, (min-width: 40rem) 50vw, 16rem';
const SPARKLE_ICON = [
  'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z',
  'M20 3v4',
  'M22 5h-4',
  'M4 17v2',
  'M5 18H3'
];

export function Methodology() {
  return (
    <Section id="metodologia" labelledBy={HEADING_ID} fullScreen>
      {/* No HTML a ordem é título, ilustração, etapas, compromisso; a grade só reposiciona.
          - celular: tudo empilhado e centralizado;
          - tablet: duas colunas. À esquerda, título, ilustração e compromisso; à direita, as
            quatro etapas, uma embaixo da outra. A ilustração ocupa a altura que sobra;
          - desktop: a ilustração ocupa a coluna da esquerda de cima a baixo. É assim que ela
            fica grande sem a seção passar de uma tela. */}
      <div className="grid items-center gap-x-6 gap-y-[clamp(0.5rem,1.6dvh,1.25rem)] sm:grid-cols-2 sm:grid-rows-[auto_1fr_auto] lg:grid-cols-[1fr_2fr] lg:grid-rows-none xl:grid-cols-[4fr_7fr] xl:gap-x-10">
        <div className="sm:col-start-1 sm:row-start-1 lg:col-start-2">
          <SectionHeading
            id={HEADING_ID}
            eyebrow="Nossa metodologia"
            title="Técnica científica com cuidado humano"
            highlight="cuidado humano"
            align="center-then-start"
          />
        </div>

        <div className="relative mx-auto aspect-square w-[min(72vw,clamp(11rem,28dvh,17rem))] sm:col-start-1 sm:row-start-2 sm:aspect-auto sm:h-auto sm:min-h-[clamp(10rem,26dvh,18rem)] sm:w-full sm:self-stretch lg:row-span-3 lg:row-start-1 lg:min-h-0">
          {/* Formas orgânicas atrás da figura: duas coloridas e, por cima, uma clara, onde a
              ilustração se apoia sem perder as cores. */}
          <div
            aria-hidden="true"
            className="bg-rose/40 absolute inset-[4%_26%_18%_2%] rounded-[58%_42%_55%_45%/48%_56%_44%_52%]"
          />
          <div
            aria-hidden="true"
            className="bg-teal/35 absolute inset-[26%_2%_2%_30%] rounded-[45%_55%_42%_58%/55%_45%_55%_45%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-[6%_8%] rounded-[52%_48%_46%_54%/55%_47%_53%_45%] bg-white/85"
          />
          {/* `mix-blend-multiply`: o fundo branco da ilustração assume a cor de trás. A máscara
              esfuma só a borda, porque o fundo do arquivo não é branco puro até o limite. */}
          <Picture
            image={ilustracao}
            alt="Ilustração de uma profissional de jaleco com as mãos nos ombros de um senhor sentado, sorrindo"
            sizes={IMAGE_SIZES}
            className="absolute inset-0 size-full [mask-image:radial-gradient(ellipse_closest-side,black_94%,transparent)] object-contain mix-blend-multiply"
          />
        </div>

        {/* Lista ordenada: são etapas, e a ordem importa. O número grande é só enfeite, porque
            a própria lista já diz ao leitor de tela qual é a posição de cada etapa. */}
        <ol className="grid gap-[clamp(0.5rem,1.6dvh,1rem)] sm:col-start-2 sm:row-span-3 sm:row-start-1 lg:row-span-1 lg:row-start-2 lg:grid-cols-2">
          {METHODOLOGY_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="bg-cream/80 border-olive/40 flex gap-3 rounded-2xl border p-[clamp(0.5rem,1.5dvh,1.25rem)]"
            >
              <span
                aria-hidden="true"
                className="font-script text-rose-vivid text-[clamp(2.25rem,7dvh,3.5rem)] leading-[0.8]"
              >
                {index + 1}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-[clamp(1.0625rem,2.8dvh,1.25rem)] leading-tight font-medium">
                  {step.title}
                </h3>
                <p className="text-[clamp(0.8125rem,2.2dvh,0.875rem)] leading-snug">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* O compromisso é a promessa da seção: vai em um quadro próprio, com ícone, e não em
            uma linha solta de texto pequeno. */}
        <p className="bg-rose/25 border-rose flex items-start gap-3 rounded-2xl border p-[clamp(0.5rem,1.5dvh,1.25rem)] text-[clamp(0.875rem,2.4dvh,1rem)] leading-snug shadow-sm sm:col-start-1 sm:row-start-3 lg:col-start-2">
          <span className="text-rose-deep mt-0.5 shrink-0">
            <LineIcon paths={SPARKLE_ICON} />
          </span>
          <span>
            <strong className="font-semibold">Compromisso com a excelência:</strong> Nossa abordagem
            combina técnica científica com cuidado humano, garantindo que cada sessão seja produtiva
            e agradável.
          </span>
        </p>
      </div>
    </Section>
  );
}
