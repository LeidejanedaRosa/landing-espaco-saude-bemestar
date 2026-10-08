# Luiza — Espaço Saúde e Bem-estar

Landing page de uma página para o studio de pilates clínico e fisioterapia da Luiza.
Este arquivo complementa o `~/.claude/CLAUDE.md` global: aqui só entra o que é específico
deste projeto. Onde houver conflito, vale este.

- **Tier 1** · React 19 · Vite 8 · TypeScript 6 · Tailwind CSS 4
- Estrutura: `src/pages` (páginas) · `src/components` (seções) · `src/shared/ui` (design system)
- Textos da landing: [docs/conteudo.md](docs/conteudo.md) — não inventar texto. **Os textos da
  landing antiga (branch `main`) foram aprovados pela cliente e têm prioridade**; os da versão
  da Emergent só entram onde a `main` não tem texto, e ficam marcados para revisão
- Decisões: [docs/decisoes/](docs/decisoes/) · Backlog: [docs/backlog.md](docs/backlog.md)

## Fluxo de trabalho

- **`feat/landing` é a branch guarda-chuva do projeto.** Toda branch nasce dela e volta para
  ela por pull request. Ela só entra na `main` quando a landing estiver pronta, porque a
  Vercel publica a `main`.

  ```
  main ─────────────────────────────────────────────► (só no final)
    └─ feat/landing ──●────────●────────●──────────►
                      ├─ feat/landing-hero ──PR──┘
                      ├─ fix/...  ───────────PR──┘
                      └─ docs/... ───────────PR──┘
  ```

- **A branch padrão do GitHub é a `feat/landing`, temporariamente**
  ([decisão 0007](docs/decisoes/0007-branch-padrao-temporaria.md)), para Dependabot, CodeQL,
  CodeRabbit e o template de PR analisarem o código novo. Volta para a `main` na entrega.
- **Cada implementação em uma branch própria** (uma seção, um componente do design system,
  uma correção, um documento).
- Nome de sub-branch com hífen (`feat/landing-hero`), nunca `feat/landing/hero`: o git não
  permite uma branch `feat/landing` e outra dentro de `feat/landing/` ao mesmo tempo.
- **Plano de commits** — quando solicitado, usar este formato (substitui o do global):

  ```
  1. feat(layout): add page container
  git add src/shared/ui/Container.tsx

  2. test(layout): cover page container
  git add src/shared/ui/Container.test.tsx
  ```

  Número + mensagem (semântica, curta, em inglês) e, na linha de baixo, o `git add` com os
  arquivos exatos daquele commit. Nada é commitado antes da aprovação do plano.

### Pull requests

Cada sub-branch entra na `feat/landing` por PR, nunca por merge local.

1. Plano de commits aprovado → commits → `git push -u origin <branch>` (o `-u` só na primeira
   vez; sem ele o push de uma branch nova falha com "no upstream branch").
2. O PR é aberto pelo terminal, com `gh pr create --base feat/landing`, já com o título e o
   template preenchidos. Não usar o botão "Compare & pull request" do GitHub: ele sugere a
   `main` como destino e abre o formulário vazio, porque o GitHub só carrega o template de PR
   que está na branch padrão.
3. **Título** em minúsculas, `tipo: assunto` (ex.: `feat: theme`). **Descrição:** o template
   de `.github/pull_request_template.md` inteiro; seção que não se aplica fica com `N/A`.
4. Só marcar no template o que foi de fato verificado. Mudança visual pede captura de tela,
   tirada do preview que a Vercel publica no próprio PR.
5. Merge só com o CI verde, pelo GitHub, com **"Create a merge commit"** (nunca squash nem
   rebase: os commits da branch continuam visíveis no histórico).
6. Depois do merge: `git switch feat/landing && git pull`, e só então criar a próxima branch.

A `main` e a `feat/landing` são protegidas por ruleset: sem push direto, merge só por PR,
só por merge commit e só com os quatro jobs do CI e a Vercel em verde. Job novo ou renomeado
no CI exige rodar de novo o script `setup-github.mjs` do `react-vite-template`.

O SonarCloud roda dentro do job "Lint, tipos, testes e build" e reprova o CI se o quality gate
falhar. Sem o segredo `SONAR_TOKEN`, a análise é pulada.

O CI roda em todo `pull_request` e em `push` na `main` e na `feat/landing`. Push em sub-branch
sem PR aberto não dispara CI; nesse momento a verificação é a do hook local de pre-push.

## Layout

### Container

Toda seção usa o mesmo `Container` (`src/shared/ui`). Nenhuma seção define largura própria.

```
┌──────────────────────── viewport (qualquer largura) ────────────────────────┐
│ <section>  fundo e imagem decorativa: 100% da largura, sempre               │
│        ┌──────────── Container: max 80rem (1280px), mx-auto ───────────┐    │
│        │  conteúdo                                                     │    │
│        └───────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Largura máxima de 1280px, centralizada** (`mx-auto`). Escrita como `80rem` em um token do
  tema do Tailwind, para acompanhar o tamanho de fonte que a pessoa configurou no navegador.
  Assim, numa tela de 1440px o conteúdo já fica centralizado, com margens laterais; é nessas
  margens que entram as folhagens (e, depois, os desenhos em traço).
- **O fundo nunca fica preso ao Container.** Quem carrega fundo é o elemento de fora
  (`<section>`, `<header>`, `<footer>`), com largura total; o Container fica dentro e limita só
  o conteúdo. Em telas maiores que 1280px o fundo continua indo de borda a borda.
- **Sem valores fixos.** Nada de `px` em largura, altura, espaçamento ou tamanho de fonte. Usar
  `rem`, `%`, `fr`, `dvh`, `clamp()`, `min()`/`max()` e `aspect-ratio`. Exceção: detalhes de
  1px, como bordas.
- Espaçamento lateral do Container é fluido (cresce com a tela), nunca um número fixo.
- No código: `<Container>` aplica `max-w-page` (token `--container-page: 80rem`) e `px-gutter`
  (token `--spacing-gutter: clamp(1rem, 5vw, 4rem)`). Classes extras (`flex`, `grid`...) entram
  por `className`; largura e respiro lateral nunca são sobrescritos por quem usa.
- Mobile first: o estilo base é o do celular; breakpoints só acrescentam.

### Fundo da página

- **Uma única cor de fundo para a página inteira**, em degradê vertical: a cor mais clara no
  topo, a mais escura no footer. Fica no elemento raiz da página, não nas seções.
- **Seções têm fundo transparente** e não definem `background-color`.
- **Exceção: o header.** Ele fica fixo no topo e passa por cima do conteúdo, então precisa de
  fundo próprio para o texto continuar legível (`cream` quase opaco, a cor do topo do degradê).
- No código: o degradê vive só em `PageBackground` (`src/shared/ui`), usado pela página e
  pela tela de erro. Não repetir as classes do degradê em outro lugar.
- Como o fundo escurece ao longo da página, conferir o contraste do texto (WCAG AA, 4.5:1) em
  cada seção, principalmente nas últimas e no footer.

### Papel de parede: bonecas em traço e folhagens

A página inteira tem um papel de parede discreto com as bonecas em traço e as folhagens, no
espírito do fundo ilustrado do projeto `portfolio`. É onde a identidade da recepção aparece em
todas as seções, e é para "abusar": o efeito é mais forte nas telas grandes.

- Vive em `PageBackground` (`src/shared/ui`), junto do degradê: um único fundo para a página,
  nenhuma seção define o seu.
- É um mosaico: o arquivo `src/assets/fundos/bonecas-folhagens.svg` se repete em toda a página,
  sempre no mesmo tamanho (`110rem` de largura), em qualquer tela.
- **Poucas figuras, grandes e bem visíveis**, e não muitas pequenas: a referência é o fundo do
  `portfolio`, com ilustrações em escala grande. Miúdo e repetido, vira estampa de papel de
  presente.
- **Aparece inteiro nas margens laterais e quase some atrás do conteúdo** (máscara em
  `PageBackground`), para não disputar com o texto. Como o conteúdo tem no máximo 80rem, as
  margens só existem em telas mais largas que isso.
- **Exceção à regra de usar `<img>`:** aqui é `background-image`. É um arquivo só, pequeno
  (cerca de 12 KB comprimido), repetido; não há o que adiar, e `<img>` não repete.
- O mosaico é montado a partir dos SVGs de `src/assets/tracos/`. Boneca nova entra no
  mosaico regerando o arquivo; nenhum elemento pode cruzar a borda, senão a emenda aparece.
- Desenho decorativo avulso, fora do mosaico (como as folhagens grandes dos cantos do hero),
  usa `DecorativeImage`, com `pointer-events-none`, atrás do conteúdo.

## Seções

Toda seção depois do hero usa a casca `Section` e o cabeçalho `SectionHeading` (`src/shared/ui`):

```tsx
<Section id="servicos" labelledBy="servicos-titulo" fullScreen>
  <SectionHeading id="servicos-titulo" eyebrow="Serviços" title="O que Luiza Espaço..." />
  {/* conteúdo */}
</Section>
```

- **O respiro vertical é o mesmo em toda seção** e vem do token `--spacing-section`
  (`py-section`), dentro de `Section`. Nenhuma seção define `py` próprio; para mudar, muda-se o
  token. Ele encolhe em telas baixas, para o conteúdo caber.
- O `id` da seção é o destino do link do menu; `labelledBy` é o `id` do título.
- `fullScreen` faz a seção ocupar a tela menos o header, com o conteúdo centralizado. Usar
  quando o conteúdo é interativo e cabe em uma tela (abas, carrossel).
- **Cabeçalho de seção: o nome da seção (rótulo pequeno, em maiúsculas) e uma frase de
  destaque (`h2`).** Só isso; sem parágrafo de apoio.
  Fica centralizado acima do conteúdo; quando a seção é um cartão único com foto, vai dentro
  do cartão, alinhado à esquerda (`align="start"`).
- **Todo título de seção tem um trecho em destaque**, na fonte manuscrita e em rosa vivo, como a
  frase do hero: é a prop `highlight` do `SectionHeading`. Uma palavra ou expressão curta por
  título, a que carrega a promessa da seção, de preferência no fim da linha. Não muda o texto
  (o leitor de tela lê o título normalmente) e não vai em parágrafo nem em cartão.
- **Seções vizinhas não repetem o mesmo arranjo.** Duas grades de cartões iguais em sequência
  deixam a página monótona e a pessoa não percebe que mudou de assunto.
- Os dados de uma seção com vários itens ficam em um arquivo próprio ao lado do componente
  (ex.: `servicesList.ts`), com os textos de `docs/conteudo.md`; o componente só monta.
- **Texto corrido em lista ganha destaque no começo de cada item** (`lead` em negrito), sem
  mudar nenhuma palavra do texto aprovado. É o que permite ler batendo o olho.

### Abas (Serviços)

O que o studio vende fica em abas, e não em carrossel: os cinco nomes aparecem de uma vez, e a
pessoa escolhe. Carrossel esconde o que não é o primeiro item.

- Comportamento no hook `useTabs` (`src/shared/hooks`), que segue o padrão "Tabs" da WAI-ARIA:
  só a aba ativa entra na ordem do Tab; setas, Home e End trocam de aba levando o foco.
- **Todos os painéis ficam no HTML e ocupam a mesma célula de uma grade**, um sobre o outro. O
  inativo recebe `inert` (sai do teclado e do leitor de tela) e `inert:invisible` (some da
  vista), mas continua ocupando espaço. Três efeitos: buscadores leem todo o conteúdo; **o
  cartão tem a altura do maior painel e não muda ao trocar de aba**; e as ilustrações são
  baixadas quando a seção se aproxima da tela, antes do clique.
- Não usar `hidden` nem `display: none` no painel inativo: ele deixa de ocupar espaço (a altura
  volta a variar) e a imagem só é pedida no clique, com atraso visível.
- **A seção inteira cabe na tela em notebook e desktop, do rótulo à frase final.** A área da
  ilustração não tem altura própria (acompanha a do texto), e fontes e espaços do cartão
  encolhem com a altura da tela (`clamp()` com `dvh`).
- Painel na horizontal: ilustração à esquerda, texto e botão à direita; no celular, ilustração
  em cima. Cada serviço tem o próprio botão, com a mensagem do WhatsApp dizendo qual é.
- O botão do serviço fica centralizado na coluna do texto e afastado dele: é o passo seguinte
  à leitura, não parte dela. É **vazado** (`variant="secondary"`), para não pesar mais que o
  texto nem se confundir com a aba ativa; botão cheio fica para a aba selecionada e para o
  "Agendar" do topo.
- **As cinco abas ficam sempre à vista:** quando não cabem em uma linha (celular), quebram em
  mais linhas, centralizadas. Fileira deslizante esconde as últimas sem avisar que existem.
- **A ilustração não fica em painel branco.** Ela se apoia em três formas orgânicas, como as dos
  adesivos da fachada: duas coloridas (`teal`, `gold` e `rose`, em rodízio por serviço) e, por
  cima, uma clara. A imagem usa `mix-blend-multiply`, que faz o fundo branco de algumas
  ilustrações sumir sem recortar o arquivo.
- Movimento só em resposta a uma ação: ao abrir a aba, o cartão sobe de leve e as formas
  crescem, em menos de meio segundo, com a ilustração já inteira (revelada aos poucos, ela
  parecia imagem demorando para carregar); ao passar o mouse, a ilustração amplia (`group-hover:scale-130`) e as formas mudam
  de contorno. A área da ilustração não usa `overflow-hidden` (a figura ampliada aparece
  inteira) nem `z-index` (ele isolaria o `mix-blend-multiply` e o branco voltaria). **Nada fica animado sem parar:** movimento contínuo distrai e exigiria um botão
  de pausa (WCAG 2.2.2). Tudo respeita `motion-safe`/`motion-reduce`.
- Ao reativar um painel, a animação recomeça porque `inert:animate-none` a desliga enquanto ele
  está inativo.

### Carrossel (Studio)

Os aparelhos ficam em carrossel, um por vez: são para conhecer, não para escolher (para
escolher, abas). É o `Carousel` (`src/shared/ui`) com o hook `useCarousel` (`src/shared/hooks`).

- **Rolagem nativa com `scroll-snap`, sem biblioteca.** Arrastar com o dedo, roda do mouse e
  setas do teclado funcionam sem JavaScript; o hook só acompanha qual slide está à vista e leva
  a rolagem até outro quando um botão pede.
- **Sem troca automática.** Conteúdo que anda sozinho tira o controle de quem lê e exigiria
  botão de pausa (WCAG 2.2.2).
- Segue o padrão "Carousel" da WAI-ARIA: o conjunto e cada slide se apresentam ao leitor de tela
  (`aria-roledescription`), cada slide diz o nome e a posição ("Reformer, 2 de 5") e um aviso
  (`aria-live`) anuncia o slide que entrou. Todos os slides ficam no HTML.
- **Setas e marcadores vêm antes dos slides**, logo abaixo do título: no celular o cartão é mais
  alto que a tela, e embaixo dele ninguém os encontraria.
- Nas pontas a seta usa `aria-disabled`, e não `disabled`: botão desabilitado perde o foco e
  joga quem navega pelo teclado para fora do carrossel.
- A área que rola tem `tabIndex={0}` (é a única exceção à regra de lint, comentada no código):
  sem foco, o axe reprova e o teclado não desliza em navegador que não foca áreas de rolagem.
- Todos os slides têm a altura do maior, então a página não pula ao trocar. No desktop a seção
  inteira cabe na tela (`fullScreen`).
- **O desenho fica em uma "folha de caderno"**: papel colorido levemente inclinado, com sombra
  e um pedaço de fita no topo. Papel e fita mudam por aparelho (`gold`, `teal` e `rose`, em
  rodízio). Nada de painel branco: ele apaga a seção.
- A imagem usa `mix-blend-multiply` (o fundo branco do arquivo vira a cor do papel, como
  grafite em papel colorido) e `contrast-125` (leva a branco o fundo acinzentado de alguns
  arquivos, que apareceria como um retângulo). A folha é opaca, então a mistura fica nela.
- Ao passar o mouse a folha se endireita e vem para a frente (`group-hover:scale-110`). Quem
  amplia é a folha inteira, e não o desenho dentro dela, que seria cortado nas bordas; nada se
  mexe para quem pediu redução de movimento.
- **Os arquivos dos aparelhos são aparados rente ao desenho** (cerca de 3% de margem). Com
  margens brancas diferentes, uns apareciam bem menores que os outros na mesma folha.
- Lista de itens marcados, aqui e em Serviços, é o `CheckList` (`src/shared/ui`).

### Conteúdo surgindo ao rolar

Toda seção depois do hero surge de leve ao entrar na tela. É a classe `reveal-on-scroll`
(`src/styles/main.css`), aplicada dentro de `Section`; nenhuma seção precisa pedir.

- **É CSS puro, ligado à rolagem** (`animation-timeline: view()`), sem JavaScript: o HTML do
  build continua completo e, onde o navegador não tem o recurso, o conteúdo já está na tela.
- Só com `prefers-reduced-motion: no-preference`.
- **`animation-fill-mode: backwards`, nunca `both`:** passada a entrada, nada fica aplicado. Com
  `both`, a seção ficaria isolada para sempre e o `mix-blend-multiply` das ilustrações de
  serviço voltaria a mostrar o fundo branco.
- Antes de surgir, o conteúdo fica deslocado para baixo. Por isso `Section` usa
  `overflow-clip`: sem o recorte, a última seção aumentaria a altura da página e apareceria uma
  faixa sem fundo no fim.
- O efeito termina quando a seção entrou 25% na tela, antes de a ilustração do serviço
  aparecer. Mudar esse limite exige conferir a aba Pilates.

### Quem é a principal: a Luiza

A Luiza é a figura principal da página. O espaço é dela, e a Dra. Veronika atende dentro dele.
Na versão de referência (Emergent) a seção da médica vinha em um bloco verde-escuro, o elemento
mais forte da página, e chamava mais atenção que a da Luiza. Aqui é o contrário.

- **O destaque mais forte da página é da Luiza: o bloco verde-oliva.** É o único bloco escuro
  no meio da página, com a foto maior e o botão cheio. Nenhuma outra seção usa bloco escuro.
- **Atendimento médico é complementar, e não escondido:** tem foto e é bem acabado, mas em
  cartão claro, com foto menor que a da Luiza e botão vazado.
- Em qualquer lugar onde as duas apareçam juntas (menu, abas de Serviços, footer), a Luiza e os
  serviços dela vêm primeiro.

### Sobre a Luiza

- **Bloco `olive-deep` com texto claro**, que reúne o rótulo e o título da seção, a foto em
  moldura orgânica, a apresentação em primeira pessoa, o nome com o registro e o botão. As seis
  certificações ficam fora dele, em grade, no fundo claro: com tudo dentro, o bloco viraria uma
  parede verde de mais de uma tela.
- Não é carrossel nem abas: aqui a pessoa só lê, e a seção pode ser mais alta que a tela.
- No HTML a ordem é título, foto, apresentação. No desktop a foto vai para a coluna da esquerda
  só pela posição na grade.
- **Sobre fundo escuro as cores mudam:** `SectionHeading` com `tone="dark"` (rótulo em `blush`,
  destaque em `rose-soft`) e `ButtonLink` com `variant="light"` (creme, com contorno de foco
  claro). O botão verde e os rosas escuros somem sobre o `olive-deep`.
- As seis certificações ficam em `aboutCredentials.ts`. São seis, então a grade (1, 2 ou 3
  colunas) nunca tem linha incompleta; mudando a quantidade, rever as colunas.
- A frase de destaque (`h2`) é um trecho da própria apresentação dela.

### Atendimento médico

- Um cartão claro que reúne tudo, inclusive o rótulo e o título da seção (`SectionHeading` com
  `align="start"`): foto da médica à esquerda, com um crachá branco sobreposto à base (nome em
  destaque e o CRM em um selo rosa-escuro com texto claro); à direita, título, as três especialidades em cartões pequenos com ícone e um
  botão vazado.
- **A seção cabe inteira em uma tela, sem rolar** (`fullScreen`), do notebook de 1280×600 ao
  celular de 390×664. A foto encolhe com a altura da tela, e no celular ela vira uma miniatura
  ao lado do nome, com as especialidades em lista compacta. Em celular menor que isso o texto
  não cabe sem ficar ilegível, e a seção passa um pouco da tela em vez de cortar conteúdo.
- No HTML a ordem é título, foto e nome, especialidades, botão. No desktop a foto vai para a
  coluna da esquerda só pela posição na grade.
- Folhagens (`ramo-verde` e `ramo-rosa`) saem de trás do cartão em cantos opostos, e um ramo
  bem claro fica por dentro, no canto, como marca-d'água. Sob o título, um divisor fino com um
  pequeno losango dourado, como nos posts da cliente.
- É a aplicação da regra acima; um teste e2e confere que a foto é menor que a da Luiza e que a
  seção é mais baixa.
- As especialidades são uma lista de definições (`<dl>`): o nome é o termo, a descrição é o que
  ela trata. Ficam em `medicalSpecialties.ts`. **Um grupo de `<dl>` só aceita `<dt>` e `<dd>`:**
  o ícone vai dentro do `<dt>`, e não solto ao lado.
- Ícone de linha decorativo, aqui e nas certificações da Luiza, é o `LineIcon` (`src/shared/ui`).

### Metodologia

- Ilustração à esquerda e as quatro etapas à direita, em cartões numerados (2 × 2), com o
  compromisso do espaço fechando a seção. Cabe em uma tela em notebook, desktop e tablet
  (`fullScreen`); no celular as quatro etapas, com o texto aprovado, não cabem, e a seção cresce.
- As etapas são uma lista ordenada (`<ol>`): a ordem importa. O número grande em manuscrita é
  só enfeite (`aria-hidden`), porque a lista já informa a posição. Ficam em `methodologySteps.ts`.
- A ilustração usa `mix-blend-multiply` e uma máscara que esfuma a borda: o fundo do arquivo
  não é branco puro até o limite.
- O título ("Técnica científica com cuidado humano") é um trecho do compromisso aprovado.

### Para quem o pilates é indicado

- Seis medalhões: ícone de linha dentro de um círculo, com o nome do público embaixo. É uma
  seção curta, de respiro entre duas mais densas; não é tela cheia.
- São seis, em 2, 3 ou 6 colunas, sempre sem linha incompleta. Ficam em `audienceList.ts`.
- Só os nomes aparecem (aprovados na landing antiga). Os complementos de cada público vieram da
  versão de referência e só entram com a aprovação da cliente.
- Não tem item no menu: o `id` é `para-quem`, para um link futuro.

### Contato

- Fecho da página: um cartão claro com a chamada final e os botões à esquerda e, à direita, os
  três meios de contato (endereço, WhatsApp e Instagram). Cabe em uma tela em notebook, desktop
  e tablet (`fullScreen`); no celular cresce um pouco.
- **Sem formulário e sem mapa embutido.** O botão principal abre o WhatsApp; "Ver no mapa" abre
  o Google Maps em nova aba. Mapa embutido carregaria script de terceiros na página inteira.
- O endereço fica em `contactInfo.ts` (dado público, igual em qualquer ambiente). WhatsApp e
  Instagram continuam vindo das variáveis de ambiente; `formatWhatsAppNumber` e
  `instagramHandle` só os deixam legíveis.
- Os meios de contato são uma lista de definições (`<dl>`); o endereço usa `<address>`.

## Navegação

- Os links do menu vivem em `NAV_ITEMS` (`src/components/navigation.ts`). **Seção nova entra
  com o `id` igual ao `href` do seu item**; sem isso o link do menu não leva a lugar nenhum.
- Os destinos ainda não construídos estão declarados em `PENDING_SECTIONS`
  (`e2e/navigation.spec.ts`). **Ao construir uma seção, tirar o destino dela dessa lista**; o
  teste falha se ficar. Link interno novo para um destino que não existe também falha.
- O header é fixo no topo (`sticky`) e a altura dele é o token `--spacing-header`
  (`src/styles/main.css`), usado em três lugares: no próprio header (`h-header`), na folga de
  rolagem (`scroll-padding-top`) e nas seções de tela cheia. Mudou a altura, muda só o token.
- **Seção de tela cheia nunca passa do viewport:** a altura é a da tela menos o header,
  `min-h-[calc(100dvh-var(--spacing-header))]`. É `min-h`, e não `h`, para o conteúdo não ser
  cortado quando não cabe. A regra de caber na tela vale para desktop e notebook; no celular a
  seção pode crescer.
- **Testar altura com a área útil do navegador, não com a resolução do monitor.** Um notebook
  de 1366×768 sobra com cerca de 625px depois das barras do navegador. Para caber nessas
  telas, fontes e espaços da seção de tela cheia encolhem com a altura (`clamp()` com `dvh`).
  Os tamanhos cobertos pelo e2e estão em `e2e/hero.spec.ts`; seção nova de tela cheia segue a
  mesma lista.
- Botão com aparência de botão que leva a outro lugar é `ButtonLink` (`src/shared/ui`); com
  `external`, ele abre em nova aba, protege com `rel` e avisa o leitor de tela.
  Três variantes: `primary` (cheio, verde), `secondary` (vazado) e `light` (cheio, creme, para
  fundo escuro).
- Abrir e fechar (menu, sanfona) usa o hook `useDisclosure` (`src/shared/hooks`), que já
  trata a tecla Esc.

## Imagens

| Tipo                                | Formato servido                          |
| ----------------------------------- | ---------------------------------------- |
| Desenhos em traço, logo, ícones     | SVG                                      |
| Fotos e ilustrações com muitos tons | AVIF, com WebP de reserva (`<picture>`)  |
| PNG e JPEG                          | só como arquivo original, nunca servidos |

- **No código, foto e ilustração sempre passam pelo componente `Picture`** (`src/shared/ui`),
  nunca por `<img>` solta. O original é importado com a query do `vite-imagetools`, que gera
  os arquivos no build ([decisão 0006](docs/decisoes/0006-tratamento-de-imagens-no-build.md)):

  ```tsx
  import foto from '../../design/originais/foto.png?w=480;960&format=avif;webp&as=picture';

  <Picture image={foto} alt="Descrição da foto" sizes="(min-width: 64rem) 50vw, 100vw" />;
  ```

  `w=` lista as larguras geradas (nunca maiores que o original); `sizes` diz quanto da tela a
  imagem ocupa. Para a imagem principal da primeira tela, acrescentar a prop `priority`.

- **Carregamento lento:** toda imagem fora da primeira tela usa `loading="lazy"` e
  `decoding="async"`.
- **Exceção — a imagem principal do hero:** `loading="eager"` e `fetchpriority="high"`. Ela é o
  maior elemento da primeira tela (LCP); adiá-la piora a nota de performance.
- **Toda `<img>` declara `width` e `height`** (ou `aspect-ratio`), para o navegador reservar o
  espaço antes de a imagem chegar e a página não "pular" (CLS).
- Fotos em mais de um tamanho (`srcset` + `sizes`): o celular não baixa a versão de desktop.
- `alt` descritivo em imagem de conteúdo; `alt=""` em imagem decorativa.
- Imagens novas são geradas por IA a partir de prompts. Cada pedido de prompt vem com a
  especificação exata: proporção, dimensões, fundo, formato de entrega e onde será usada.
- Nomes de arquivo em kebab-case, descritivos, sem espaços nem acentos.
- Arquivos originais (PNG gerados, antes de tratar) ficam em `design/originais/`, fora de
  `src`, para o build não os publicar. Só a versão tratada (SVG, AVIF, WebP) entra em
  `src/assets`.
- **Desenho em traço e folhagem entram pelo componente `DecorativeImage`** (`src/shared/ui`), a
  partir de um SVG em `src/assets/tracos/` ou `src/assets/folhagens/`. Ele já sai decorativo
  (`alt=""`, `aria-hidden`) e com carregamento lento; na primeira tela, usar `priority`.
- **Folhagens:** `ramo-verde.svg` e `ramo-rosa.svg`, nas cores `teal` e `rose`. Ficam nos cantos
  da seção, semitransparentes, atrás do conteúdo e parcialmente para fora da tela (a seção usa
  `overflow-hidden`). São dois arquivos porque SVG em `<img>` não muda de cor por CSS.
- **Como um PNG de traço vira SVG:** o original (traço preto, fundo branco) fica em
  `design/originais/`; a vetorização é feita com `potrace`, e o resultado passa pelo `svgo`
  (`--precision 0 --multipass`), que derruba o arquivo para cerca de um décimo. O `potrace` do
  npm traz dependências com vulnerabilidades, então é usado fora do projeto e não entra no
  `package.json`. A cor do traço é definida no próprio SVG (`rose`, o rosa claro, nas
  bonecas do hero: desenho é decorativo e não tem exigência de contraste de texto).
- Prompts e especificações dos desenhos em traço:
  [docs/identidade/prompts-desenhos.md](docs/identidade/prompts-desenhos.md).

## Resiliência

- **`ErrorBoundary` na raiz do app.** Se um componente quebrar, a pessoa vê uma mensagem
  amigável com o link do WhatsApp, e não uma tela em branco.
- Um Error Boundary não captura erro em handler de evento nem em código assíncrono; esses
  casos são tratados onde acontecem.
- No código: `ErrorBoundary` (`src/shared/ui`) é genérico e recebe a tela de erro pela prop
  `fallback`; a tela em si é `ErrorFallback` (`src/components`). Durante o build o Error
  Boundary não atua: erro na renderização quebra o `npm run build`, o que é o desejado.

## Contato

- **Não há formulário.** Toda chamada para ação leva ao WhatsApp
  (`https://wa.me/<número>?text=<mensagem>`), com mensagem já preenchida conforme o contexto
  do botão (avaliação, consulta médica, dúvida).
- Número e links vêm de variável de ambiente (`.env.example`), nunca escritos no código.
- Todo link de WhatsApp é montado por `buildWhatsAppUrl(mensagem)`, em
  `src/shared/utils/whatsapp.ts`. Não montar a URL à mão em componente.
- **Sem as variáveis obrigatórias, `dev` e `build` falham de propósito**
  ([decisão 0005](docs/decisoes/0005-variaveis-de-ambiente-obrigatorias.md)). Em teste
  unitário, definir a variável com `vi.stubEnv`.
- Links externos abrem em nova aba com `rel="noopener noreferrer"`.

## Identidade visual

- A paleta é a da cliente: Instagram [@lufisio.pilates](https://www.instagram.com/lufisio.pilates/),
  logo (`src/assets/images/logo-espaco.png`) e os prints de referência.
- **Paleta escolhida: opção C** de [docs/identidade/paleta-opcoes.png](docs/identidade/paleta-opcoes.png)
  — base rosa e oliva do post da Dra. Veronika, com o verde-água do logo como apoio. Não usar a
  paleta da versão da Emergent.

  | Token        | Valor     | Uso                                                                                     |
  | ------------ | --------- | --------------------------------------------------------------------------------------- |
  | `cream`      | `#F9EDE6` | topo do degradê da página                                                               |
  | `blush`      | `#F2D5CD` | meio do degradê, cartões                                                                |
  | `rose`       | `#CB847C` | decorativo: selos, ícones, detalhes (não usar em texto)                                 |
  | `rose-deep`  | `#9A4F4A` | títulos de destaque, links, texto em rosa (sobre `blush`: só título grande)             |
  | `rose-ink`   | `#8E4944` | texto pequeno em rosa sobre `blush`: o rótulo das seções (`SectionHeading`)             |
  | `rose-vivid` | `#BE5A5F` | só texto grande: palavra em destaque dos títulos e a frase do hero (3,2:1 em `blush`)   |
  | `rose-soft`  | `#E6A9A2` | só texto grande sobre `olive-deep`: o destaque do título no bloco da Luiza (3,4:1)      |
  | `teal`       | `#688F90` | decorativo: ícones e detalhes (não usar em texto pequeno)                               |
  | `teal-deep`  | `#3F6B6C` | cor de apoio: botões secundários, texto em verde-água (sobre `blush`: só título grande) |
  | `olive`      | `#737B5B` | decorativo: blocos e ondas (texto só se for grande)                                     |
  | `olive-deep` | `#565E42` | fim do degradê (footer), blocos de destaque com texto claro                             |
  | `gold`       | `#DBB67B` | detalhe pontual (estrelas, ornamentos)                                                  |
  | `ink`        | `#3F3532` | texto corrido                                                                           |

- **Degradê da página:** `cream` no topo → `blush` → `olive-deep` no footer. No footer o texto é
  claro (`cream`).
- **Fontes:** Playfair Display nos títulos, Poppins no texto e Great
  Vibes só em palavras de destaque. As fontes são servidas pelo próprio site (pacotes
  `@fontsource`), nunca por CDN.
- Os tokens vivem no tema do Tailwind, em `src/styles/main.css`. A paleta padrão do Tailwind
  foi removida de propósito: classe de cor fora da tabela acima (ex.: `text-blue-500`) não gera
  CSS. Cor nova entra primeiro na tabela e no tema, com o contraste medido.
- Classes de fonte: `font-sans` (Poppins, padrão do `body`), `font-display` (Playfair Display,
  padrão de `h1`–`h3`) e `font-script` (Great Vibes). Peso novo de fonte exige importar o
  arquivo correspondente em `main.css`.
- Cores só por token do tema; nenhum valor hexadecimal solto em componente.
- **As cores médias da marca não servem para texto pequeno.** Medido sobre o creme `#F7EAE2`:
  rosa `#B87A74` dá 2,9:1, oliva `#737B5B` dá 3,8:1 e verde-água `#688F90` dá 3,3:1, todos
  abaixo dos 4,5:1 do WCAG AA. Texto usa as versões escuras.
  - **Rosa médio (`#B87A74` e o token `rose`, 2,5:1) nunca em texto, nem em título grande:**
    fica abaixo até dos 3:1 exigidos para texto grande. Só em elementos decorativos sem texto.
    Título em rosa usa `rose-deep` (5,0:1).
  - **Oliva e verde-água médios** passam dos 3:1: podem ir em título grande (a partir de 1,5rem,
    ou 1,17rem em negrito), nunca em texto corrido.
  - **Sobre `blush` (cartões e meio da página), `rose-deep` dá 4,2:1 e `teal-deep` dá 4,3:1:**
    abaixo dos 4,5:1. Ali eles só servem para título grande; texto de tamanho normal e links
    usam `ink` (8,6:1). Sobre `cream` os dois passam (5,1:1 e 5,2:1) e seguem valendo para texto.
  - **A palavra em destaque dos títulos usa `rose-vivid`**, mais claro e vivo: passa nos 3:1 de
    texto grande (3,2:1 sobre `blush`, 3,8:1 sobre `cream`) e nunca vai em texto pequeno. Com o
    `rose-deep` os destaques ficavam escuros e a página perdia vida.
  - **Texto pequeno em rosa sobre `blush` usa `rose-ink`** (4,8:1), o `rose-deep` 8% mais escuro.
    É a cor do rótulo de todas as seções, para ele ser igual do topo ao fim da página.
  - **A passagem de `blush` para `olive-deep` não pode ter texto em cima.** No meio dessa faixa
    nem `ink` nem `cream` chegam a 4,5:1. A transição fica concentrada num trecho curto e sem
    texto logo antes do footer.

### De onde vem cada ilustração

Cada família de desenho remete a um lugar físico do studio e tem um papel só no site:

| Onde a cliente usa        | Família                              | Papel no site                       |
| ------------------------- | ------------------------------------ | ----------------------------------- |
| parede da recepção        | bonecas em traço contínuo            | hero e papel de parede              |
| aparelhos                 | desenhos a lápis                     | seção Studio                        |
| fachada (portas de vidro) | bonecas coloridas, em cores chapadas | seção Serviços                      |
| posts recentes            | rosa, oliva, creme e folhagens       | cores, fontes e folhagens da página |

- Não misturar famílias na mesma seção.
- **As bonecas coloridas mantêm as cores da fachada** (verde-água, laranja, rosa, azul-marinho):
  quem passa em frente ao studio precisa reconhecer no site o que viu na porta. Não recolorir
  com a paleta do site.
- Prompts das ilustrações de serviço que faltam:
  [docs/identidade/prompts-ilustracoes-servicos.md](docs/identidade/prompts-ilustracoes-servicos.md).

### Estilo observado nos posts da cliente

- Fundo creme rosado, cartões em rosa claro, blocos de destaque em verde-oliva com texto claro.
- Cantos bem arredondados, ícones de linha dentro de círculos, ondas suaves no rodapé.
- Folhagens em aquarela discreta nos cantos; divisores finos com um pequeno ornamento central.
- Tipografia em três papéis: serifada elegante de alto contraste nos títulos, sem serifa limpa
  no texto, e manuscrita só em palavras de destaque (nunca em parágrafo).

### A parede da recepção no hero

O hero reproduz a parede da recepção do studio: "Acredite!" na primeira linha e "O movimento
cura" na segunda, começando embaixo do "!". A frase é texto, em `font-script` e `rose-vivid`. O recuo da
segunda linha é `2.57em`, a largura de "Acredite" nessa fonte; trocar a fonte exige medir de novo.

Há dois desenhos, e o navegador baixa só o que a tela usa (`DecorativeImage` com `alternate`):

| Tela                                | Desenho                               | Arranjo                                                                                           |
| ----------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| celular e tablet em pé (até 1023px) | `trio.svg`: três bonecas lado a lado  | faixa no topo, antes do título; frase no canto superior esquerdo, sobre o espaço vazio do desenho |
| tablet deitado e desktop (1024px+)  | `guerreira.svg`: a boneca da recepção | coluna da direita; frase ancorada, terminando rente ao braço erguido                              |

- **A frase nunca tem tamanho próprio:** é sempre uma fração do desenho (da largura da faixa,
  em `cqw`, ou da altura da boneca, `--art-h`). Quando eram independentes, numa janela baixa o
  desenho encolhia, a frase não, e "Acredite!" subia para trás do header.
- No desktop a coluna da direita é um container de tamanho (`container-type: size`): o desenho
  cresce até a altura disponível (`cqh`) e para quando a largura da coluna não comporta mais a
  frase à esquerda do braço (`cqw`).
- Duas colunas lado a lado só a partir de 1024px: abaixo disso as colunas ficam estreitas
  demais, o título quebra em muitas linhas e a figura encolhe.
- No celular e no tablet a faixa vem no topo só na ordem visual; no HTML o título continua
  primeiro. No celular o hero fica mais alto que a tela e a pessoa rola.

### Animação "riscado a lápis"

Ao carregar a página, a frase do hero é "escrita" linha a linha e depois o desenho é
"riscado": da esquerda para a direita na faixa das três bonecas, de cima para baixo na boneca
em pé. Dura menos de cinco segundos e roda uma vez.

- É só CSS: um recorte (`clip-path`) que se abre aos poucos. As animações são tokens do tema
  (`animate-write`, `animate-draw-right`, `animate-draw-down`, em `src/styles/main.css`).
- **Sempre com `motion-safe:`**: quem pediu redução de movimento no sistema vê tudo pronto.
- É uma revelação, não um lápis seguindo a linha: os SVGs são o contorno do traço, e não o
  caminho que a mão percorreu. Um lápis de verdade exigiria redesenhar cada boneca como um
  traço único.
- O recorte final é negativo (`inset(-0.5em ...)`), para não cortar as pontas das letras
  cursivas, que passam da caixa do texto.
- **`lg:animate-*` redefine a animação inteira e zera o atraso** declarado sem prefixo; o
  atraso precisa ser repetido com `lg:`. Foi um teste e2e que pegou isso.
- Sem JavaScript: o HTML do build já vem com o conteúdo, e a animação não depende do React.

### Desenhos em traço

Já vetorizados, em `src/assets/tracos/`: `guerreira.svg` (a da recepção), `alongamento.svg`
(sentada, tronco à frente), `crianca.svg` (postura da criança) e `trio.svg` (três bonecas lado
a lado, sobre uma linha de chão contínua, da faixa que a landing antiga usava). As três
primeiras compõem o papel de parede.

Referência escolhida: o traço da parede da recepção do studio, "Acredite! O movimento cura"
(`src/assets/images/movimento-cura-centralizado.png`). Características a manter em todos os
desenhos novos: uma única linha contínua e fina, cor única, sem preenchimento nem
sombra; mulher sem rosto, cabelo em coque, top e legging; linha solta e simples, sem detalhe anatômico; pequenos laços onde a linha se cruza;
pose de movimento de pilates ou alongamento; fundo transparente; sem texto.

## Pegadinhas técnicas

- **O HTML é gerado no build, no Node** ([decisão 0002](docs/decisoes/0002-prerender-no-build.md)).
  Componentes não acessam `window`, `document` ou `localStorage` durante a renderização; só
  dentro de `useEffect` ou de handlers.
- **TypeScript 6 e ESLint 9 são intencionais** ([decisão 0003](docs/decisoes/0003-versoes-e-ferramentas-de-ci.md)).
  Não atualizar para a versão seguinte sem checar os plugins.
- O e2e roda contra o build de produção; mudança que só funciona no `npm run dev` não passa.
