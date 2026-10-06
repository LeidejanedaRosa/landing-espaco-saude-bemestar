import { Container } from '../shared/ui/Container';
import { PageBackground } from '../shared/ui/PageBackground';

export function HomePage() {
  return (
    <PageBackground>
      <main>
        <Container className="flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl font-semibold">Luiza — Espaço Saúde e Bem-estar</h1>
          <p>Site em construção.</p>
        </Container>
      </main>
    </PageBackground>
  );
}
