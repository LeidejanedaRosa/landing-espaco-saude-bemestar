import ramoRosa from '../assets/folhagens/ramo-rosa.svg';
import ramoVerde from '../assets/folhagens/ramo-verde.svg';
import guerreira from '../assets/tracos/guerreira.svg';
import { ButtonLink } from '../shared/ui/ButtonLink';
import { Container } from '../shared/ui/Container';
import { DecorativeImage } from '../shared/ui/DecorativeImage';
import { buildWhatsAppUrl } from '../shared/utils/whatsapp';
import { SCHEDULE_MESSAGE } from './whatsappMessages';

const STATS = [
  { value: '10+', label: 'anos de experiência' },
  { value: '5', label: 'aparelhos de pilates' },
  { value: '1:1', label: 'atendimento individual' }
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="relative isolate flex min-h-[calc(100dvh-var(--spacing-header))] overflow-hidden"
    >
      <DecorativeImage
        src={ramoVerde}
        width={120}
        height={300}
        priority
        className="absolute -top-16 -left-8 -z-10 h-44 w-auto rotate-[155deg] opacity-45 md:h-56 min-[90rem]:-left-2 min-[90rem]:h-72"
      />
      <DecorativeImage
        src={ramoRosa}
        width={120}
        height={300}
        priority
        className="absolute -right-2 -bottom-10 -z-10 hidden h-64 w-auto rotate-[20deg] opacity-45 md:block min-[90rem]:right-4 min-[90rem]:h-80"
      />
      {/* Só quando sobram margens laterais (tela mais larga que o conteúdo). */}
      <DecorativeImage
        src={ramoRosa}
        width={120}
        height={300}
        className="absolute bottom-6 -left-4 -z-10 hidden h-56 w-auto -rotate-[18deg] opacity-35 min-[90rem]:block"
      />
      <DecorativeImage
        src={ramoVerde}
        width={120}
        height={300}
        className="absolute top-2 -right-6 -z-10 hidden h-56 w-auto rotate-[200deg] opacity-35 min-[90rem]:block"
      />

      <Container className="grid gap-6 py-[clamp(0.75rem,3.5dvh,2rem)] md:grid-cols-[5fr_6fr] md:gap-10">
        <div className="flex flex-col items-start gap-[clamp(0.5rem,2.2dvh,1.25rem)] self-center">
          <h1
            id="hero-titulo"
            className="text-[clamp(2.25rem,min(4.2vw,7dvh),3.75rem)] leading-tight font-medium"
          >
            Saúde, movimento e{' '}
            <span className="font-script text-rose-deep text-[1.15em] leading-none font-normal whitespace-nowrap">
              bem-estar
            </span>{' '}
            em um só espaço
          </h1>

          <p className="max-w-prose text-[clamp(1rem,2.6dvh,1.125rem)]">
            Cuide da sua saúde com a atenção e o acolhimento que você merece. Fisioterapia, Pilates
            Clínico, Treinamento Funcional, Massoterapia e Atendimento Médico — com acompanhamento
            próximo e humanizado.
          </p>

          <div className="flex flex-wrap gap-2">
            <ButtonLink href={buildWhatsAppUrl(SCHEDULE_MESSAGE)} external>
              Agendar avaliação
            </ButtonLink>
            <ButtonLink href="#studio" variant="secondary">
              Conhecer o studio
            </ButtonLink>
          </div>

          <dl className="border-blush grid w-full grid-cols-3 gap-4 border-t pt-[clamp(0.5rem,2dvh,1.25rem)]">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end">
                <dt className="text-sm">{stat.label}</dt>
                <dd className="font-display text-[clamp(1.5rem,4.2dvh,1.875rem)] font-medium">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Reproduz a parede da recepção: "O movimento cura" começa embaixo do "!" de
            "Acredite!", e a frase termina rente ao braço erguido da figura. Por isso ela é
            ancorada pela direita, a uma fração da altura do desenho (--art-h).
            A coluna é um container de tamanho: o desenho cresce até a altura disponível (cqh),
            limitado pela largura que sobra para a frase caber à esquerda do braço (cqw).
            No celular ela vem antes do texto (order-first); no código, o título continua
            primeiro, que é a ordem lida por leitor de tela e buscador. */}
        <div className="[container-type:size] relative order-first flex h-[calc(clamp(14rem,70vw,20rem)+1rem)] items-center justify-end [--art-h:min(100cqh,91cqw)] [--phrase:clamp(1.5rem,calc(var(--art-h)*0.085),3.25rem)] md:order-none md:h-auto md:self-stretch">
          <div className="relative">
            <p className="font-script text-rose-deep absolute top-0 right-[calc(var(--art-h)*0.42)] text-[length:var(--phrase)] leading-[1.1] whitespace-nowrap">
              <span className="block w-fit">Acredite!</span>{' '}
              <span className="ml-[2.57em] block w-fit">O movimento cura</span>
            </p>
            <DecorativeImage
              src={guerreira}
              width={1374}
              height={1666}
              priority
              fetchPriority="high"
              className="mt-[max(0rem,calc(var(--phrase)*2.2-var(--art-h)*0.2))] h-[var(--art-h)] w-auto max-w-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
