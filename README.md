# Luiza — Espaço Saúde e Bem-estar

Landing page do studio de pilates clínico e fisioterapia da Luiza.

- **Produção:** https://landing-espaco-saude-bemestar.vercel.app
- **Stack:** React 19 · Vite 8 · TypeScript 6 · Tailwind CSS 4
- **Tier:** 1 (site estático) — ver [decisão 0001](docs/decisoes/0001-tier-e-stack.md)

## Como rodar

Pré-requisitos: Node 24 (`nvm use`) e [gitleaks](https://github.com/gitleaks/gitleaks#installing)
(usado no hook de pre-commit).

```bash
npm install
cp .env.example .env   # preencha os valores; sem eles, dev e build param com erro
npm run dev
```

## Scripts

| Script              | O que faz                                                  |
| ------------------- | ---------------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento                                |
| `npm run build`     | Checa tipos, gera o site em `dist/` e pré-renderiza o HTML |
| `npm run preview`   | Serve o `dist/` localmente                                 |
| `npm run lint`      | ESLint (inclui regras de acessibilidade e de hooks)        |
| `npm run format`    | Formata com Prettier (`format:check` só verifica)          |
| `npm run typecheck` | Checagem de tipos do TypeScript                            |
| `npm run test`      | Testes unitários (`test:watch`, `test:coverage`)           |
| `npm run e2e`       | Testes ponta a ponta no Chromium, Firefox e WebKit         |

Na primeira vez que rodar o e2e: `npx playwright install`.

## Estrutura

```
src/
  pages/          páginas (hoje só a HomePage)
  components/     seções da landing (Hero, Serviços, Contato...)
  shared/ui/      design system: peças genéricas (Button, Card...)
  styles/         CSS global e tokens do Tailwind
  assets/         imagens
  entry-client.tsx   ponto de entrada no navegador
  entry-server.tsx   ponto de entrada do prerender (roda no Node, só no build)
e2e/              testes Playwright
scripts/          scripts de build
design/originais/ imagens originais (PNG); o build gera AVIF/WebP a partir delas
docs/             backlog, decisões, aprendizados e conteúdo
```

## Qualidade

- **Local (Husky):** `pre-commit` roda lint-staged + gitleaks; `pre-push` roda lint, tipos,
  testes com cobertura e e2e.
- **CI (GitHub Actions):** lint, formatação, tipos, testes, build, e2e nos três motores,
  `npm audit`, gitleaks, SonarCloud e Lighthouse (mínimo 90 em cada categoria). Roda em todo pull request
  e em push na `main` e na `feat/landing`.
- **Fluxo:** cada mudança em uma branch própria, que entra na `feat/landing` por pull request.
- **Deploy:** a Vercel publica a `main` e gera um preview para cada branch.

## Documentação

- [Backlog](docs/backlog.md)
- [Decisões de arquitetura](docs/decisoes/)
- [Aprendizados](docs/aprendizados.md)
- [Conteúdo da landing](docs/conteudo.md)
