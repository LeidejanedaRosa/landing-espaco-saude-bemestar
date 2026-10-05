# Backlog

## Concluído

- [x] Higiene do repositório (`.gitignore`, `dist` fora do git, `.env.example`, `.nvmrc`)
- [x] Esqueleto React + Vite + TypeScript + Tailwind 4 com prerender
- [x] ESLint (a11y + hooks), Prettier e configurações do VS Code
- [x] Vitest + Testing Library e Playwright (chromium, firefox, webkit) com axe
- [x] Husky (pre-commit e pre-push), lint-staged e gitleaks
- [x] CI no GitHub Actions com Lighthouse
- [x] Documentação base

## Próximos passos

- [ ] `CLAUDE.md` do projeto (identidade visual, regras de conteúdo, convenções)
- [ ] Definir identidade visual: paleta, tipografia e tokens no Tailwind
- [ ] Definir e produzir as imagens novas; limpar `src/assets/images` (21 MB, nomes soltos)
- [ ] Levantar dados reais: WhatsApp, Instagram, endereço, depoimentos autorizados
- [ ] Design system em `shared/ui` (Button, Card, SectionHeading...)

## Seções da landing (uma branch por seção, sob `feat/landing`)

- [ ] Header e navegação (com menu mobile acessível)
- [ ] Hero
- [ ] Studio / aparelhos
- [ ] Serviços
- [ ] Sobre a Luiza
- [ ] Atendimento médico
- [ ] Metodologia
- [ ] Para quem é indicado
- [ ] Depoimentos
- [ ] Contato
- [ ] Footer

## SEO e publicação

- [ ] Canonical, Open Graph e imagem de compartilhamento
- [ ] Dados estruturados (schema.org `LocalBusiness`/`MedicalBusiness`)
- [ ] `robots.txt`, `sitemap.xml` e favicon
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Auditoria manual de a11y (teclado e leitor de tela) antes de publicar

## Pendências técnicas

- [ ] Rever TypeScript 7 e ESLint 10 quando os plugins aceitarem (decisão 0003)
