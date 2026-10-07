import ramoRosa from '../assets/folhagens/ramo-rosa.svg';
import ramoVerde from '../assets/folhagens/ramo-verde.svg';
import guerreira from '../assets/tracos/guerreira.svg';
import trio from '../assets/tracos/trio.svg';
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
        className="absolute -top-16 -left-8 -z-10 h-44 w-auto rotate-155 opacity-45 md:h-56 min-[90rem]:-left-2 min-[90rem]:h-72"
      />
      <DecorativeImage
        src={ramoRosa}
        width={120}
        height={300}
        priority
        className="absolute -right-2 -bottom-10 -z-10 hidden h-64 w-auto rotate-20 opacity-45 md:block min-[90rem]:right-4 min-[90rem]:h-80"
      />
      {/* Só quando sobram margens laterais (tela mais larga que o conteúdo). */}
      <DecorativeImage
        src={ramoRosa}
        width={120}
        height={300}
        className="absolute bottom-6 -left-4 -z-10 hidden h-56 w-auto rotate-[-18deg] opacity-35 min-[90rem]:block"
      />
      <DecorativeImage
        src={ramoVerde}
        width={120}
        height={300}
        className="absolute top-2 -right-6 -z-10 hidden h-56 w-auto rotate-200 opacity-35 min-[90rem]:block"
      />

      <Container className="grid gap-6 py-[clamp(0.75rem,3.5dvh,2rem)] md:max-lg:grid-rows-[1fr_auto] lg:grid-cols-[5fr_6fr] lg:gap-10">
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
            O espaço foi pensado para oferecer um atendimento completo e individualizado, unindo
            saúde, movimento e bem-estar. Aqui, cada pessoa é acompanhada de forma personalizada,
            respeitando suas necessidades, limitações e objetivos.
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

        {/* A "parede": a frase em duas linhas ("O movimento cura" começa embaixo do "!" de
            "Acredite!") e as bonecas em traço. Dois desenhos, um por faixa de tela:
            - celular e tablet em pé: a faixa das três bonecas, larga e baixa, no topo, com a
              frase no canto superior esquerdo, sobre o espaço vazio do desenho. Tudo é medido
              em fração da largura da faixa (cqw), para a frase nunca alcançar as bonecas. O
              respiro acima do desenho é padding do bloco, e não margem da imagem: a margem
              "vazaria" para fora do bloco e deslocaria a frase junto;
            - desktop (lg): a boneca da recepção, sozinha, na coluna da direita. A frase é
              ancorada a uma fração da altura do desenho (--art-h) e termina rente ao braço
              erguido; o desenho cresce até a altura disponível (cqh), limitado pela largura.
            No HTML o título continua primeiro; só a ordem visual muda (order-first). */}
        <div className="@container relative order-first mx-auto w-full max-w-3xl md:max-lg:self-center lg:@container-size lg:order-0 lg:flex lg:max-w-none lg:items-center lg:justify-end lg:self-stretch lg:[--art-h:min(100cqh,91cqw)] lg:[--phrase:clamp(1.5rem,calc(var(--art-h)*0.085),3.25rem)]">
          <div className="relative w-full pt-[4cqw] lg:w-auto lg:pt-0">
            <p className="font-script text-rose-deep absolute top-0 left-[6cqw] text-[clamp(1.25rem,7.5cqw,3rem)] leading-[1.15] whitespace-nowrap lg:right-[calc(var(--art-h)*0.42)] lg:left-auto lg:text-(length:--phrase) lg:leading-[1.1]">
              <span className="block w-fit">Acredite!</span>{' '}
              <span className="ml-[2.57em] block w-fit">O movimento cura</span>
            </p>
            <DecorativeImage
              src={trio}
              width={3260}
              height={1134}
              alternate={{ media: '(min-width: 64rem)', src: guerreira, width: 1374, height: 1666 }}
              priority
              fetchPriority="high"
              className="h-auto w-full lg:mt-[max(0rem,calc(var(--phrase)*2.2-var(--art-h)*0.2))] lg:h-(--art-h) lg:w-auto lg:max-w-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
