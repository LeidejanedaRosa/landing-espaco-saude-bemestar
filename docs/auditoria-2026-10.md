# Auditoria de qualidade — outubro de 2026

Varredura feita em 2026-10-11, logo depois da primeira ida da landing para a `main`, e
corrigida na branch guarda-chuva `chore/audit` (PRs #41 a #46). Este documento registra o que
foi procurado, o que foi achado, o que foi corrigido e o que ficou para depois.

## Como foi feita

- Leitura do código e do HTML gerado pelo build (`dist/index.html`), e não só do código-fonte.
- Conferência do site em produção: cabeçalhos, `robots.txt`, `sitemap.xml` e links.
- `npm audit`, lint, tipos e cobertura.
- **Teste dos testes:** oito defeitos injetados de propósito, um por vez, para ver se a suíte
  reclamava.

## Placar

| Tema                       | Antes   | Depois |
| -------------------------- | ------- | ------ |
| Boas práticas e clean code | boa     | boa    |
| Valores escritos no código | atenção | boa    |
| HTML semântico             | boa     | boa    |
| Segurança                  | atenção | boa    |
| SOLID e componentização    | boa     | boa    |
| SEO                        | fraca   | boa    |
| Testes                     | boa     | boa    |
| Código morto               | atenção | boa    |

## Achados e destino de cada um

| #   | Achado                                                                                    | Destino                                                                              |
| --- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1   | SEO: sem `robots.txt`, `sitemap.xml`, favicon, canonical, Open Graph e dados estruturados | corrigido no PR #42                                                                  |
| 2   | 30 imagens sem uso em `src/assets/images`, em repositório público                         | corrigido no PR #41                                                                  |
| 3   | Teste das estrelas passava com o código quebrado                                          | corrigido no PR #44                                                                  |
| 4   | Sem cabeçalhos de segurança                                                               | corrigido no PR #43                                                                  |
| 5a  | `VITE_SITE_URL` obrigatória e sem uso                                                     | corrigido no PR #42 (passou a ser usada)                                             |
| 5b  | Registros profissionais escritos em três arquivos                                         | corrigido no PR #45                                                                  |
| 5c  | Endereços do Google (avaliações e mapa) no código                                         | mantido: dado público e fixo, como o endereço; decisão registrada no próprio arquivo |
| 6   | Cartão de depoimento recebe foco sem ser interativo                                       | adiado: muda a interação da seção; fica com as avaliações reais (backlog)            |
| 7   | Duplicação: ramos dos cantos, formas orgânicas, espera da rolagem no e2e                  | corrigido no PR #45                                                                  |
| 8   | `Footer` com seis responsabilidades                                                       | corrigido no PR #45                                                                  |
| 9   | Prop `description` sem uso no `SectionHeading`                                            | corrigido no PR #45                                                                  |
| 10  | 55 verificações de teste presas a nomes de classe                                         | adiado: é trabalho próprio, não limpeza (backlog)                                    |
| 11  | Cinco `className` com mais de 300 caracteres                                              | adiado: ganho de leitura discutível; decidir antes de mexer (backlog)                |
| 12a | `CLAUDE.md` desatualizado em dois pontos                                                  | corrigido no PR #45                                                                  |
| 12b | `@min-[320px]` no hero, contra a regra de não usar `px`                                   | **achado errado**: o `px` é intencional e protegido por teste; exceção documentada   |
| 13a | Limite de cobertura do CI em 90%, com o projeto em 100%                                   | corrigido no PR #46                                                                  |
| 13b | SonarCloud sem token, sem `.coderabbit.yaml`, CI rodando duas vezes em alguns pushes      | adiado: dependem de cadastro em serviço externo ou do repositório-modelo (backlog)   |

## Teste dos testes

Cada linha é um defeito colocado no código de propósito. "Pegou" quer dizer que algum teste
reprovou.

| Defeito injetado                        | Na auditoria | Depois das correções |
| --------------------------------------- | ------------ | -------------------- |
| WhatsApp sem codificar a mensagem       | pegou        | —                    |
| Abas sem dar a volta na ponta           | pegou        | —                    |
| Link externo sem `rel` de proteção      | pegou        | —                    |
| Qualquer tecla fecha o menu             | pegou        | —                    |
| Tela de erro nunca aparece              | pegou        | —                    |
| Destaque que não está no título         | pegou        | —                    |
| Imagem decorativa nunca carrega na hora | pegou        | —                    |
| Sempre cinco estrelas, qualquer nota    | **passou**   | pega                 |
| Texto da nota fixo em "5 de 5"          | não testado  | pega                 |
| Política de conteúdo sem `data:`        | —            | pega                 |
| Política de conteúdo sem estilo inline  | —            | pega                 |
| Política de conteúdo sem fonte          | —            | pega                 |

Foi uma amostra. Não prova que todos os outros testes são bons; mostra que a técnica acha
teste falho e vale repetir a cada módulo novo.

## O que a auditoria não cobriu

- Navegação real com teclado e leitor de tela (a auditoria manual de acessibilidade).
- Lighthouse contra o endereço de produção; só o do CI.
- O histórico do git: as imagens apagadas no PR #41 continuam nos commits antigos.
- Cabeçalhos de segurança e miniatura de compartilhamento **em produção**: só existem lá
  depois que a `chore/audit` chegar à `main`.

## Lições

Estão em [aprendizados.md](aprendizados.md), nas entradas de 2026-10-11 e 2026-10-12. As três
que mais valem levar para o próximo projeto:

1. Cobertura mede o que roda, não o que é usado nem se o teste distingue certo de errado.
2. Configuração que só vale na hospedagem (cabeçalhos, variáveis) precisa de um teste local
   que a simule.
3. Antes de "corrigir" uma exceção a uma regra, ler o comentário ao lado: o `320px` do hero
   era intencional.
