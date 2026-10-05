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

## Próximos passos

- [ ] `Container` em `shared/ui` (largura máxima de 90rem, fundo sempre de borda a borda)
- [ ] `ErrorBoundary` na raiz do app, com saída para o WhatsApp
- [ ] Transição do degradê para `olive-deep` no footer (o trecho claro já está aplicado)
- [x] Dados reais levantados (ver docs/conteudo.md) e `.env` local preenchido
- [ ] Prompts e especificações das imagens (desenhos em traço por seção e fotos)
- [ ] Tratamento de imagens: vetorizar desenhos para SVG, fotos em AVIF/WebP
- [ ] Limpar `src/assets/images` (21 MB, nomes soltos)
- [ ] Design system em `shared/ui` (Button, Card, SectionHeading...)

## Seções da landing (uma branch por seção, a partir de `feat/landing`)

- [ ] Header e navegação (com menu mobile acessível)
- [ ] Hero
- [ ] Studio / aparelhos
- [ ] Serviços
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
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Auditoria manual de a11y (teclado e leitor de tela) antes de publicar

## Pendências técnicas

- [ ] Rever TypeScript 7 e ESLint 10 quando os plugins aceitarem (decisão 0003)
