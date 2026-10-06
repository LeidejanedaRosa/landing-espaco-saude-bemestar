# Luiza — Espaço Saúde e Bem-estar

Landing page de uma página para o studio de pilates clínico e fisioterapia da Luiza.
Este arquivo complementa o `~/.claude/CLAUDE.md` global: aqui só entra o que é específico
deste projeto. Onde houver conflito, vale este.

- **Tier 1** · React 19 · Vite 8 · TypeScript 6 · Tailwind CSS 4
- Estrutura: `src/pages` (páginas) · `src/components` (seções) · `src/shared/ui` (design system)
- Textos da landing: [docs/conteudo.md](docs/conteudo.md) — não inventar texto, usar o que está lá
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

O CI roda em todo `pull_request` e em `push` na `main` e na `feat/landing`. Push em sub-branch
sem PR aberto não dispara CI; nesse momento a verificação é a do hook local de pre-push.

## Layout

### Container

Toda seção usa o mesmo `Container` (`src/shared/ui`). Nenhuma seção define largura própria.

```
┌──────────────────────── viewport (qualquer largura) ────────────────────────┐
│ <section>  fundo e imagem decorativa: 100% da largura, sempre               │
│        ┌──────────── Container: max 90rem (1440px), mx-auto ───────────┐    │
│        │  conteúdo                                                     │    │
│        └───────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Largura máxima de 1440px, centralizada** (`mx-auto`). Escrita como `90rem` em um token do
  tema do Tailwind, para acompanhar o tamanho de fonte que a pessoa configurou no navegador.
- **O fundo nunca fica preso ao Container.** Quem carrega fundo é o elemento de fora
  (`<section>`, `<header>`, `<footer>`), com largura total; o Container fica dentro e limita só
  o conteúdo. Em telas maiores que 1440px o fundo continua indo de borda a borda.
- **Sem valores fixos.** Nada de `px` em largura, altura, espaçamento ou tamanho de fonte. Usar
  `rem`, `%`, `fr`, `dvh`, `clamp()`, `min()`/`max()` e `aspect-ratio`. Exceção: detalhes de
  1px, como bordas.
- Espaçamento lateral do Container é fluido (cresce com a tela), nunca um número fixo.
- No código: `<Container>` aplica `max-w-page` (token `--container-page: 90rem`) e `px-gutter`
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

### Imagem decorativa de fundo das seções

Cada seção tem um desenho de fundo: uma figura feminina em movimento, em traço contínuo fino,
como feito a lápis, no estilo do desenho "O movimento cura" da recepção do studio
(`src/assets/images/movimento-cura-centralizado.png`). Só o desenho, sem frase.

- Implementar como `<img alt="" aria-hidden="true">` posicionada atrás do conteúdo, e não como
  `background-image` no CSS: o navegador não adia o carregamento de `background-image`, e de
  `<img>` sim. É o mesmo padrão do `ThemedBackgroundImage` do projeto `portfolio`.
- A imagem é posicionada em relação à seção (largura total), não ao Container.
- `pointer-events-none`, atrás do conteúdo, discreta o bastante para não atrapalhar a leitura.

## Navegação

- Os links do menu vivem em `NAV_ITEMS` (`src/components/navigation.ts`). **Seção nova entra
  com o `id` igual ao `href` do seu item**; sem isso o link do menu não leva a lugar nenhum.
- O header é fixo: a folga para ele não cobrir o início da seção de destino está em
  `scroll-padding-top`, em `src/styles/main.css`. Se a altura do header mudar, ajustar lá.
- Botão com aparência de botão que leva a outro lugar é `ButtonLink` (`src/shared/ui`); com
  `external`, ele abre em nova aba, protege com `rel` e avisa o leitor de tela.
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
  - **A passagem de `blush` para `olive-deep` não pode ter texto em cima.** No meio dessa faixa
    nem `ink` nem `cream` chegam a 4,5:1. A transição fica concentrada num trecho curto e sem
    texto logo antes do footer.

### Estilo observado nos posts da cliente

- Fundo creme rosado, cartões em rosa claro, blocos de destaque em verde-oliva com texto claro.
- Cantos bem arredondados, ícones de linha dentro de círculos, ondas suaves no rodapé.
- Folhagens em aquarela discreta nos cantos; divisores finos com um pequeno ornamento central.
- Tipografia em três papéis: serifada elegante de alto contraste nos títulos, sem serifa limpa
  no texto, e manuscrita só em palavras de destaque (nunca em parágrafo).

### Desenhos em traço

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
