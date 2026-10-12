import { SITE_NAME } from '../shared/site';
import { Container } from '../shared/ui/Container';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { FooterBrand } from './FooterBrand';
import { FooterContact } from './FooterContact';
import { FooterNav } from './FooterNav';
import type { NavItem } from './navigation';
import { PROFESSIONALS } from './professionals';

interface FooterProps {
  navItems: NavItem[];
  /** Ano do aviso de direitos. Vem de quem monta a página, para o rodapé não depender do relógio. */
  year: number;
}

const HEADING_ID = 'contato-titulo';

/**
 * Fecho da página: a chamada final e, logo abaixo, tudo o que antes se repetia entre o cartão
 * de contato e o rodapé (marca, navegação, endereço, redes e os dois botões).
 */
export function Footer({ navItems, year }: Readonly<FooterProps>) {
  return (
    <footer>
      {/* A passagem do fundo da página para o verde do rodapé fica nesta faixa, que é do
          próprio rodapé. Ela sobe por trás do fim da seção anterior (margem negativa e `-z-10`),
          em curva: o verde aparece atrás dos cartões de Depoimentos, em qualquer tela. */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative -z-10 -mt-[clamp(14rem,40dvh,24rem)] h-[clamp(19rem,54dvh,34rem)]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 125% 100% at 72% 100%, var(--color-olive-deep) 46%, transparent 100%), linear-gradient(to bottom, transparent 45%, var(--color-olive-deep) 100%)'
        }}
      />

      <div className="bg-olive-deep text-cream">
        <Container className="flex flex-col gap-10 pt-4 pb-8">
          {/* Não há formulário: a ação principal leva ao WhatsApp. */}
          <section
            id="contato"
            aria-labelledby={HEADING_ID}
            className="flex flex-col items-center gap-4 text-center"
          >
            <SectionHeading
              id={HEADING_ID}
              eyebrow="Contato"
              title="Priorize o que realmente importa: Você!"
              highlight="Você!"
              tone="dark"
            />
            <p className="max-w-2xl">
              Agende sua consulta ou aula experimental e sinta a diferença de um cuidado
              verdadeiramente individualizado.
            </p>
          </section>

          <div className="border-cream/25 grid gap-8 border-t pt-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_2fr]">
            <FooterBrand />
            <FooterNav items={navItems} />
            <FooterContact />
          </div>

          <div className="border-cream/25 flex flex-col gap-3 border-t pt-6 text-sm lg:flex-row lg:items-end lg:justify-between">
            <ul className="flex flex-col gap-1">
              {PROFESSIONALS.map((professional) => (
                <li key={professional.registration}>
                  {professional.name} · {professional.registration}
                </li>
              ))}
            </ul>
            <p>
              © {year} {SITE_NAME}. Todos os direitos reservados.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
