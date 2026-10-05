# 0001 — Tier 1 com React, Vite, TypeScript e Tailwind

- **Data:** 2026-10-05
- **Status:** aceita

## Contexto

A landing antiga era um único `index.html` de 1005 linhas, com Tailwind por CDN e sem testes.
Decidimos refazer do zero. É um site de uma página, sem login, sem banco e sem backend.

## Decisão

- **Tier 1:** `pages/` + `components/` + `shared/ui/`. Sem features, camadas ou estado global.
- **React + Vite + TypeScript:** componentização e hooks testáveis; o Vite já estava no projeto.
- **Tailwind 4** pelo plugin do Vite, no lugar do CDN (o CDN manda o framework inteiro para o
  navegador e gera o CSS em tempo de execução; o plugin gera só as classes usadas, no build).

## Alternativas consideradas

- **Astro:** melhor SEO e performance de fábrica, mas sem hooks e é uma ferramenta a mais.
- **Next.js:** HTML pronto de fábrica, porém pesado para uma página só.
- **HTML sem framework:** componentização manual.

## Consequências

- Um app React puro entrega HTML vazio; isso é resolvido na [decisão 0002](0002-prerender-no-build.md).
- Sem Sentry e sem Sonar no CI, por ser Tier 1.
