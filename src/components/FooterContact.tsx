import { ButtonLink } from '../shared/ui/ButtonLink';
import { LineIcon } from '../shared/ui/LineIcon';
import { buildWhatsAppUrl } from '../shared/utils/whatsapp';
import { ADDRESS_LINES, MAP_URL } from './contactInfo';
import { FOOTER_COLUMN_TITLE_CLASSES } from './footerClasses';
import { SCHEDULE_MESSAGE } from './whatsappMessages';

const ICON_BUTTON_CLASSES =
  'pop-on-scroll bg-cream text-olive-deep ring-cream/25 hover:text-rose-deep hover:ring-cream/50 focus-visible:outline-cream inline-flex size-14 items-center justify-center rounded-full shadow-lg ring-4 transition-[scale,translate,box-shadow,color] duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:ring-8 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100';
const INSTAGRAM_ICON = [
  'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z',
  'M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0',
  'M17.5 6.5h.01'
];
// Símbolo do WhatsApp (forma cheia, e não traço): é a marca que a pessoa reconhece.
const WHATSAPP_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';

/** Onde o studio fica e como falar com ele: endereço, redes e os dois botões de ação. */
export function FooterContact() {
  const whatsAppUrl = buildWhatsAppUrl(SCHEDULE_MESSAGE);
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL;

  return (
    <div className="flex flex-col gap-3">
      <h2 className={FOOTER_COLUMN_TITLE_CLASSES}>Onde estamos</h2>
      <address className="not-italic">
        {ADDRESS_LINES.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>
      {/* Botões de rede em destaque: cheios, com um anel em volta. Surgem crescendo
          quando o rodapé entra na tela e reagem ao mouse; nada fica em movimento. */}
      <ul className="flex gap-4 pt-1">
        <li>
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp (abre em nova aba)"
            className={ICON_BUTTON_CLASSES}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="currentColor">
              <path d={WHATSAPP_PATH} />
            </svg>
          </a>
        </li>
        <li>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram (abre em nova aba)"
            className={ICON_BUTTON_CLASSES}
          >
            <LineIcon paths={INSTAGRAM_ICON} className="size-7" />
          </a>
        </li>
      </ul>
      <div className="flex flex-wrap gap-2 pt-2">
        <ButtonLink href={whatsAppUrl} external variant="light">
          Agendar avaliação
        </ButtonLink>
        <ButtonLink href={MAP_URL} external variant="outline-light">
          Ver no mapa
        </ButtonLink>
      </div>
    </div>
  );
}
