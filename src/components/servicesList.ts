import atendimentoMedico from '../../design/originais/servico-atendimento-medico.png?w=400;800&format=avif;webp&as=picture';
import fisioterapia from '../../design/originais/servico-fisioterapia.png?w=400;800&format=avif;webp&as=picture';
import funcional from '../../design/originais/servico-funcional.png?w=400;800&format=avif;webp&as=picture';
import massoterapia from '../../design/originais/servico-massoterapia.png?w=375;750&format=avif;webp&as=picture';
import pilates from '../../design/originais/servico-pilates.png?w=215;429&format=avif;webp&as=picture';
import type { CheckListItem } from '../shared/ui/CheckList';
import type { PictureImage } from '../shared/ui/Picture';

export interface Service {
  /** Nome curto, para a aba. */
  tabLabel: string;
  name: string;
  description?: string;
  items: CheckListItem[];
  /** Texto do botão e o que entra na mensagem do WhatsApp ("Gostaria de agendar ..."). */
  cta: { label: string; subject: string };
  image: PictureImage;
  imageAlt: string;
}

// Nomes, itens e ordem: landing antiga (branch main), aprovados pela cliente. Não reescrever;
// o destaque (lead) só marca o começo de cada frase, sem mudar nenhuma palavra.
// Exceção: Atendimento Médico. Na landing antiga o texto era cópia do de Massoterapia; aqui vão
// as três especialidades e a frase do post da cliente, à espera da revisão dela.
// Rótulos das abas e textos dos botões são novos e também aguardam revisão.
export const SERVICES: Service[] = [
  {
    tabLabel: 'Fisioterapia',
    name: 'Fisioterapia',
    items: [
      {
        lead: 'Avaliação detalhada',
        rest: 'para entender dores, limitações e necessidades específicas.'
      },
      {
        lead: 'Tratamentos',
        rest: 'para lesões musculoesqueléticas, hérnia de disco, dores articulares e problemas de postura.'
      },
      {
        lead: 'Técnicas como terapia manual e liberação miofascial,',
        rest: 'sempre com foco na recuperação funcional e alívio da dor.'
      }
    ],
    cta: { label: 'Agendar fisioterapia', subject: 'uma sessão de fisioterapia' },
    image: fisioterapia,
    imageAlt: 'Ilustração de uma fisioterapeuta movimentando a perna de um paciente deitado na maca'
  },
  {
    tabLabel: 'Pilates',
    name: 'Pilates Clínico e Funcional',
    items: [
      {
        lead: 'Exercícios realizados nos equipamentos',
        rest: '(Reformer, Cadillac, Barrel e Chair) e no solo.'
      },
      { lead: 'Trabalha força,', rest: 'flexibilidade, equilíbrio e postura.' },
      {
        lead: 'Indicado para reabilitação,',
        rest: 'prevenção de lesões, melhora da mobilidade e qualidade de vida, especialmente na terceira idade.'
      }
    ],
    cta: { label: 'Agendar pilates', subject: 'uma aula de pilates' },
    image: pilates,
    imageAlt: 'Ilustração de uma profissional apoiando um paciente sentado na bola de pilates'
  },
  {
    tabLabel: 'Funcional',
    name: 'Treinamento Funcional',
    items: [
      {
        lead: 'Exercícios que simulam movimentos do dia a dia,',
        rest: 'fortalecendo todo o corpo.'
      },
      { lead: 'Foco na melhora da resistência,', rest: 'do equilíbrio e da coordenação.' },
      {
        lead: 'Excelente para aumentar disposição,',
        rest: 'prevenir quedas e tornar atividades cotidianas mais fáceis e seguras.'
      }
    ],
    cta: { label: 'Agendar treino funcional', subject: 'um treino funcional' },
    image: funcional,
    imageAlt: 'Ilustração de duas mulheres se exercitando: uma com halteres, outra em alongamento'
  },
  {
    tabLabel: 'Massoterapia',
    name: 'Massoterapia',
    items: [
      {
        lead: 'Técnicas de massagem terapêutica',
        rest: 'para relaxamento e alívio das tensões musculares.'
      },
      {
        lead: 'Auxilia na circulação sanguínea,',
        rest: 'reduz estresse e contribui para o bem-estar geral.'
      },
      { lead: 'Pode ser combinada', rest: 'com outros tratamentos para melhores resultados.' }
    ],
    cta: { label: 'Agendar massoterapia', subject: 'uma sessão de massoterapia' },
    image: massoterapia,
    imageAlt: 'Ilustração de uma massoterapeuta atendendo uma paciente deitada na maca'
  },
  {
    tabLabel: 'Atendimento médico',
    name: 'Atendimento Médico',
    description: 'Atendimento humanizado e tratamento integrado, com a Dra. Veronika Baptista.',
    items: [{ rest: 'Ortomolecular' }, { rest: 'Reumatologia' }, { rest: 'Endocrinologia' }],
    cta: { label: 'Agendar consulta médica', subject: 'uma consulta médica' },
    image: atendimentoMedico,
    imageAlt: 'Ilustração de uma médica de jaleco conversando com uma paciente sentada na maca'
  }
];
