import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Methodology } from './Methodology';

describe('Methodology', () => {
  it('é a seção de destino do link "#metodologia" e se identifica pelo próprio título', () => {
    render(<Methodology />);

    const section = screen.getByRole('region', { name: 'Técnica científica com cuidado humano' });

    expect(section).toHaveAttribute('id', 'metodologia');
    expect(within(section).getByText('Nossa metodologia')).toBeInTheDocument();
  });

  it('apresenta as quatro etapas em lista ordenada, na ordem aprovada', () => {
    render(<Methodology />);

    const list = screen.getByRole('list');
    const titles = within(list)
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);

    expect(list.tagName).toBe('OL');
    expect(titles).toEqual([
      'Avaliação Inicial',
      'Plano Personalizado',
      'Acompanhamento Próximo',
      'Reavaliação Contínua'
    ]);
  });

  it('cada etapa tem descrição, e o número grande é só enfeite', () => {
    render(<Methodology />);

    for (const item of screen.getAllByRole('listitem')) {
      expect(item.querySelector('p')?.textContent?.length).toBeGreaterThan(60);
      expect(item.querySelector('span')).toHaveAttribute('aria-hidden', 'true');
    }
  });

  it('usa o texto da primeira etapa exatamente como aprovado', () => {
    render(<Methodology />);

    expect(
      screen.getByText(
        'Análise completa do histórico médico, avaliação postural, testes de força, flexibilidade e equilíbrio para entender suas necessidades específicas.'
      )
    ).toBeInTheDocument();
  });

  it('fecha com o compromisso do espaço', () => {
    render(<Methodology />);

    expect(screen.getByText('Compromisso com a excelência:')).toBeInTheDocument();
    expect(
      screen.getByText(/garantindo que cada sessão seja produtiva e agradável/)
    ).toBeInTheDocument();
  });

  it('a ilustração tem descrição e carrega sob demanda', () => {
    render(<Methodology />);

    const image = screen.getByRole('img', { name: /ilustração de uma profissional/i });

    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('o compromisso vai em um quadro próprio, com ícone decorativo, e não em uma linha solta', () => {
    render(<Methodology />);

    const box = screen.getByText('Compromisso com a excelência:').closest('p') as HTMLElement;

    expect(box).toHaveClass('border', 'rounded-2xl');
    expect(box.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('no HTML o título vem antes da ilustração, e as etapas antes do compromisso', () => {
    render(<Methodology />);

    const title = screen.getByRole('heading', { level: 2 });
    const image = screen.getByRole('img', { name: /ilustração de uma profissional/i });
    const list = screen.getByRole('list');
    const commitment = screen.getByText('Compromisso com a excelência:');
    const follows = (first: Element, second: Element) =>
      Boolean(first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING);

    expect(follows(title, image)).toBe(true);
    expect(follows(image, list)).toBe(true);
    expect(follows(list, commitment)).toBe(true);
  });
});
