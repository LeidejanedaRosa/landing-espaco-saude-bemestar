import leidejane from '../../design/originais/depoimento-leidejane.png?w=160;320&format=avif;webp&as=picture';
import type { PictureImage } from '../shared/ui/Picture';

export interface Testimonial {
  name: string;
  /** Nota dada no Google, de 1 a 5. */
  rating: number;
  text: string;
  photo: PictureImage;
}

// PROVISÓRIO: os três cartões repetem a avaliação da Leidejane, só para aprovar o layout.
// As avaliações definitivas são as do Google, escolhidas pela cliente, cada uma com o
// consentimento de quem escreveu (ver docs/conteudo.md). O texto abaixo é um marcador, e não
// uma avaliação: trocar pelo texto real antes de publicar.
const PLACEHOLDER: Testimonial = {
  name: 'Leidejane da Rosa',
  rating: 5,
  text: '[Texto da avaliação da Leidejane no Google entra aqui. Este é só um marcador de lugar, com o tamanho aproximado de uma avaliação comum, para o cartão poder ser avaliado fechado e aberto. Ao colar o texto real, ele substitui este trecho inteiro, sem mudar mais nada no cartão.]',
  photo: leidejane
};

export const TESTIMONIALS: Testimonial[] = [
  PLACEHOLDER,
  { ...PLACEHOLDER, name: 'Leidejane da Rosa (2)' },
  { ...PLACEHOLDER, name: 'Leidejane da Rosa (3)' }
];

// Perfil do studio no Google Maps, já aberto na aba de avaliações (confirmado pela Leidejane em
// 2026-10-09). É o endereço que o Maps gera, sem os parâmetros de rastreio do fim. Dado público
// e fixo, como o endereço do studio: fica no código, e não em variável de ambiente.
export const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/Espa%C3%A7o+Sa%C3%BAde+e+bem+estar/@-22.1150493,-45.0586322,861m/data=!3m1!1e3!4m8!3m7!1s0x94cb4b2e4d985b7d:0x427c6e4f12eb2e8e!8m2!3d-22.1150543!4d-45.0560573!9m1!1b1!16s%2Fg%2F11sf3yknyg?hl=pt-BR';
