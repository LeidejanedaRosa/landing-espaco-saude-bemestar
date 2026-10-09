export interface Audience {
  name: string;
  /** Caminhos do ícone de linha (área de 24×24), só decorativo. */
  iconPaths: string[];
}

// Nomes e ordem: landing antiga (branch main), aprovados pela cliente. Não reescrever.
// A versão de referência trazia um complemento para cinco dos seis públicos (ver
// docs/conteudo.md); não entram aqui enquanto a cliente não os aprovar. Os ícones são novos.
export const AUDIENCES: Audience[] = [
  {
    name: 'Idosos',
    iconPaths: [
      'M10 4a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
      'M12 7v7',
      'M12 14l-3 7',
      'M12 14l2.5 7',
      'M12 9.5l5.5 2.5',
      'M17.5 12v9'
    ]
  },
  {
    name: 'Adultos em geral',
    iconPaths: ['M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z']
  },
  {
    name: 'Gestantes',
    iconPaths: [
      'M9 12h.01',
      'M15 12h.01',
      'M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5',
      'M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1'
    ]
  },
  {
    name: 'Pessoas em reabilitação',
    iconPaths: [
      'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z',
      'M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27'
    ]
  },
  {
    name: 'Atletas',
    iconPaths: [
      'M6 9H4.5a2.5 2.5 0 0 1 0-5H6',
      'M18 9h1.5a2.5 2.5 0 0 0 0-5H18',
      'M4 22h16',
      'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22',
      'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22',
      'M18 2H6v7a6 6 0 0 0 12 0V2z'
    ]
  },
  {
    name: 'Praticantes de atividade física',
    iconPaths: [
      'M6.5 6.5l11 11',
      'M21 21l-1-1',
      'M3 3l1 1',
      'M18 22l4-4',
      'M2 6l4-4',
      'M3 10l7-7',
      'M14 21l7-7'
    ]
  }
];
