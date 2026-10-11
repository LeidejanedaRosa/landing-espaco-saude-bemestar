import barrel from '../../design/originais/aparelho-barrel.png?w=287;575&format=avif;webp&as=picture';
import bicicleta from '../../design/originais/aparelho-bicicleta.png?w=400;800&format=avif;webp&as=picture';
import cadillac from '../../design/originais/aparelho-cadillac.png?w=388;776&format=avif;webp&as=picture';
import chair from '../../design/originais/aparelho-chair.png?w=343;687&format=avif;webp&as=picture';
import reformer from '../../design/originais/aparelho-reformer.png?w=400;800&format=avif;webp&as=picture';
import type { CheckListItem } from '../shared/ui/CheckList';
import type { PictureImage } from '../shared/ui/Picture';

export interface Equipment {
  /** Rótulo curto acima do nome, com o que o aparelho mais trabalha. */
  tag: string;
  name: string;
  description: string;
  /** O começo de cada benefício vai em destaque, como na landing aprovada. */
  benefits: CheckListItem[];
  image: PictureImage;
  imageAlt: string;
}

// Nome, descrição, benefícios e ordem: landing antiga (branch main), aprovados pela cliente.
// Não reescrever. Os rótulos (tag) vêm da versão de referência e aguardam a revisão dela.
export const STUDIO_EQUIPMENT: Equipment[] = [
  {
    tag: 'Força & resistência',
    name: 'Bicicleta',
    description:
      'A bicicleta ergométrica horizontal é uma forma segura, confortável e eficiente de se exercitar, ajudando a:',
    benefits: [
      { lead: 'Fortalece pernas', rest: 'e articulações' },
      { lead: 'Melhora a mobilidade', rest: 'e postura' },
      { lead: 'Cuida do coração', rest: 'e circulação' },
      { lead: 'Mais energia', rest: 'para o dia a dia' }
    ],
    image: bicicleta,
    imageAlt: 'Desenho a lápis de uma bicicleta ergométrica horizontal, com encosto e painel'
  },
  {
    tag: 'O clássico do Pilates',
    name: 'Reformer',
    description:
      'É um dos equipamentos mais conhecidos do pilates. Possui uma estrutura com molas, carrinho deslizante e barras que permitem centenas de variações de exercícios.',
    benefits: [
      { lead: 'Trabalha o corpo todo', rest: 'em diferentes posições (deitado, sentado, em pé)' },
      { lead: 'Proporciona fortalecimento muscular', rest: 'com baixo impacto' },
      { lead: 'Ajuda na reabilitação', rest: 'e no ganho de mobilidade' },
      {
        lead: 'Permite ajustar a resistência',
        rest: 'conforme a necessidade de cada aluno/paciente'
      }
    ],
    image: reformer,
    imageAlt: 'Desenho a lápis de um Reformer, com carrinho deslizante, molas e barra de apoio'
  },
  {
    tag: 'Reabilitação completa',
    name: 'Cadillac',
    description: 'Também chamado de “trapézio”, é uma grande estrutura com barras e molas.',
    benefits: [
      { lead: 'Excelente para alongamentos,', rest: 'fortalecimentos e mobilidade' },
      { lead: 'Oferece suporte e segurança', rest: 'para idosos ou pessoas em reabilitação' },
      { lead: 'Permite exercícios avançados', rest: 'e desafiadores para praticantes experientes' },
      { lead: 'Trabalha muito a estabilidade', rest: 'e o controle postural' }
    ],
    image: cadillac,
    imageAlt: 'Desenho a lápis de um Cadillac, uma maca com estrutura alta de barras e alças'
  },
  {
    tag: 'Flexibilidade & coluna',
    name: 'Barrel',
    description:
      'Conhecido como “barril”, é usado principalmente para alongamentos e exercícios de flexibilidade.',
    benefits: [
      { lead: 'Alongamento profundo da coluna', rest: 'e cadeia posterior' },
      { lead: 'Melhora da postura', rest: 'e da consciência corporal' },
      { lead: 'Fortalecimento do core', rest: 'e mobilidade de quadril e ombros' },
      { lead: 'Muito utilizado para liberar', rest: 'tensões musculares' }
    ],
    image: barrel,
    imageAlt: 'Desenho a lápis de um Barrel, com apoio curvo acolchoado e espaldar em degraus'
  },
  {
    tag: 'Equilíbrio & controle',
    name: 'Chair',
    description: 'Uma espécie de cadeira com pedais e molas reguláveis, bastante versátil.',
    benefits: [
      { lead: 'Fortalecimento intenso,', rest: 'especialmente de pernas e glúteos' },
      { lead: 'Melhora o equilíbrio', rest: 'e a coordenação motora' },
      { lead: 'Excelente para treinos de força', rest: 'em pouco espaço' },
      { lead: 'Pode ser adaptada', rest: 'tanto para iniciantes quanto para exercícios avançados' }
    ],
    image: chair,
    imageAlt: 'Desenho a lápis de uma Chair, um assento com pedais de mola e duas hastes de apoio'
  }
];
