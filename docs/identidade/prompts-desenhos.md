# Prompts dos desenhos em traço

Um desenho decorativo por seção, no estilo do traço da recepção do studio ("Acredite! O
movimento cura"). As regras de uso estão no [CLAUDE.md](../../CLAUDE.md) e o motivo dos
formatos na [decisão 0004](../decisoes/0004-formatos-de-imagem.md).

## Como gerar

1. Anexe a imagem de referência ao gerador, se ele aceitar imagem como referência de estilo:
   `src/assets/images/movimento-cura-centralizado.png`.
2. Cole o **prompt base** e, logo depois, a **linha da pose** do desenho que quer gerar.
3. Gere todos na mesma conversa ou sessão, um por vez. Isso ajuda o traço a sair parecido
   entre eles.
4. Confira o resultado com a lista "O que conferir" antes de salvar.

## Especificação de cada arquivo

| Item                 | Valor                                                                    |
| -------------------- | ------------------------------------------------------------------------ |
| Formato de entrega   | PNG                                                                      |
| Fundo                | transparente; se o gerador não fizer, branco puro `#FFFFFF`, sem textura |
| Cor do traço         | preto puro `#000000` (a cor final é aplicada depois, no SVG)             |
| Espessura do traço   | fina e uniforme, a mesma em todos os desenhos                            |
| Tamanho              | lado maior com pelo menos 2048 px                                        |
| Proporção            | a indicada na tabela de poses                                            |
| Enquadramento        | figura inteira, centralizada, com cerca de 10% de margem em toda a volta |
| Texto, moldura, chão | nenhum                                                                   |
| Onde salvar          | `design/originais/`, com o nome indicado na tabela de poses              |

Os PNGs são arquivos originais: não são servidos no site. Cada um será vetorizado para SVG
antes de entrar em `src/assets`.

## Prompt base

```
Minimalist continuous one-line drawing of a woman doing a pilates movement. A single thin,
unbroken black line of uniform weight, hand-drawn with a loose and simple feel, like a pencil
or fine pen sketch. The line crosses over itself in a few small loops. Faceless figure: no
eyes, nose or mouth. Hair tied in a bun. She wears a sports top and leggings, suggested only by
a few contour lines. Outline only: no fill, no shading, no color, no gradients, no texture.
Full body visible, centered, with generous empty margin around it. Transparent background.
No text, no letters, no frame, no floor line, no equipment, no shadow.
```

## Pose de cada seção

Acrescente a linha da pose ao final do prompt base.

| Seção              | Arquivo                 | Proporção | Linha da pose                                                                                                                                           |
| ------------------ | ----------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero               | `traco-guerreira.png`   | 3:4       | _Pronto: é o desenho da recepção, recortado sem a frase e já vetorizado._                                                                               |
| Studio / aparelhos | `traco-alongamento.png` | 4:3       | `Pose: seated on the floor, legs extended straight forward, torso folding forward, both arms reaching toward the feet. Side view.`                      |
| Serviços           | `traco-inclinacao.png`  | 3:4       | `Pose: standing, feet together, one arm stretched overhead, torso bending sideways in a long arc, the other arm relaxed along the body. Front view.`    |
| Sobre a Luiza      | `traco-equilibrio.png`  | 3:4       | `Pose: standing balanced on one leg, the other knee lifted to hip height, both arms open to the sides at shoulder height. Side view.`                   |
| Atendimento médico | `traco-sentada.png`     | 1:1       | `Pose: seated cross-legged on the floor, spine tall and upright, hands resting on the knees, calm posture. Front view.`                                 |
| Metodologia        | `traco-cisne.png`       | 4:3       | `Pose: lying face down, legs extended back, chest lifted off the floor with arms straight and hands pressing down, gaze forward. Side view.`            |
| Para quem é        | `traco-ponte.png`       | 4:3       | `Pose: lying on her back, knees bent, feet on the floor, hips lifted high in a bridge, arms resting along the body. Side view.`                         |
| Depoimentos        | `traco-teaser.png`      | 1:1       | `Pose: balancing on her sit bones in a V shape, legs straight and lifted diagonally, arms reaching forward parallel to the legs. Side view.`            |
| Contato            | `traco-sereia.png`      | 1:1       | `Pose: seated on one hip with both legs folded to the same side, one hand on the floor, the other arm sweeping overhead in a side stretch. Front view.` |

As proporções acompanham a pose: 3:4 para figura em pé, 4:3 para figura deitada, 1:1 para
figura sentada.

## O que conferir antes de salvar

- [ ] A figura inteira aparece, sem corte, com margem em toda a volta
- [ ] O traço é uma linha fina só, sem preenchimento, sombra ou cor
- [ ] A figura não tem rosto e o cabelo está em coque
- [ ] Não há texto, letras soltas, moldura, chão nem aparelho
- [ ] Mãos e pés têm formato plausível (é onde os geradores mais erram)
- [ ] A espessura do traço bate com a dos desenhos já aprovados
- [ ] O fundo é transparente ou branco puro

Se o traço sair grosso ou detalhado demais, acrescente ao final: `Even thinner line, fewer
details, more negative space.`
