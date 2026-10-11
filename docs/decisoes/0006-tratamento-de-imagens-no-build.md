# 0006 — Imagens tratadas no build com vite-imagetools

- **Data:** 2026-10-05
- **Status:** aceita

## Contexto

A [decisão 0004](0004-formatos-de-imagem.md) definiu os formatos: fotos e ilustrações em AVIF
com WebP de reserva, em mais de um tamanho, e PNG/JPEG apenas como arquivo original. Faltava
definir como os arquivos servidos são produzidos.

## Decisão

O plugin `vite-imagetools` gera os arquivos durante o build, a partir do original:

```
design/originais/logo.png
        │  import logo from '.../logo.png?w=160;320;455&format=avif;webp&as=picture'
        ▼
dist/assets/logo-*.avif (3 tamanhos) + logo-*.webp (3 tamanhos)
        │
        ▼
<Picture image={logo} alt="..." sizes="10rem" />   →   <picture> com <source> e <img>
```

O componente `Picture` (`src/shared/ui`) concentra as regras: carregamento lento por padrão,
`priority` para a imagem principal da primeira tela, `width`/`height` sempre declarados.

## Alternativas consideradas

- **Converter à mão e versionar os arquivos gerados:** são arquivos derivados; versioná-los
  cria duas fontes de verdade, como acontecia com o `dist`.
- **Script próprio com `sharp` antes do build:** funciona, mas exige passo extra antes do
  `dev`, do `typecheck` e dos testes, e arquivos gerados fora do controle do Vite.

## Consequências

- Só o original é versionado; trocar uma imagem é trocar um arquivo.
- Os tamanhos pedidos na query (`w=`) nunca devem passar da largura do original: o plugin não
  amplia a imagem.
- O logo é servido como imagem rasterizada porque só existe em PNG de 455px, com degradês que
  não vetorizam bem. Se a cliente fornecer o logo em vetor, ele passa a ser SVG.
- A vetorização dos desenhos em traço (PNG → SVG) não passa por este fluxo e será tratada
  quando os desenhos forem gerados.
