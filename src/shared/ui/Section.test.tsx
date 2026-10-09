import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Section } from './Section';

function renderSection(fullScreen?: boolean) {
  render(
    <Section id="servicos" labelledBy="servicos-titulo" fullScreen={fullScreen}>
      <h2 id="servicos-titulo">Serviços</h2>
    </Section>
  );

  return screen.getByRole('region', { name: 'Serviços' });
}

describe('Section', () => {
  it('é o destino do link do menu e se identifica pelo próprio título', () => {
    expect(renderSection()).toHaveAttribute('id', 'servicos');
  });

  it('aplica o respiro vertical padrão, o mesmo em toda seção', () => {
    const section = renderSection();

    expect(section.firstElementChild).toHaveClass('py-section');
  });

  it('o conteúdo surge ao entrar na tela, em toda seção', () => {
    const section = renderSection();

    expect(section.firstElementChild).toHaveClass('reveal-on-scroll');
  });

  it('recorta o que passa dela, para o conteúdo ainda deslocado não aumentar a página', () => {
    expect(renderSection(true)).toHaveClass('overflow-clip');
  });

  it('só ocupa a tela inteira quando pedido', () => {
    expect(renderSection().className).not.toContain('min-h');
  });

  it('em tela cheia, usa a altura padrão do tema (a tela menos o header, com teto)', () => {
    expect(renderSection(true)).toHaveClass('min-h-fullscreen');
  });
});
