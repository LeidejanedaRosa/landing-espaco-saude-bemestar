# 0004 — Formatos de imagem e carregamento lento

- **Data:** 2026-10-05
- **Status:** aceita

## Contexto

A landing antiga servia 21 MB de PNG, com arquivos de até 2 MB. A nova terá fotos, um desenho
decorativo em traço por seção e o logo, todos gerados ou tratados a partir de prompts.

## Decisão

Não existe um formato único ideal; o formato depende do tipo de imagem.

| Tipo                           | Formato                 | Motivo                                                                          |
| ------------------------------ | ----------------------- | ------------------------------------------------------------------------------- |
| Desenho em traço, logo, ícones | SVG                     | É vetor: nítido em qualquer tamanho, poucos KB, cor trocável editando o arquivo |
| Fotos                          | AVIF + WebP de reserva  | AVIF é o menor arquivo para a mesma qualidade; WebP cobre navegadores antigos   |
| PNG / JPEG                     | apenas arquivo original | Pesados; servem como matriz para gerar os outros formatos                       |

- Imagens fora da primeira tela usam `loading="lazy"`; a imagem principal do hero é a exceção.
- Fundos decorativos são `<img>` posicionadas, não `background-image`, porque só `<img>` tem
  carregamento lento nativo.

## Consequências

- Geradores de imagem entregam PNG. Os desenhos em traço precisam ser vetorizados para SVG, e
  as fotos convertidas para AVIF/WebP em mais de um tamanho. A ferramenta de conversão será
  escolhida na branch que tratar as primeiras imagens.
- **Um SVG exibido por `<img>` não herda a cor do CSS da página:** ele é um documento isolado, e
  `currentColor` dentro dele vira preto. Como os fundos decorativos são `<img>`, cada SVG define
  a cor do traço no próprio arquivo. Se uma seção precisar de outra cor (por exemplo, traço
  claro perto do footer escuro), gera-se uma variante do arquivo com essa cor.
- Recolorir por CSS só funciona com o SVG embutido no HTML (inline), o que abre mão do
  carregamento lento nativo. Fica como alternativa caso as variantes por arquivo se
  multipliquem.
