import { About } from '../components/About';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { NAV_ITEMS } from '../components/navigation';
import { Services } from '../components/Services';
import { Studio } from '../components/Studio';
import { PageBackground } from '../shared/ui/PageBackground';

const CONTENT_ID = 'inicio';

export function HomePage() {
  return (
    <PageBackground>
      <Header navItems={NAV_ITEMS} contentId={CONTENT_ID} />
      <main id={CONTENT_ID}>
        <Hero />
        <Studio />
        <Services />
        <About />
      </main>
    </PageBackground>
  );
}
