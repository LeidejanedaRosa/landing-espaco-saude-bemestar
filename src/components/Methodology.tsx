import ilustracao from '../../design/originais/metodologia-acompanhamento.png?w=333;665&format=avif;webp&as=picture';
import { Picture } from '../shared/ui/Picture';
import { Section } from '../shared/ui/Section';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { METHODOLOGY_STEPS } from './methodologySteps';

const HEADING_ID = 'metodologia-titulo';
const IMAGE_SIZES = '(min-width: 64rem) 22rem, 12rem';

export function Methodology() {
  return (
    <Section id="metodologia" labelledBy={HEADING_ID} fullScreen>
      <SectionHeading
        id={HEADING_ID}
        eyebrow="Nossa metodologia"
        title="Técnica científica com cuidado humano"
        highlight="cuidado humano"
      />

      <div className="grid items-center gap-x-10 gap-y-4 lg:grid-cols-[2fr_3fr]">
        {/* `mix-blend-multiply`: o fundo branco da ilustração assume a cor da página. A máscara
            esfuma a borda, porque o fundo do arquivo não é branco puro até o limite. */}
        <Picture
          image={ilustracao}
          alt="Ilustração de uma profissional de jaleco com as mãos nos ombros de um senhor sentado, sorrindo"
          sizes={IMAGE_SIZES}
          className="mx-auto h-[clamp(8rem,22dvh,12rem)] w-auto [mask-image:radial-gradient(closest-side,black_82%,transparent)] object-contain mix-blend-multiply lg:h-[clamp(12rem,52dvh,26rem)]"
        />

        {/* Lista ordenada: são etapas, e a ordem importa. O número grande é só enfeite, porque
            a própria lista já diz ao leitor de tela qual é a posição de cada etapa. */}
        <ol className="grid gap-[clamp(0.5rem,1.6dvh,1rem)] sm:grid-cols-2">
          {METHODOLOGY_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="bg-cream/80 border-olive/40 flex gap-3 rounded-2xl border p-[clamp(0.75rem,2dvh,1.25rem)]"
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
                <p className="text-[clamp(0.8125rem,2.2dvh,0.875rem)]">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="mx-auto max-w-4xl text-center text-sm">
        <strong className="font-semibold">Compromisso com a excelência:</strong> Nossa abordagem
        combina técnica científica com cuidado humano, garantindo que cada sessão seja produtiva e
        agradável.
      </p>
    </Section>
  );
}
