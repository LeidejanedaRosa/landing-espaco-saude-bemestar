export interface MethodologyStep {
  title: string;
  description: string;
}

// Títulos, descrições e ordem: landing antiga (branch main), aprovados pela cliente.
// Não reescrever.
export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    title: 'Avaliação Inicial',
    description:
      'Análise completa do histórico médico, avaliação postural, testes de força, flexibilidade e equilíbrio para entender suas necessidades específicas.'
  },
  {
    title: 'Plano Personalizado',
    description:
      'Desenvolvimento de um programa individual baseado em seus objetivos, limitações e preferências. Cada exercício é escolhido especialmente para você.'
  },
  {
    title: 'Acompanhamento Próximo',
    description:
      'Supervisão constante durante os exercícios, ajustes conforme sua evolução e orientações para atividades em casa.'
  },
  {
    title: 'Reavaliação Contínua',
    description:
      'Monitoramento regular dos progressos com ajustes no plano de tratamento para garantir resultados otimizados e duradouros.'
  }
];
