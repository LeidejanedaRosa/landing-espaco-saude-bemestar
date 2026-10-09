# Conteúdo da landing

Textos preservados da landing antiga (o `index.html` anterior continua no histórico do git, na
`main` até o commit `a9f13b9`) e da versão de referência feita na Emergent. É a fonte dos textos
para as seções novas.

## Qual texto vale

Os textos da landing antiga, que estão na branch `main`, **foram aprovados pela cliente** e são
a fonte principal. Os textos que só existem na versão da Emergent entram apenas onde a `main`
não tem nada equivalente (hoje, o título e os três números do hero) e precisam da revisão
dela. O texto de apresentação do hero é o parágrafo aprovado da `main`.

Títulos de seção aprovados na `main`: "Sobre a Luiza", "Certificações e Qualificações", "O que
Luiza Espaço Saúde e bem estar oferece?", "Para quem o pilates é indicado?", "Equipamentos",
"Nossa Metodologia" e "O que dizem sobre nós".

## Dados confirmados pela cliente (2026-10-05)

- **WhatsApp:** +55 35 98896-0886
- **Instagram:** https://www.instagram.com/lufisio.pilates/
- **Endereço:** Av. Comendador Costa, 505, Centro, São Lourenço, Minas Gerais, CEP 37470-000
- **Fisioterapeuta:** Drª Luiza Rafaela de Castro Dolabella — CREFITO 4 MG 213042-F
- **Médica:** Dra. Veronika Baptista — CRM MG 98407

A publicação dos nomes e registros profissionais foi autorizada. No código, WhatsApp e Instagram
vêm das variáveis de ambiente (`.env`), nunca escritos direto nos componentes.

## Decisões de conteúdo

- Não haverá formulário de contato: todas as chamadas levam ao WhatsApp.

## Pendências de conteúdo

Ficam para depois da primeira entrega para aprovação da cliente:

- **Texto das especialidades médicas:** os nomes (ortomolecular, reumatologia, endocrinologia)
  vêm do post da cliente; a descrição de cada uma veio da versão da Emergent e precisa da
  revisão da Dra. Veronika. Até lá, o site usa o texto atual.
- **E-mail:** sem e-mail confirmado, o site não exibe e-mail.
- **Rótulos das abas e botões de serviço:** "Pilates", "Funcional", "Agendar fisioterapia",
  "Agendar pilates", "Agendar treino funcional", "Agendar massoterapia" e "Agendar consulta
  médica" são textos novos, criados para a navegação. Pedem a revisão da cliente.
- **Cartão de Atendimento Médico, na seção Serviços:** a landing antiga repetia ali o texto de
  Massoterapia. O site usa as três especialidades e a frase "Atendimento humanizado e tratamento
  integrado", tiradas do post da cliente sobre a Dra. Veronika. Pede a confirmação dela.
- **Título da seção Metodologia:** a landing antiga usava "Nossa Metodologia". Aqui isso virou o
  rótulo, e o título é "Técnica científica com cuidado humano", trecho do compromisso aprovado
  ("nossa abordagem combina técnica científica com cuidado humano"). Pede a confirmação da cliente.
- **Seção "Para quem o pilates é indicado":** o site mostra só os nomes dos seis públicos. O
  rótulo "Indicações" é novo, e os complementos da tabela abaixo (da versão da Emergent) ficam
  de fora até a cliente aprovar.
- **Foto da Dra. Veronika:** a seção "Atendimento médico" usa a foto que estava na versão da
  Emergent (`design/originais/dra-veronika-retrato.png`, 279×416 px). É provisória: resolução
  baixa, e falta confirmar com a cliente que a foto pode ser usada. Trocar por uma em retrato,
  com pelo menos 500 px de largura, do Instagram ou enviada por ela.
- **Foto da Luiza:** a seção "Sobre a Luiza" usa um recorte de `src/assets/images/Luiza.png`
  (372×496 px). É provisória: a resolução é baixa para telas de alta densidade. Trocar por uma
  foto em retrato, com pelo menos 800 px de largura, do Instagram dela ou enviada por ela.
- **Frase de destaque da seção "Sobre a Luiza":** "Atendimento individualizado, com foco na
  reabilitação, na prevenção de lesões e na melhora da qualidade de vida" é um trecho da
  apresentação dela, promovido a título. Ele aparece de novo no segundo parágrafo.

## Depoimentos

- **Fonte:** avaliações do perfil do studio no Google. Os depoimentos das versões antigas eram
  fictícios e não devem ser usados.
- **Ainda falta:** a cliente escolher as avaliações e os textos serem copiados para cá. O link
  do perfil que estava na landing antiga é `https://share.google/iis78GJjcBJA86a6h` (confirmar).
- **Cuidado (LGPD):** relato de tratamento com o nome da pessoa é dado de saúde. Exibir só
  primeiro nome e inicial, e com o consentimento de quem escreveu.
- A seção traz um link "Ver todas as avaliações no Google".

## Marca

- Nome: **Luiza — Espaço Saúde e Bem-estar**
- Apresentação: o espaço foi pensado para oferecer um atendimento completo e individualizado,
  unindo saúde, movimento e bem-estar. Aqui, cada pessoa é acompanhada de forma personalizada,
  respeitando suas necessidades, limitações e objetivos.
- Objetivo: promover mais saúde, movimento e qualidade de vida, com um ambiente acolhedor e
  profissionais qualificados, onde cada paciente se sente cuidado de forma única.

## Sobre a Luiza

Sou a Luiza, formada em Fisioterapia há 10 anos, com pós-graduação em Fisiologia e Prescrição de
Exercícios e em Fisioterapia nas Disfunções Musculoesqueléticas. Tenho formação em Pilates
clínico e funcional, fisioterapia aquática (hidroterapia), terapia manual para coluna vertebral,
tratamento de hérnia de disco, liberação miofascial e massoterapia, além de formação contínua em
Raciocínio Clínico Avançado (RCA). Minha prática une conhecimento científico atualizado e
técnicas especializadas para oferecer atendimento individualizado, com foco na reabilitação, na
prevenção de lesões e na melhora da qualidade de vida.

### Certificações e qualificações

| Título                         | Descrição                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| Fisioterapia                   | Graduação completa com 10 anos de experiência prática no atendimento especializado.        |
| Disfunções Musculoesqueléticas | Pós-graduação focada no tratamento de problemas de coluna, articulações e musculatura.     |
| Pilates Clínico e Funcional    | Formação completa para reabilitação, prevenção de lesões e melhora da qualidade de vida.   |
| Hidroterapia e Fisiologia      | Pós-graduação em Fisiologia do Exercício e especialização em fisioterapia aquática.        |
| Terapias Manuais Avançadas     | Técnicas especializadas para coluna, hérnia de disco, liberação miofascial e massoterapia. |
| Raciocínio Clínico Avançado    | Formação contínua (RCA) para um diagnóstico preciso e um tratamento mais eficaz.           |

## Serviços

### Fisioterapia

- Avaliação detalhada para entender dores, limitações e necessidades específicas.
- Tratamentos para lesões musculoesqueléticas, hérnia de disco, dores articulares e problemas
  de postura.
- Técnicas como terapia manual e liberação miofascial, sempre com foco na recuperação funcional
  e alívio da dor.

### Pilates Clínico e Funcional

- Exercícios realizados nos equipamentos (Reformer, Cadillac, Barrel e Chair) e no solo.
- Trabalha força, flexibilidade, equilíbrio e postura.
- Indicado para reabilitação, prevenção de lesões, melhora da mobilidade e qualidade de vida,
  especialmente na terceira idade.

### Treinamento Funcional

- Exercícios que simulam movimentos do dia a dia, fortalecendo todo o corpo.
- Foco na melhora da resistência, do equilíbrio e da coordenação.
- Excelente para aumentar disposição, prevenir quedas e tornar atividades cotidianas mais
  fáceis e seguras.

### Massoterapia

- Técnicas de massagem terapêutica para relaxamento e alívio das tensões musculares.
- Auxilia na circulação sanguínea, reduz estresse e contribui para o bem-estar geral.
- Pode ser combinada com outros tratamentos para melhores resultados.

### Atendimento Médico — Dra. Veronika Baptista (CRM MG 98407)

Consultas integrativas com atendimento humanizado e tratamento integrado.

- **Ortomolecular:** otimização celular, prevenção do estresse oxidativo e reposição
  nutricional individualizada.
- **Reumatologia:** diagnóstico e manejo de doenças inflamatórias, dores articulares e
  condições autoimunes.
- **Endocrinologia:** equilíbrio hormonal, saúde metabólica e suporte ao envelhecimento
  saudável.

## Equipamentos

### Bicicleta

A bicicleta ergométrica horizontal é uma forma segura, confortável e eficiente de se exercitar,
ajudando a:

- Fortalece pernas e articulações
- Melhora a mobilidade e postura
- Cuida do coração e circulação
- Mais energia para o dia a dia

### Reformer

É um dos equipamentos mais conhecidos do pilates. Possui uma estrutura com molas, carrinho
deslizante e barras que permitem centenas de variações de exercícios.

- Trabalha o corpo todo em diferentes posições (deitado, sentado, em pé)
- Proporciona fortalecimento muscular com baixo impacto
- Ajuda na reabilitação e no ganho de mobilidade
- Permite ajustar a resistência conforme a necessidade de cada aluno/paciente

### Cadillac

Também chamado de "trapézio", é uma grande estrutura com barras e molas.

- Excelente para alongamentos, fortalecimentos e mobilidade
- Oferece suporte e segurança para idosos ou pessoas em reabilitação
- Permite exercícios avançados e desafiadores para praticantes experientes
- Trabalha muito a estabilidade e o controle postural

### Barrel

Conhecido como "barril", é usado principalmente para alongamentos e exercícios de flexibilidade.

- Alongamento profundo da coluna e cadeia posterior
- Melhora da postura e da consciência corporal
- Fortalecimento do core e mobilidade de quadril e ombros
- Muito utilizado para liberar tensões musculares

### Chair

Uma espécie de cadeira com pedais e molas reguláveis, bastante versátil.

- Fortalecimento intenso, especialmente de pernas e glúteos
- Melhora o equilíbrio e a coordenação motora
- Excelente para treinos de força em pouco espaço
- Pode ser adaptada tanto para iniciantes quanto para exercícios avançados

## Metodologia

1. **Avaliação Inicial** — Análise completa do histórico médico, avaliação postural, testes de
   força, flexibilidade e equilíbrio para entender suas necessidades específicas.
2. **Plano Personalizado** — Desenvolvimento de um programa individual baseado em seus
   objetivos, limitações e preferências. Cada exercício é escolhido especialmente para você.
3. **Acompanhamento Próximo** — Supervisão constante durante os exercícios, ajustes conforme
   sua evolução e orientações para atividades em casa.
4. **Reavaliação Contínua** — Monitoramento regular dos progressos com ajustes no plano de
   tratamento para garantir resultados otimizados e duradouros.

**Compromisso com a excelência:** nossa abordagem combina técnica científica com cuidado humano,
garantindo que cada sessão seja produtiva e agradável.

## Para quem o pilates é indicado

| Público                         | Complemento (versão da Emergent)             |
| ------------------------------- | -------------------------------------------- |
| Idosos                          | Equilíbrio, mobilidade e prevenção de quedas |
| Adultos em geral                | Alívio de dores, postura e qualidade de vida |
| Gestantes                       | Preparo pélvico, conforto e segurança        |
| Pessoas em reabilitação         | Pós-operatório, hérnias e lesões             |
| Atletas                         | Performance e prevenção de lesões            |
| Praticantes de atividade física | —                                            |

## Textos que só existem na versão da Emergent

- Título do hero: "Saúde, movimento e bem-estar em um só espaço"
- Subtítulo: "Cuide da sua saúde com a atenção e o acolhimento que você merece. Fisioterapia,
  Pilates Clínico, Treinamento Funcional, Massoterapia e Atendimento Médico — com
  acompanhamento próximo e humanizado."
- Números: 10+ anos de experiência · 5 aparelhos de pilates · 1:1 atendimento individual
- Chamada final: "Priorize o que realmente importa: Você! Agende sua consulta ou aula
  experimental e sinta a diferença de um cuidado verdadeiramente individualizado."
- Rodapé: "Movimento consciente, reabilitação especializada e cuidado integrado."
- Seção de aparelhos: nome "Nosso studio" e frase de destaque "Aparelhos de alta precisão para o
  seu treino" (escolhidos no lugar do título "Equipamentos" da `main`).
- Rótulos dos aparelhos: Reformer "O clássico do Pilates", Cadillac "Reabilitação completa",
  Barrel "Flexibilidade & coluna", Chair "Equilíbrio & controle", Bicicleta "Força & resistência".
