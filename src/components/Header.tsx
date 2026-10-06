import { useCallback, useRef } from 'react';
import logo from '../../design/originais/logo.png?w=64;128;192&format=avif;webp&as=picture';
import { useDisclosure } from '../shared/hooks/useDisclosure';
import { ButtonLink } from '../shared/ui/ButtonLink';
import { Container } from '../shared/ui/Container';
import { Picture } from '../shared/ui/Picture';
import { buildWhatsAppUrl } from '../shared/utils/whatsapp';
import type { NavItem } from './navigation';

const SCHEDULE_MESSAGE = 'Olá! Gostaria de agendar uma avaliação.';
const MENU_ID = 'menu-principal';

interface HeaderProps {
  navItems: NavItem[];
  /** id do conteúdo principal, destino do logo e do link "pular para o conteúdo". */
  contentId: string;
}

export function Header({ navItems, contentId }: HeaderProps) {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const focusMenuButton = useCallback(() => menuButtonRef.current?.focus(), []);
  const menu = useDisclosure({ onEscapeClose: focusMenuButton });

  return (
    <header className="bg-cream/95 border-blush sticky top-0 z-10 border-b backdrop-blur-sm">
      <a
        href={`#${contentId}`}
        className="bg-ink text-cream sr-only rounded-full px-4 py-2 focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-20"
      >
        Pular para o conteúdo
      </a>

      <Container className="relative flex items-center justify-between gap-4 py-2">
        <a
          href={`#${contentId}`}
          className="focus-visible:outline-olive-deep rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Picture
            image={logo}
            alt="Luiza — Espaço Saúde e Bem-estar, ir para o início"
            sizes="3.5rem"
            priority
            className="h-16 w-auto"
          />
        </a>

        <nav
          id={MENU_ID}
          aria-label="Principal"
          className={`${menu.isOpen ? 'block' : 'hidden'} bg-cream border-blush absolute inset-x-0 top-full border-b lg:static lg:block lg:border-0 lg:bg-transparent`}
        >
          <ul className="px-gutter flex flex-col py-2 lg:flex-row lg:gap-6 lg:p-0">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={menu.close}
                  className="hover:text-rose-deep focus-visible:outline-olive-deep flex min-h-11 items-center rounded-lg text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={buildWhatsAppUrl(SCHEDULE_MESSAGE)} external size="sm">
            Agendar
          </ButtonLink>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menu.isOpen}
            aria-controls={MENU_ID}
            onClick={menu.toggle}
            className="border-olive-deep focus-visible:outline-olive-deep inline-flex size-11 items-center justify-center rounded-full border focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
          >
            <span className="sr-only">{menu.isOpen ? 'Fechar menu' : 'Abrir menu'}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {menu.isOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>
    </header>
  );
}
