# Aprendizados

Registro do que foi aprendido no caminho, em ordem cronológica.

## 2026-10-05 — Padronização do projeto

- **Build não se versiona.** `dist/` é derivado do código; versionar cria duas fontes de
  verdade. A Vercel gera o build a cada deploy.
- **SPA entrega HTML vazio.** O conteúdo só aparece depois que o JavaScript roda. Dá para ver
  com `curl <url>`: se o `<body>` vier sem texto, quem não executa JS não enxerga a página.
  Solução adotada: prerender no build.
- **Peer dependencies limitam as versões.** A última versão de cada ferramenta nem sempre
  funciona em conjunto; a escolha é a mais nova que todas as peças aceitam.
- **Variável `VITE_*` é pública.** Tudo com esse prefixo vai para o JavaScript do navegador.
  Serve para configuração (URL, telefone), nunca para segredo.
- **Toda verificação precisa ser provada.** Lint e gitleaks foram testados com um arquivo
  errado de propósito, para confirmar que reprovam o que devem.
- **Um commit, uma responsabilidade.** Um `git add` que falha no meio de uma sequência pode
  juntar mudanças diferentes no commit seguinte; conferir com `git status` antes de commitar.
- **Ferramenta de CI não precisa ser dependência.** O Lighthouse CI trazia vulnerabilidades
  para o projeto; rodar por action resolve sem sujar o `package.json`.
