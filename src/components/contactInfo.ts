// Endereço confirmado pela cliente (docs/conteudo.md). É dado público do studio, igual em
// qualquer ambiente, por isso fica no código e não em variável de ambiente.
export const ADDRESS = {
  street: 'Av. Comendador Costa, 505',
  district: 'Centro',
  city: 'São Lourenço',
  state: 'Minas Gerais',
  stateCode: 'MG',
  postalCode: '37470-000',
  countryCode: 'BR'
};

export const ADDRESS_LINES = [
  `${ADDRESS.street}, ${ADDRESS.district}`,
  `${ADDRESS.city}, ${ADDRESS.state}`,
  `CEP ${ADDRESS.postalCode}`
];

const MAP_QUERY = `${ADDRESS.street}, ${ADDRESS.district}, ${ADDRESS.city}, ${ADDRESS.state}, ${ADDRESS.postalCode}`;

export const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
