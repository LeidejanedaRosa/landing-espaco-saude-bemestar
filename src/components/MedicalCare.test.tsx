import { render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MedicalCare } from './MedicalCare';

describe('MedicalCare', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '5500000000000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('é a seção de destino do link "#atendimento-medico" e se identifica pela frase de destaque', () => {
    render(<MedicalCare />);

    const section = screen.getByRole('region', { name: /consultas integrativas/i });

    expect(section).toHaveAttribute('id', 'atendimento-medico');
    expect(within(section).getByText('Atendimento médico')).toBeInTheDocument();
  });

  it('identifica a médica pelo nome e pelo registro no conselho', () => {
    render(<MedicalCare />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Dra. Veronika Baptista');
    expect(screen.getByText('CRM MG 98407')).toBeInTheDocument();
  });

  it('lista as três especialidades, cada uma com a sua descrição', () => {
    render(<MedicalCare />);

    const terms = screen.getAllByRole('term').map((term) => term.textContent);
    const descriptions = screen.getAllByRole('definition');

    expect(terms).toEqual(['Ortomolecular', 'Reumatologia', 'Endocrinologia']);
    expect(descriptions).toHaveLength(3);
    for (const description of descriptions) {
      expect(description.textContent?.length).toBeGreaterThan(40);
    }
  });

  it('o botão leva ao WhatsApp para agendar uma consulta médica', () => {
    render(<MedicalCare />);

    const link = screen.getByRole('link', { name: /agendar consulta médica/i });
    const url = new URL(link.getAttribute('href') ?? '');

    expect(url.origin + url.pathname).toBe('https://wa.me/5500000000000');
    expect(url.searchParams.get('text')).toBe('Olá! Gostaria de agendar uma consulta médica.');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('mostra a foto da médica com descrição, carregada sob demanda', () => {
    render(<MedicalCare />);

    const photo = screen.getByRole('img', { name: /dra\. veronika baptista/i });

    expect(photo).toHaveAttribute('loading', 'lazy');
    expect(photo).toHaveAttribute('width');
    expect(photo).toHaveAttribute('height');
  });

  it('os ícones das especialidades são só enfeite', () => {
    render(<MedicalCare />);

    const icons = screen
      .getAllByRole('term')
      .map((term) => term.parentElement?.querySelector('svg'));

    expect(icons).toHaveLength(3);
    for (const icon of icons) expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('é complementar à seção da Luiza: o botão é vazado', () => {
    render(<MedicalCare />);

    const link = screen.getByRole('link', { name: /agendar consulta médica/i });

    expect(link).toHaveClass('border');
    expect(link).not.toHaveClass('bg-olive-deep');
  });

  it('no HTML, o botão vem depois das especialidades: ler antes de agir', () => {
    render(<MedicalCare />);

    const lastTerm = screen.getAllByRole('term')[2];
    const link = screen.getByRole('link', { name: /agendar consulta médica/i });

    expect(lastTerm.compareDocumentPosition(link) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
