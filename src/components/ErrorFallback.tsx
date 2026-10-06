import { Container } from '../shared/ui/Container';
import { PageBackground } from '../shared/ui/PageBackground';
import { buildWhatsAppUrl } from '../shared/utils/whatsapp';

const SUPPORT_MESSAGE = 'Olá! Tentei acessar o site e ele apresentou um erro. Pode me ajudar?';

export function ErrorFallback() {
  return (
    <PageBackground>
      <main>
        <Container className="flex min-h-dvh flex-col items-center justify-center gap-6 text-center">
          <div role="alert" className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-semibold">Algo deu errado por aqui</h1>
            <p className="max-w-prose">
              Não conseguimos carregar esta página. Tente recarregar ou fale com a gente pelo
              WhatsApp.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl(SUPPORT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-olive-deep text-cream hover:bg-ink focus-visible:outline-olive-deep rounded-full px-6 py-3 font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Falar no WhatsApp<span className="sr-only"> (abre em nova aba)</span>
          </a>
        </Container>
      </main>
    </PageBackground>
  );
}
