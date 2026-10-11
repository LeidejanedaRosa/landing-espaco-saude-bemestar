# 0003 — Versões travadas por compatibilidade e Lighthouse fora do package.json

- **Data:** 2026-10-05
- **Status:** aceita

## Decisão

- **TypeScript 6.0, não 7:** o `typescript-eslint` aceita apenas `< 6.1`.
- **ESLint 9, não 10:** o `eslint-plugin-jsx-a11y` aceita apenas até a 9.
- **Lighthouse CI roda por action no GitHub**, não como dependência: instalar `@lhci/cli`
  trazia 11 vulnerabilidades altas e fazia o `npm audit` do próprio CI reprovar.

## Quando rever

Ao atualizar dependências, checar se os plugins já aceitam TypeScript 7 e ESLint 10
(`npm view <pacote> peerDependencies`).
