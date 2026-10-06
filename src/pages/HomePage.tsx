import logo from '../../design/originais/logo.png?w=160;320;455&format=avif;webp&as=picture';
import { Container } from '../shared/ui/Container';
import { PageBackground } from '../shared/ui/PageBackground';
import { Picture } from '../shared/ui/Picture';

export function HomePage() {
  return (
    <PageBackground>
      <main>
        <Container className="flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
          <Picture image={logo} alt="" sizes="10rem" priority className="h-auto w-40" />
          <h1 className="text-3xl font-semibold">Luiza — Espaço Saúde e Bem-estar</h1>
          <p>Site em construção.</p>
        </Container>
      </main>
    </PageBackground>
  );
}
