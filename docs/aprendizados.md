# Aprendizados

Registro do que foi aprendido no caminho, em ordem cronológica.

## 2026-10-05 — Padronização do projeto

- **Build não se versiona.** `dist/` é derivado do código; versionar cria duas fontes de
  verdade. A Vercel gera o build a cada deploy.
- **SPA entrega HTML vazio.** O conteúdo só aparece depois que o JavaScript roda. Dá para ver
  com `curl <url>`: se o `<body>` vier sem texto, quem não executa JS não enxerga a página.
  Solução adotada: prerender no build.
- **Peer dependencies limitam as versões.** A última versão de cada ferramenta nem sempre
  funciona em conjunto; a escolha é a mais nova que todas as peças aceitam.
- **Variável `VITE_*` é pública.** Tudo com esse prefixo vai para o JavaScript do navegador.
  Serve para configuração (URL, telefone), nunca para segredo.
- **Toda verificação precisa ser provada.** Lint e gitleaks foram testados com um arquivo
  errado de propósito, para confirmar que reprovam o que devem.
- **Um commit, uma responsabilidade.** Um `git add` que falha no meio de uma sequência pode
  juntar mudanças diferentes no commit seguinte; conferir com `git status` antes de commitar.
- **Ferramenta de CI não precisa ser dependência.** O Lighthouse CI trazia vulnerabilidades
  para o projeto; rodar por action resolve sem sujar o `package.json`.

## 2026-10-05 — Primeiros pull requests

- **Faixa "Compare & pull request" não é um PR.** É só um convite que o GitHub mostra depois de
  um push; nada existe até alguém criar o PR.
- **Template de PR só vale se estiver na branch padrão.** Enquanto o arquivo não chega à
  `main`, o formulário do site abre vazio. Criar o PR pelo terminal (`gh pr create`) com o
  corpo pronto não depende disso.
- **Push de branch nova precisa de `-u`.** `git push` puro falha com "no upstream branch";
  `git push -u origin <branch>` cria a branch no GitHub e liga a local a ela.
- **Token precisa do escopo `workflow` para enviar arquivos de `.github/workflows/`.** E quando
  o token vem da variável `GITHUB_TOKEN`, o `gh auth refresh` não consegue alterá-lo: o escopo
  é editado no site do GitHub.
- **CI que não dispara nem sempre é erro nosso.** Antes de mexer no arquivo: validar com
  `actionlint`, comparar com outro repositório da conta e olhar githubstatus.com. Aqui havia um
  incidente do GitHub Actions no horário dos pushes.
- **`pull_request` + `push` só nas branches de integração** evita rodar o CI duas vezes para a
  mesma mudança.
- **Contraste se mede contra cada fundo.** `rose-deep` passa sobre `cream` (5,1:1) e reprova
  sobre `blush` (4,2:1). Uma cor "aprovada" só está aprovada para o fundo em que foi medida.
- **SVG em `<img>` não herda a cor do CSS da página;** `currentColor` só funciona com o SVG
  embutido no HTML.

## 2026-10-07 — Abas da seção Serviços

- **`hidden` tira o elemento do layout; `inert` + `visibility: hidden` não.** Com `hidden`, cada
  painel tinha a própria altura e a frase final da seção subia e descia a cada troca de aba.
  Com os cinco painéis empilhados na mesma célula de uma grade, a célula tem a altura do maior
  e nada se mexe.
- **Imagem com `loading="lazy"` dentro de `display: none` só é pedida quando aparece.** Por
  isso a ilustração demorava no clique. Invisível, mas ocupando espaço, ela é baixada quando a
  seção se aproxima da tela.
- **Animação CSS não recomeça só porque o elemento voltou a ser visível.** Ela recomeça quando
  `animation-name` muda; desligar a animação no painel inativo (`inert:animate-none`) faz ela
  rodar de novo ao reativar.
- **`mix-blend-mode: multiply` apaga fundo branco sem editar a imagem:** branco multiplicado por
  uma cor dá a própria cor. Sobre cor forte a figura escurece; por isso ela fica sobre uma forma
  clara. Recortar o fundo por código estragou os jalecos brancos, que não têm contorno.
- **"Cabe na tela" precisa de teste até a última linha.** O teste antigo media só o cartão, e a
  frase final ficava para fora sem ninguém avisar.
- **Animação sem fim tem custo de acessibilidade** (WCAG 2.2.2 pede um jeito de pausar o que se
  move por mais de cinco segundos). Movimento curto, em resposta a clique ou mouse, não.
- **Rolagem horizontal sem sinal visível esconde conteúdo.** No celular a fileira de abas
  deslizava de lado e duas das cinco ficavam fora da tela; para quem olha, elas sumiram. O teste
  antigo conferia que a fileira rolava, e não que a pessoa via as abas: passava com o defeito.
- **Isolamento quebra `mix-blend-mode`.** `z-index`, `opacity`, `translate` e animação com
  `fill-mode: both` criam um contexto de empilhamento; dentro dele a imagem só se mistura com o
  que está no mesmo grupo, e o branco reaparece onde não há fundo. A animação do cartão passou a
  usar `backwards`, que não deixa nada aplicado ao terminar.
- **Medir antes de otimizar.** A queixa era "as imagens demoram a carregar". Medido, cada
  ilustração chega em 0,1 a 0,2 s, no dev e no build. O atraso era a animação: a figura era
  revelada da esquerda para a direita em 0,9 s, depois de o cartão surgir, e isso se lê como
  carregamento lento. Animação que imita defeito é defeito.
- **Ilustração em traço se colore por preenchimento de região** (`floodfill`), desde que os
  contornos sejam fechados. Onde o contorno é aberto (ponta dos dedos), o preenchimento vaza
  para o fundo e o trecho precisa ser pintado à mão.

## 2026-10-07 — Carrossel do Studio

- **Carrossel não precisa de biblioteca.** `overflow-x: auto` com `scroll-snap` já entrega
  arrasto, roda do mouse e teclado. O JavaScript ficou só com duas tarefas: saber qual slide
  está à vista e rolar até outro quando um botão pede.
- **Estado do React não serve para decidir o próximo passo de uma ação rápida.** O `index` só
  muda na renderização seguinte; uma tecla apertada antes dela calculava "próximo" a partir do
  slide antigo e o carrossel não saía do lugar. O valor atual passou a ficar também em um `ref`,
  lido na hora.
- **Cada navegador avisa da rolagem em um ritmo.** O Safari dispara o evento de rolagem só no
  começo e no fim da rolagem suave. A primeira versão concluía "parou" depois de 150 ms sem
  evento e voltava o marcador no meio do caminho. Hoje a chegada é reconhecida pela posição.
- **Teste que falha "às vezes" está apontando um defeito de verdade.** A falha só aparecia no
  WebKit, com os testes em paralelo. Registrar cada evento com o horário mostrou a causa em vez
  de aumentar o tempo de espera do teste.
- **Controle abaixo de conteúdo alto some.** No celular, setas embaixo do cartão ficavam fora da
  tela; foram para cima, junto do título.
- **Animação ligada à rolagem (`animation-timeline: view()`) dispensa `IntersectionObserver`:**
  sem JavaScript, não há risco de o conteúdo ficar invisível se o script falhar.
- **Componente extraído cedo demais vira código morto.** `CardGrid` e `IllustratedCard` foram
  criados no PR anterior e removidos neste, quando o Studio deixou de ser grade. O que
  sobreviveu foi a parte realmente repetida, a lista marcada (`CheckList`).
- **Margem dentro do arquivo também é tamanho.** Barrel e Chair pareciam menores porque o
  desenho ocupava só metade do próprio arquivo; `object-contain` encaixa o arquivo, não o
  desenho. Aparar a margem resolveu sem mexer no layout.
- **Desenho a lápis combina com papel colorido.** Com `mix-blend-multiply` sobre uma folha
  opaca, o branco do arquivo vira a cor do papel e o grafite continua escuro.

## 2026-10-07 — Seção Sobre a Luiza

- **Hierarquia visual é decisão de negócio.** Quem aparece maior, com foto e botão cheio, é
  quem a página diz que é a principal. Na versão de referência a seção da médica ganhava da
  dona do espaço; a regra agora está escrita no `CLAUDE.md`, para valer nas próximas seções.
- **O axe não mede contraste sobre degradê.** Ele marca como "incompleto", e não como violação.
  O contraste do rótulo foi medido à mão, pela cor real do fundo no print: 4,5:1 no topo da
  seção, 4,2:1 no fim. Um teste verde de acessibilidade não cobre isso.
- **Recorte de foto também é conteúdo.** O primeiro recorte deixava pedaços das letras do logo
  da parede ("Esp", "Saúde"); letra cortada parece descuido.

## 2026-10-08 — Seção Atendimento médico

- **Confirmar o que a pessoa quis dizer antes de construir.** "Dar mais visibilidade à Luiza do
  que à médica" foi lido como "a seção da médica precisa ser menor", e a primeira versão saiu
  sem foto, numa faixa baixa. O incômodo era outro: na referência, a médica estava no bloco
  verde, o elemento mais forte da página. Abrir a referência teria mostrado isso em um minuto.
- **Hierarquia se resolve dando o destaque a quem é principal, e não apagando o outro.** A
  médica continua com foto e seção bonita; o que muda de dono é o bloco escuro.
- **O axe conhece regras de HTML que o olho não vê.** Dentro de um grupo de `<dl>` só cabem
  `<dt>` e `<dd>`; o ícone solto ao lado reprovou. Foi para dentro do `<dt>`.
- **Regra de hierarquia vira teste:** a foto da médica é menor que a da Luiza, e a seção é mais
  baixa.
- **Ordem do HTML é a ordem de leitura.** Foto, nome, especialidades e botão, nessa ordem, no
  celular e para o leitor de tela.
- **Cor de marca no limite do contraste pede um tom próprio para texto pequeno.** O `rose-deep`
  dava 4,3:1 no rótulo desta seção. Em vez de mudar a cor da marca, entrou o `rose-ink`, 8%
  mais escuro, só para o rótulo.
- **"Caber em uma tela" tem um piso.** A seção cabe de 1280×600 até o celular de 390×664. Em
  celular menor o texto precisaria ficar abaixo de 12px, e ilegível é pior que rolar: lá a
  seção cresce um pouco (`min-h`, nunca `h`), sem cortar nada.
- **Um layout para cada tela, um HTML só.** No celular a foto é miniatura ao lado do nome e as
  especialidades são lista; no desktop, foto grande com crachá e cartões. Mudam só as classes.
- **Regra escrita e não aplicada não existe.** A identidade já previa a manuscrita "em palavras
  de destaque", mas só o hero usava. Virou uma prop do `SectionHeading` (`highlight`), e agora
  todo título de seção tem a sua.
- **Quanto de rosa claro cabe depende do papel de cada elemento.** Desenho decorativo não tem
  exigência de contraste e pode ir no rosa claro da marca. Texto grande precisa de 3:1 e vai no
  `rose-vivid`. Texto pequeno precisa de 4,5:1, e nenhum rosa claro chega lá sobre fundo rosado.
- **Seletor de teste amplo quebra quando a página cresce.** O teste do hero procurava "a lista
  de definições da página"; a seção médica trouxe uma segunda, e ele passou a achar duas. Agora
  procura dentro do hero.

## 2026-10-08 — Bloco verde da Luiza

- **Fundo escuro pede as próprias cores.** Sobre o `olive-deep`, o botão verde some e os rosas
  escuros ficam abaixo de 2:1. Componentes compartilhados ganharam uma opção para isso
  (`tone="dark"` no título, `variant="light"` no botão), em vez de classes soltas na seção.
- **O contorno de foco também depende do fundo.** Ele era verde-escuro para todos os botões e
  desapareceria no bloco; agora cada variante de botão define o seu.

## 2026-10-08 — Metodologia, Para quem é indicado e Contato

- **O mesmo erro duas vezes pede uma regra escrita.** O ícone solto dentro de um grupo de `<dl>`
  reprovou no axe na seção médica e de novo no Contato. A regra está no `CLAUDE.md`: em `<dl>`, o
  ícone vai dentro do `<dt>`.
- **Lista ordenada quando a ordem importa.** As etapas da metodologia são `<ol>`; o número
  grande é enfeite, porque a lista já diz a posição ao leitor de tela.
- **Dado público e fixo não é variável de ambiente.** O endereço do studio fica no código;
  variável de ambiente é para o que muda entre ambientes ou não deve ir para o repositório.
- **Mapa embutido tem custo.** Um `iframe` do Google Maps carrega script de terceiros para todo
  visitante; um link "Ver no mapa" resolve para quem quer, sem pesar para os demais.
- **Medida relativa à página muda quando a página cresce.** O degradê em porcentagem da altura
  mudaria de lugar a cada seção nova. A passagem para o verde virou uma faixa do próprio footer,
  que anda junto com ele.
- **Componente não deve ler o relógio.** O ano do rodapé chega por prop; assim o teste escolhe
  o ano e o componente continua previsível.
