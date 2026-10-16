# Backlog

## Concluído

- [x] Higiene do repositório (`.gitignore`, `dist` fora do git, `.env.example`, `.nvmrc`)
- [x] Esqueleto React + Vite + TypeScript + Tailwind 4 com prerender
- [x] ESLint (a11y + hooks), Prettier e configurações do VS Code
- [x] Vitest + Testing Library e Playwright (chromium, firefox, webkit) com axe
- [x] Husky (pre-commit e pre-push), lint-staged e gitleaks
- [x] CI no GitHub Actions com Lighthouse
- [x] Documentação base
- [x] `CLAUDE.md` do projeto
- [x] Identidade visual: tokens de cor e fontes no tema do Tailwind
- [x] Proteção de branch, Dependabot e CodeQL
- [x] Passo do SonarCloud no CI (pulado enquanto o `SONAR_TOKEN` não existir)
- [x] Papel de parede da página com bonecas em traço e folhagens
- [x] Hero com a faixa das três bonecas (celular e tablet) e animação "riscado a lápis"
- [x] Tratamento de imagens no build (AVIF/WebP) e componente `Picture`
- [x] `ErrorBoundary` na raiz do app, com saída para o WhatsApp
- [x] `Container` em `shared/ui` (largura máxima de 80rem, fundo sempre de borda a borda)

## Próximos passos

- [x] Transição para `olive-deep` no footer: faixa sem texto no topo do próprio footer.
      Em aberto: a Leidejane imagina a mistura começando antes, a partir da seção "Sobre";
      mostrar as duas versões e decidir com ela
- [x] Dados reais levantados (ver docs/conteudo.md) e `.env` local preenchido
- [ ] Gerar os desenhos em traço a partir de [docs/identidade/prompts-desenhos.md](identidade/prompts-desenhos.md)
- [ ] Gerar as três ilustrações de serviço que faltam (Pilates, Massoterapia e Atendimento
      Médico), por [docs/identidade/prompts-ilustracoes-servicos.md](identidade/prompts-ilustracoes-servicos.md)
- [ ] Vetorizar os demais desenhos em traço para SVG (prontos em `src/assets/tracos`: guerreira,
      alongamento e criança)
- [x] Limpar `src/assets/images`: a pasta saiu. Nenhum código usava as 30 imagens. Duas foram
      guardadas: a foto inteira da Luiza (`design/originais/luiza-foto-original.png`) e a
      referência da parede da recepção (`docs/identidade/referencia-parede-recepcao.png`). A
      cópia do logo (`logo-espaco.png`) foi apagada; a documentação passou a apontar para o
      logo que o site já usava, `design/originais/logo.png`
- [x] Rótulo das seções (`SectionHeading`) sobre fundo `blush`: passou a usar `rose-ink`
- [ ] Texto do navegador em 200% numa tela de 320px (WCAG 1.4.4 e 1.4.10): o título de "Sobre a
      Luiza" já se ajusta, mas o header passa 35px da tela e outras seções têm conteúdo que
      extrapola. Revisar seção por seção, com teste
- [ ] Design system em `shared/ui` (Button, Card, SectionHeading...)

## Próxima rodada de vida às seções

- [x] Studio em carrossel, um aparelho por vez, na horizontal (sem troca automática)
- [x] Conteúdo surgindo de leve ao entrar na tela, respeitando redução de movimento
- [x] Bloco verde-oliva na seção "Sobre a Luiza" (título, foto, apresentação, botão claro e as
      certificações, todos dentro dele), para ela ter o destaque mais forte da página
- [x] Degradê da página nas cores dos posts: creme, rosa e verde-oliva, com o verde subindo
      por trás dos Depoimentos; rótulo das seções em selo e detalhes dourados e ramos claros

## Seções da landing (uma branch por seção, a partir de `feat/landing`)

- [x] Header e navegação (com menu mobile acessível)
- [x] Hero
- [x] Studio / aparelhos
- [x] Serviços
- [x] Sobre a Luiza (foto provisória: ver pendências em docs/conteudo.md)
- [x] Atendimento médico (foto provisória; descrições das especialidades aguardam revisão)
- [x] Metodologia
- [x] Para quem é indicado (só os nomes; complementos aguardam aprovação)
- [x] Depoimentos: seção pronta, com avaliações provisórias (a troca pelas reais está em
      "SEO e publicação")
- [x] Contato (sem formulário: tudo leva ao WhatsApp; chamada final aguarda revisão)
- [x] Footer (frase do rodapé aguarda revisão)

## Depois da reunião com a Luiza

Itens que dependem da conversa com a cliente; ficam parados até lá.

- [ ] Texto da avaliação da Leidejane no Google, para trocar o marcador entre colchetes dos
      cartões de Depoimentos (`testimonialsList.ts`)
- [ ] Avaliações reais escolhidas pela Luiza, com o consentimento de cada pessoa (nome, texto
      e foto). Até lá, a seção está no ar com as provisórias (ver "SEO e publicação")
- [ ] Cartão de depoimento aberto tem teto de altura (`max-h-[40em]`): uma avaliação mais
      longa que isso teria o final cortado. Rever com os textos reais em mãos, porque a
      correção troca a técnica da animação de abertura (apontamento do CodeRabbit no PR #37)
- [ ] Crédito no footer, pequeno: "Criado por Leidejane da Rosa", com link para o portfólio ou
      para o LinkedIn (decidir qual). Abre em nova aba; conferir o contraste sobre o
      `olive-deep` e combinar com a cliente antes de publicar

## SEO e publicação

- [ ] Trocar as avaliações provisórias da seção Depoimentos pelas reais, com o consentimento
      de cada pessoa (`testimonialsList.ts`; há um `it.todo` no teste da seção). **Em
      2026-10-11 a Leidejane decidiu publicar na `main` com as provisórias** (a foto dela e um
      texto marcador), para a Luiza aprovar a landing pelo endereço de produção: o preview da
      Vercel pede login. Deixou de bloquear a ida para a `main`; continua pendente
- [x] Canonical, Open Graph e imagem de compartilhamento
- [x] Dados estruturados (schema.org `MedicalBusiness`). Falta o horário de funcionamento,
      quando a cliente informar
- [x] `robots.txt`, `sitemap.xml` e favicon
- [ ] Quando a cliente tiver domínio próprio: trocar `VITE_SITE_URL` na Vercel e fazer um novo
      deploy; canonical, sitemap e imagem de compartilhamento acompanham sozinhos
- [ ] Cadastrar o site no Google Search Console e enviar o sitemap
- [x] Variáveis de ambiente configuradas na Vercel (Production e Preview) — sem elas o build
      da Vercel falha. Conferido pela Leidejane em 2026-10-11
- [ ] Primeira ida para a `main` (2026-10-11): é para a cliente aprovar pelo endereço de
      produção, e não a entrega. A `feat/landing` continua sendo a branch de trabalho e a
      branch padrão do GitHub
- [ ] Na entrega, depois da aprovação da cliente: último merge na `main`, voltar a branch
      padrão do GitHub para a `main` e rodar de novo o `setup-github.mjs` (decisão 0007)
- [ ] Religar a análise: conferir os alertas do Dependabot e do CodeQL depois do merge final
- [x] GitHub Pages desligado em 2026-10-11: ele servia a raiz da `main` sem build e mostraria
      uma página em branco com a versão React. O site oficial é o da Vercel
- [ ] Auditoria manual de a11y (teclado e leitor de tela) antes de publicar
- [x] Esvaziar a lista `PENDING_SECTIONS` de `e2e/navigation.spec.ts`: todo link do menu tem
      destino

## Auditoria de outubro de 2026

Relatório completo em [auditoria-2026-10.md](auditoria-2026-10.md). O que ficou para depois:

- [ ] Cartão de depoimento: trocar o `tabIndex` no `<li>` por um botão "ver depoimento
      completo" (padrão de sanfona), com nome para o leitor de tela. Fazer junto com as
      avaliações reais e com o teto de altura do cartão
- [ ] Testes presos a nomes de classe (55 `toHaveClass`): trocar, onde fizer sentido, por
      verificação do resultado; o comportamento já é coberto pelo e2e
- [ ] Classes com mais de 300 caracteres em `MedicalCare`, `Testimonials`, `Services` e `Hero`:
      decidir se vale quebrar em constantes com nome
- [ ] `.coderabbit.yaml`, a partir do repositório-modelo `react-vite-template`
- [ ] CI roda duas vezes quando há push na `feat/landing` com PR aberto para a `main`
- [ ] Repetir o "teste dos testes" (defeitos injetados de propósito) nos próximos módulos
- [ ] Lighthouse contra o endereço de produção
- [ ] Decidir se as fotos apagadas no PR #41 precisam sair também do histórico do git

## Pendências técnicas

- [x] Cabeçalhos de segurança em `vercel.json` (auditoria de 2026-10-11)
- [x] Auditoria publicada na `main` em 2026-10-13 (PR #48) e conferida em produção: os seis
      cabeçalhos chegam; `robots.txt`, `sitemap.xml`, favicon e imagem de compartilhamento
      respondem 200; canonical e dados estruturados corretos; a página carrega sem nada
      bloqueado pela política de conteúdo no Chromium, no Firefox e no WebKit
- [ ] Nota dos cabeçalhos em um verificador como o securityheaders.com
- [x] Miniatura ao colar o link no WhatsApp: imagem, título, descrição e endereço aparecem
      (conferido pela Leidejane em 2026-10-13)
- [x] Dados estruturados no teste de resultados do Google: item "Empresas locais" válido, sem
      erro crítico (conferido pela Leidejane em 2026-10-13). O único aviso é o campo opcional
      `priceRange` (faixa de preço), que não foi preenchido porque a cliente não informou
- [ ] Perguntar à cliente o horário de funcionamento e se quer divulgar faixa de preço, para
      completar os dados estruturados (`openingHours` e `priceRange`)
- [x] Imagem de compartilhamento: arte própria no lugar do print, que tinha o texto pequeno
      ilegível no cartão do WhatsApp (`design/og-image.html`, gerada com `npm run og-image`)
- [x] Arte nova publicada na `main` em 2026-10-16 (PR #51) e conferida no WhatsApp pela
      Leidejane. O WhatsApp guarda a miniatura antiga por um tempo; para ver a nova num link
      já compartilhado, colar com `?v=2` no fim do endereço
- [ ] Tirar o `'unsafe-inline'` do `style-src`: passar o degradê e o papel de parede de
      `style` no elemento para classes
- [ ] Cache longo para `/assets/*` (os nomes já têm hash): hoje a Vercel revalida a cada visita
- [x] Limite de cobertura do CI em 100%, que é o que o projeto tem
- [ ] Ativar o SonarCloud: criar o projeto, cadastrar o segredo `SONAR_TOKEN` no GitHub,
      conferir `sonar.organization` e `sonar.projectKey` em `sonar-project.properties` e ver a
      primeira análise passar no CI
- [ ] Rever TypeScript 7 e ESLint 10 quando os plugins aceitarem (decisão 0003)
