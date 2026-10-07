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

- [ ] Transição do degradê para `olive-deep` no footer (o trecho claro já está aplicado).
      Decidir com a Leidejane onde a mistura começa: ela imagina a partir da seção "Sobre"; nesse
      caso, no trecho do meio o texto não pode ficar direto sobre o fundo (vai em cartões)
- [x] Dados reais levantados (ver docs/conteudo.md) e `.env` local preenchido
- [ ] Gerar os desenhos em traço a partir de [docs/identidade/prompts-desenhos.md](identidade/prompts-desenhos.md)
- [ ] Gerar as três ilustrações de serviço que faltam (Pilates, Massoterapia e Atendimento
      Médico), por [docs/identidade/prompts-ilustracoes-servicos.md](identidade/prompts-ilustracoes-servicos.md)
- [ ] Vetorizar os demais desenhos em traço para SVG (prontos em `src/assets/tracos`: guerreira,
      alongamento e criança)
- [ ] Limpar `src/assets/images` (21 MB, nomes soltos)
- [ ] Design system em `shared/ui` (Button, Card, SectionHeading...)

## Próxima rodada de vida às seções

- [x] Studio em carrossel, um aparelho por vez, na horizontal (sem troca automática)
- [x] Conteúdo surgindo de leve ao entrar na tela, respeitando redução de movimento

## Seções da landing (uma branch por seção, a partir de `feat/landing`)

- [x] Header e navegação (com menu mobile acessível)
- [x] Hero
- [x] Studio / aparelhos
- [x] Serviços
- [ ] Sobre a Luiza
- [ ] Atendimento médico
- [ ] Metodologia
- [ ] Para quem é indicado
- [ ] Depoimentos (avaliações reais do Google, escolhidas pela cliente)
- [ ] Contato (sem formulário: tudo leva ao WhatsApp)
- [ ] Footer

## SEO e publicação

- [ ] Canonical, Open Graph e imagem de compartilhamento
- [ ] Dados estruturados (schema.org `LocalBusiness`/`MedicalBusiness`)
- [ ] `robots.txt`, `sitemap.xml` e favicon
- [ ] Variáveis de ambiente configuradas na Vercel (Production e Preview) — sem elas o build
      da Vercel falha
- [ ] Na entrega: merge na `main`, voltar a branch padrão do GitHub para a `main` e rodar de
      novo o `setup-github.mjs` (decisão 0007)
- [ ] Religar a análise: conferir os alertas do Dependabot e do CodeQL depois do merge final
- [ ] Decidir o que fazer com o GitHub Pages: ele serve a raiz da `main` sem build e vai
      quebrar quando a versão React chegar lá (desligar ou trocar para o build)
- [ ] Auditoria manual de a11y (teclado e leitor de tela) antes de publicar
- [ ] Esvaziar a lista `PENDING_SECTIONS` de `e2e/navigation.spec.ts`: cada seção construída
      sai da lista, e a landing só vai para a `main` com ela vazia (hoje o menu e o botão
      "Conhecer o studio" apontam para seções que ainda não existem)

## Pendências técnicas

- [ ] Ativar o SonarCloud: criar o projeto, cadastrar o segredo `SONAR_TOKEN` no GitHub,
      conferir `sonar.organization` e `sonar.projectKey` em `sonar-project.properties` e ver a
      primeira análise passar no CI
- [ ] Rever TypeScript 7 e ESLint 10 quando os plugins aceitarem (decisão 0003)
