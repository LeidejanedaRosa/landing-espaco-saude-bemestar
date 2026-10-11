// Endereço confirmado pela cliente (docs/conteudo.md). É dado público do studio, igual em
// qualquer ambiente, por isso fica no código e não em variável de ambiente.
export const ADDRESS_LINES = [
  'Av. Comendador Costa, 505, Centro',
  'São Lourenço, Minas Gerais',
  'CEP 37470-000'
];

const MAP_QUERY = 'Av. Comendador Costa, 505, Centro, São Lourenço, Minas Gerais, 37470-000';

export const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
