# 0007 — `feat/landing` como branch padrão até a entrega

- **Data:** 2026-10-06
- **Status:** aceita (temporária)

## Contexto

Dependabot, CodeQL, CodeRabbit e o template de PR do GitHub olham sempre para a branch padrão
do repositório. A padrão era a `main`, onde ainda está o site antigo. Resultado: 32 alertas de
dependências que o código novo já não usa, 8 PRs de correção apontando para a `main`, o
CodeRabbit pulando a revisão dos nossos PRs e o formulário de PR abrindo sem o template.

## Decisão

A branch padrão do GitHub passa a ser a `feat/landing` enquanto a landing é construída. A
`main` não muda e continua sendo a branch publicada pela Vercel e pelo GitHub Pages.

```
GitHub (padrão)  ─► feat/landing   ferramentas analisam o código novo
Vercel / Pages   ─► main           o site no ar continua o mesmo
```

## Alternativas consideradas

- **Merge antecipado na `main`:** resolveria tudo, mas publicaria "Site em construção".
- **Levar só a pasta `.github` para a `main`:** o CI falharia no código antigo e os alertas
  continuariam.

## Consequências

- O ruleset protege explicitamente a `main` além da branch padrão.
- **Ao entregar:** merge da `feat/landing` na `main`, voltar a branch padrão para a `main` e
  rodar de novo o script de configuração do GitHub. Está no backlog.
- A "Production Branch" da Vercel é uma configuração do projeto na Vercel e não acompanha a
  branch padrão do GitHub; conferir no primeiro deploy depois da troca.
