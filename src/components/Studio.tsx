import { CardGrid } from '../shared/ui/CardGrid';
import { IllustratedCard } from '../shared/ui/IllustratedCard';
import { Section } from '../shared/ui/Section';
import { SectionHeading } from '../shared/ui/SectionHeading';
import { STUDIO_EQUIPMENT } from './studioEquipment';

const HEADING_ID = 'studio-titulo';

export function Studio() {
  return (
    <Section id="studio" labelledBy={HEADING_ID}>
      <SectionHeading
        id={HEADING_ID}
        eyebrow="Nosso studio"
        title="Aparelhos de alta precisão para o seu treino"
      />

      <CardGrid>
        {STUDIO_EQUIPMENT.map((equipment) => (
          <IllustratedCard
            key={equipment.name}
            image={equipment.image}
            imageAlt={equipment.imageAlt}
            tag={equipment.tag}
            title={equipment.name}
            description={equipment.description}
            items={equipment.benefits}
          />
        ))}
      </CardGrid>
    </Section>
  );
}
