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

  it('só ocupa a tela inteira quando pedido', () => {
    expect(renderSection().className).not.toContain('min-h');
  });

  it('em tela cheia, desconta a altura do header', () => {
    expect(renderSection(true).className).toContain('100dvh-var(--spacing-header)');
  });
});
