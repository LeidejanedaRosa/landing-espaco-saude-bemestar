// Nome e registro no conselho de cada profissional, confirmados em docs/conteudo.md. Ficam em
// um lugar só: aparecem na seção de cada uma e no rodapé.
export interface Professional {
  name: string;
  registration: string;
}

export const LUIZA: Professional = {
  name: 'Dra. Luiza Rafaela de Castro Dolabella',
  registration: 'CREFITO 4 MG 213042-F'
};

export const VERONIKA: Professional = {
  name: 'Dra. Veronika Baptista',
  registration: 'CRM MG 98407'
};

/** Na ordem em que aparecem juntas: a Luiza, que é a principal, vem primeiro. */
export const PROFESSIONALS = [LUIZA, VERONIKA];
