# 0005 — Build falha se faltar variável de ambiente

- **Data:** 2026-10-05
- **Status:** aceita

## Contexto

O site inteiro depende do link do WhatsApp, montado a partir de `VITE_WHATSAPP_NUMBER`. Se a
variável não estiver configurada, o link sai como `wa.me/undefined` e o erro só aparece quando
alguém clica no botão.

## Decisão

`vite.config.ts` confere as variáveis obrigatórias (`VITE_SITE_URL`, `VITE_WHATSAPP_NUMBER`,
`VITE_INSTAGRAM_URL`) antes de iniciar o `dev` ou o `build`. Faltando alguma, o comando para
com uma mensagem dizendo qual falta e onde configurar.

## Alternativa considerada

Deixar o site subir mesmo sem a variável. Descartada: troca um erro visível para quem
desenvolve por um erro silencioso para quem visita.

## Consequências

- Cada ambiente precisa das três variáveis: `.env` local, painel da Vercel (Production e
  Preview) e o bloco `env` do workflow de CI, que usa valores de exemplo.
- Os testes unitários não passam pela checagem; cada teste define o que precisa com
  `vi.stubEnv`, para não depender do `.env` de quem roda.
- Variável nova obrigatória entra na lista `REQUIRED_ENV`, no `.env.example` e em `src/env.d.ts`.
