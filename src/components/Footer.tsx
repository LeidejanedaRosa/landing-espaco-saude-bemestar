import { Container } from '../shared/ui/Container';
import { formatWhatsAppNumber, buildWhatsAppUrl } from '../shared/utils/whatsapp';
import { ADDRESS_LINES, MAP_URL, instagramHandle } from './contactInfo';
import type { NavItem } from './navigation';
import { SCHEDULE_MESSAGE } from './whatsappMessages';

interface FooterProps {
  navItems: NavItem[];
  /** Ano do aviso de direitos. Vem de quem monta a página, para o rodapé não depender do relógio. */
  year: number;
}

const LINK_CLASSES =
  'focus-visible:outline-cream rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2';
const COLUMN_TITLE_CLASSES = 'text-blush text-sm font-semibold tracking-widest uppercase';

export function Footer({ navItems, year }: Readonly<FooterProps>) {
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL;

  return (
    <footer>
      {/* A passagem do fundo da página para o verde do rodapé fica nesta faixa, que é do
          próprio rodapé e não tem texto: no meio dela nenhuma cor de texto teria contraste. */}
      <div
        aria-hidden="true"
        className="to-olive-deep h-[clamp(5rem,14dvh,10rem)] bg-linear-to-b from-transparent"
      />

      <div className="bg-olive-deep text-cream">
        <Container className="flex flex-col gap-8 pt-4 pb-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_2fr]">
            <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
              <p className="font-display text-2xl font-medium">
                Luiza <span className="font-script text-rose-soft text-[1.3em]">Espaço</span>
              </p>
              <p>Saúde e Bem-estar</p>
              <p className="max-w-sm text-sm">
                Movimento consciente, reabilitação especializada e cuidado integrado.
              </p>
            </div>

            <nav aria-label="Rodapé" className="flex flex-col gap-3">
              <h2 className={COLUMN_TITLE_CLASSES}>Navegação</h2>
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`${LINK_CLASSES} inline-flex min-h-8 items-center`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-3">
              <h2 className={COLUMN_TITLE_CLASSES}>Contato</h2>
              <address className="flex flex-col gap-2 not-italic">
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASSES}
                >
                  {ADDRESS_LINES.join(' · ')}
                  <span className="sr-only"> (abre o mapa em nova aba)</span>
                </a>
                <a
                  href={buildWhatsAppUrl(SCHEDULE_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${LINK_CLASSES} inline-flex min-h-8 items-center`}
                >
                  WhatsApp {formatWhatsAppNumber()}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${LINK_CLASSES} inline-flex min-h-8 items-center`}
                >
                  Instagram {instagramHandle(instagramUrl)}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </address>
            </div>
          </div>

          <div className="border-cream/25 flex flex-col gap-3 border-t pt-6 text-sm lg:flex-row lg:items-end lg:justify-between">
            <ul className="flex flex-col gap-1">
              <li>Dra. Luiza Rafaela de Castro Dolabella · CREFITO 4 MG 213042-F</li>
              <li>Dra. Veronika Baptista · CRM MG 98407</li>
            </ul>
            <p>© {year} Luiza — Espaço Saúde e Bem-estar. Todos os direitos reservados.</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
