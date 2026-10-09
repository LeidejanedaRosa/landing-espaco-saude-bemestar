import { About } from '../components/About';
import { Audience } from '../components/Audience';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { MedicalCare } from '../components/MedicalCare';
import { Methodology } from '../components/Methodology';
import { NAV_ITEMS } from '../components/navigation';
import { Services } from '../components/Services';
import { Studio } from '../components/Studio';
import { PageBackground } from '../shared/ui/PageBackground';

const CONTENT_ID = 'inicio';
// Calculado uma vez, quando o módulo carrega: no build, para o HTML; no navegador, igual.
const CURRENT_YEAR = new Date().getFullYear();

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
      </main>
      <Footer navItems={NAV_ITEMS} year={CURRENT_YEAR} />
    </PageBackground>
  );
}
