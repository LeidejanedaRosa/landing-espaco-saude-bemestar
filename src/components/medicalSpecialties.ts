export interface MedicalSpecialty {
  name: string;
  description: string;
  /** Caminhos do ícone de linha (área de 24×24), só decorativo. */
  iconPaths: string[];
}

// Os nomes vêm do post da cliente sobre a Dra. Veronika. As descrições vieram da versão de
// referência e aguardam a revisão da médica (ver pendências em docs/conteudo.md).
export const MEDICAL_SPECIALTIES: MedicalSpecialty[] = [
  {
    name: 'Ortomolecular',
    description:
      'Otimização celular, prevenção do estresse oxidativo e reposição nutricional individualizada.',
    iconPaths: [
      'M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0',
      'M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z',
      'M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z'
    ]
  },
  {
    name: 'Reumatologia',
    description:
      'Diagnóstico e manejo de doenças inflamatórias, dores articulares e condições autoimunes.',
    iconPaths: [
      'M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5z'
    ]
  },
  {
    name: 'Endocrinologia',
    description: 'Equilíbrio hormonal, saúde metabólica e suporte ao envelhecimento saudável.',
    iconPaths: ['M22 12h-4l-3 9L9 3l-3 9H2']
  }
];
