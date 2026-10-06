import { Header } from '../components/Header';
import { NAV_ITEMS } from '../components/navigation';
import { Container } from '../shared/ui/Container';
import { PageBackground } from '../shared/ui/PageBackground';

const CONTENT_ID = 'inicio';

export function HomePage() {
  return (
    <PageBackground>
      <Header navItems={NAV_ITEMS} contentId={CONTENT_ID} />
      <main id={CONTENT_ID}>
        <Container className="flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl font-semibold">Luiza — Espaço Saúde e Bem-estar</h1>
          <p>Site em construção.</p>
        </Container>
      </main>
    </PageBackground>
  );
}
