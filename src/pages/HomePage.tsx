import { About } from '../components/About';
import { Audience } from '../components/Audience';
import { Contact } from '../components/Contact';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { MedicalCare } from '../components/MedicalCare';
import { Methodology } from '../components/Methodology';
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
        <MedicalCare />
        <Methodology />
        <Audience />
        <Contact />
      </main>
    </PageBackground>
  );
}
