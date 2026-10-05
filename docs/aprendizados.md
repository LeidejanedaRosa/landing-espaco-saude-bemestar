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

## 2026-10-05 — Primeiros pull requests

- **Faixa "Compare & pull request" não é um PR.** É só um convite que o GitHub mostra depois de
  um push; nada existe até alguém criar o PR.
- **Template de PR só vale se estiver na branch padrão.** Enquanto o arquivo não chega à
  `main`, o formulário do site abre vazio. Criar o PR pelo terminal (`gh pr create`) com o
  corpo pronto não depende disso.
- **Push de branch nova precisa de `-u`.** `git push` puro falha com "no upstream branch";
  `git push -u origin <branch>` cria a branch no GitHub e liga a local a ela.
- **Token precisa do escopo `workflow` para enviar arquivos de `.github/workflows/`.** E quando
  o token vem da variável `GITHUB_TOKEN`, o `gh auth refresh` não consegue alterá-lo: o escopo
  é editado no site do GitHub.
- **CI que não dispara nem sempre é erro nosso.** Antes de mexer no arquivo: validar com
  `actionlint`, comparar com outro repositório da conta e olhar githubstatus.com. Aqui havia um
  incidente do GitHub Actions no horário dos pushes.
- **`pull_request` + `push` só nas branches de integração** evita rodar o CI duas vezes para a
  mesma mudança.
- **Contraste se mede contra cada fundo.** `rose-deep` passa sobre `cream` (5,1:1) e reprova
  sobre `blush` (4,2:1). Uma cor "aprovada" só está aprovada para o fundo em que foi medida.
- **SVG em `<img>` não herda a cor do CSS da página;** `currentColor` só funciona com o SVG
  embutido no HTML.
