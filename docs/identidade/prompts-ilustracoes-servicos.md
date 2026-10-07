# Prompts das ilustrações de serviço

As bonecas coloridas são a arte da fachada do studio: figuras em cores chapadas nos adesivos
das portas de vidro. No site elas ilustram os serviços. As regras de uso estão no
[CLAUDE.md](../../CLAUDE.md).

## O que já existe e o que falta

| Serviço                     | Arquivo em `design/originais/`   | Situação                                                                                               |
| --------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Fisioterapia                | `servico-fisioterapia.png`       | pronta, no estilo da fachada                                                                           |
| Treinamento Funcional       | `servico-funcional.png`          | pronta, no estilo da fachada                                                                           |
| Pilates Clínico e Funcional | `servico-pilates.png`            | colorida por código com as cores da fachada; baixa resolução (429px) e com contorno preto: **refazer** |
| Massoterapia                | `servico-massoterapia.png`       | estilo diferente (tons pastel, traço fino, cenário): **refazer**                                       |
| Atendimento Médico          | `servico-atendimento-medico.png` | estilo diferente: **refazer**                                                                          |

## Como gerar

1. Anexe ao gerador, como referência de estilo, `servico-fisioterapia.png` e
   `servico-funcional.png`. São as que reproduzem a fachada.
2. Cole o **prompt base** e, logo depois, a **linha da cena**.
3. Gere as três na mesma conversa, uma por vez, para os personagens saírem parecidos.
4. Confira com a lista "O que conferir" antes de salvar.

## Especificação de cada arquivo

| Item               | Valor                                                                    |
| ------------------ | ------------------------------------------------------------------------ |
| Formato de entrega | PNG                                                                      |
| Fundo              | transparente; se o gerador não fizer, branco puro `#FFFFFF`, sem textura |
| Tamanho            | lado maior com pelo menos 1600 px                                        |
| Proporção          | 4:3 (paisagem), a mesma do painel do cartão                              |
| Enquadramento      | cena centralizada, com cerca de 8% de margem em toda a volta             |
| Texto e moldura    | nenhum                                                                   |
| Onde salvar        | `design/originais/`, com o mesmo nome do arquivo que será substituído    |

## Prompt base

```
Flat vector illustration in a clean, friendly style. Solid flat colors only: no outlines, no
gradients, no shading, no texture. Simple rounded shapes. Characters with minimal faces (small
dots for eyes, a simple smile) and simplified hands. Color palette: teal green for the
professional's uniform, navy blue, warm orange, soft pink, light blue, natural skin tones and
dark brown hair. The professional is a woman with dark hair in a bun, wearing a teal scrub top
and teal trousers. Only the people and the essential furniture: no room, no wall, no floor, no
background objects. Transparent background. No text, no letters, no logo, no frame.
```

## Cena de cada serviço

| Serviço                     | Linha da cena                                                                                                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pilates Clínico e Funcional | `Scene: the professional stands behind a patient who sits on a large green exercise ball, gently supporting the patient's shoulders while the patient extends both arms forward. Side view.`        |
| Massoterapia                | `Scene: the professional stands beside a massage table with a navy blue frame, massaging the back of a patient who lies face down, covered from the waist down with a light blue towel. Side view.` |
| Atendimento Médico          | `Scene: a female doctor wearing a white coat over the teal uniform, holding a clipboard, talks to a patient who sits on an examination table with a navy blue frame. Both smiling. Side view.`      |

No Atendimento Médico a médica usa jaleco branco, para se distinguir da fisioterapeuta, mas
mantém o uniforme verde-água por baixo, para a série continuar reconhecível.

## O que conferir antes de salvar

- [ ] Cores chapadas, sem contorno, sem degradê e sem sombra
- [ ] A profissional é a mesma das outras ilustrações (cabelo em coque, uniforme verde-água)
- [ ] Sem cenário: só as pessoas e o móvel essencial
- [ ] Mãos e pés com formato plausível
- [ ] Sem texto, letras, logo ou moldura
- [ ] Fundo transparente ou branco puro
- [ ] As cenas ocupam área parecida entre si (nenhuma muito menor que as outras)
