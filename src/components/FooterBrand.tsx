import logo from '../../design/originais/logo.png?w=128;256&format=avif;webp&as=picture';
import guerreira from '../assets/tracos/guerreira.svg';
import { SITE_NAME } from '../shared/site';
import { DecorativeImage } from '../shared/ui/DecorativeImage';
import { Picture } from '../shared/ui/Picture';

/**
 * A parede da recepção, como no hero: o logo, a frase em duas linhas ("O movimento cura"
 * começa embaixo do "!") e a boneca em traço ao fundo.
 */
export function FooterBrand() {
  return (
    <div className="@container relative isolate flex min-h-64 flex-col items-center justify-center gap-4 overflow-clip sm:col-span-2 lg:col-span-1">
      <DecorativeImage
        src={guerreira}
        width={1374}
        height={1666}
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[115%] w-auto max-w-none -translate-x-[10%] -translate-y-1/2 opacity-30"
      />
      {/* O logo é verde e rosa: sobre o verde do rodapé ele sumiria, por isso o cartão claro. */}
      <div className="bg-cream rounded-3xl p-3 shadow-md">
        <Picture image={logo} alt={SITE_NAME} sizes="7rem" className="h-28 w-auto" />
      </div>
      {/* Sem `nowrap`, e com o recuo limitado a uma fração da coluna (30cqw): com a fonte
          do navegador aumentada em tela estreita, a frase quebra de linha em vez de
          passar da coluna e ser cortada. Em tamanho normal o recuo é o da parede. */}
      <p className="font-script text-rose-soft max-w-full text-[clamp(1.75rem,8.5vw,2.75rem)] leading-[1.1]">
        <span className="block">Acredite!</span>{' '}
        <span className="ml-[min(2.57em,30cqw)] block">O movimento cura</span>
      </p>
    </div>
  );
}
