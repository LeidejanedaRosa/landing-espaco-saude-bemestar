import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Audience } from './Audience';

describe('Audience', () => {
  it('se identifica pela pergunta aprovada pela cliente', () => {
    render(<Audience />);

    const section = screen.getByRole('region', { name: 'Para quem o pilates é indicado?' });

    expect(section).toHaveAttribute('id', 'para-quem');
  });

  it('lista os seis públicos, na ordem aprovada', () => {
    render(<Audience />);

    const names = within(screen.getByRole('list'))
      .getAllByRole('listitem')
      .map((item) => item.textContent);

    expect(names).toEqual([
      'Idosos',
      'Adultos em geral',
      'Gestantes',
      'Pessoas em reabilitação',
      'Atletas',
      'Praticantes de atividade física'
    ]);
  });

  it('os ícones são só enfeite: o nome do público é o que o leitor de tela lê', () => {
    render(<Audience />);

    for (const item of screen.getAllByRole('listitem')) {
      expect(item.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    }
  });

  it('os ramos dos cantos são só enfeite e ficam atrás do conteúdo, sem receber cliques', () => {
    const { container } = render(<Audience />);

    const fronds = [...container.querySelectorAll('img')];

    expect(fronds).toHaveLength(4);
    for (const frond of fronds) {
      expect(frond).toHaveAttribute('alt', '');
      expect(frond).toHaveClass('pointer-events-none', '-z-10');
    }
  });
});
