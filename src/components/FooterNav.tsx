import { FOOTER_COLUMN_TITLE_CLASSES, FOOTER_LINK_CLASSES } from './footerClasses';
import type { NavItem } from './navigation';

/** Os mesmos links do menu do topo, em uma região própria. */
export function FooterNav({ items }: Readonly<{ items: NavItem[] }>) {
  return (
    <nav aria-label="Rodapé" className="flex flex-col gap-3">
      <h2 className={FOOTER_COLUMN_TITLE_CLASSES}>Navegação</h2>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`${FOOTER_LINK_CLASSES} inline-flex min-h-8 items-center`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
