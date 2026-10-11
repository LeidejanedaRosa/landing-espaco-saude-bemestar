export interface Credential {
  title: string;
  description: string;
  /** Caminhos do ícone de linha (viewBox 0 0 24 24), só decorativo. */
  iconPaths: string[];
}

// Títulos, descrições e ordem: landing antiga (branch main), aprovados pela cliente.
// Não reescrever. Os ícones são novos e só enfeitam.
export const CREDENTIALS: Credential[] = [
  {
    title: 'Fisioterapia',
    description:
      'Graduação completa com 10 anos de experiência prática no atendimento especializado.',
    iconPaths: ['M22 10v6', 'M2 10l10-5 10 5-10 5z', 'M6 12v5c3 3 9 3 12 0v-5']
  },
  {
    title: 'Disfunções Musculoesqueléticas',
    description:
      'Pós-graduação focada no tratamento de problemas de coluna, articulações e musculatura.',
    iconPaths: ['M22 12h-4l-3 9L9 3l-3 9H2']
  },
  {
    title: 'Pilates Clínico e Funcional',
    description:
      'Formação completa para reabilitação, prevenção de lesões e melhora da qualidade de vida.',
    iconPaths: [
      'M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
      'M4 9h16',
      'M12 9v6',
      'M12 15l-4 7',
      'M12 15l4 7'
    ]
  },
  {
    title: 'Hidroterapia e Fisiologia',
    description:
      'Pós-graduação em Fisiologia do Exercício e especialização em fisioterapia aquática.',
    iconPaths: [
      'M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z'
    ]
  },
  {
    title: 'Terapias Manuais Avançadas',
    description:
      'Técnicas especializadas para coluna, hérnia de disco, liberação miofascial e massoterapia.',
    iconPaths: [
      'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z'
    ]
  },
  {
    title: 'Raciocínio Clínico Avançado',
    description: 'Formação contínua (RCA) para um diagnóstico preciso e um tratamento mais eficaz.',
    iconPaths: [
      'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5',
      'M9 18h6',
      'M10 22h4'
    ]
  }
];
