# 0002 — Pré-renderizar o HTML no build

- **Data:** 2026-10-05
- **Status:** aceita

## Contexto

Um app React comum entrega `<div id="root"></div>` vazio e monta a página com JavaScript. Quem
lê só o HTML (prévias de link no WhatsApp, alguns buscadores, leitores sem JS) não vê conteúdo.
Para uma landing, SEO e prévia de link são requisito.

## Decisão

Gerar o HTML durante o build, com um script próprio de poucas linhas:

```
vite build                          → dist/ (site para o navegador)
vite build --ssr entry-server.tsx   → dist-ssr/ (versão que roda no Node)
node scripts/prerender.mjs          → renderiza <App /> e injeta no dist/index.html
```

No navegador, `entry-client.tsx` faz `hydrateRoot` (assume o HTML pronto) em produção e
`createRoot` no `npm run dev`, onde o `#root` vem vazio.

## Alternativas consideradas

- **Biblioteca de SSG (ex.: vite-react-ssg):** resolve o mesmo com uma dependência a mais.
  Para uma página só, o script próprio é menor e deixa o mecanismo visível.
- **Migrar para Next/Astro:** descartado na decisão 0001.

## Consequências

- Componentes não podem acessar `window`/`document` durante a renderização (só dentro de
  `useEffect` ou de handlers), porque também rodam no Node.
- Protegido por teste unitário (`entry-server.test.tsx`) e e2e ("entrega o conteúdo no HTML").
