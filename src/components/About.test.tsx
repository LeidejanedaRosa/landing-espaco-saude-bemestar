import { render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { About } from './About';

describe('About', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '5500000000000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('é a seção de destino do link "#sobre" e se identifica pela frase de destaque', () => {
    render(<About />);

    const section = screen.getByRole('region', { name: /atendimento individualizado/i });

    expect(section).toHaveAttribute('id', 'sobre');
    expect(within(section).getByText('Sobre a Luiza')).toBeInTheDocument();
  });

  it('traz a apresentação em primeira pessoa, com o texto aprovado pela cliente', () => {
    render(<About />);

    expect(
      screen.getByText(/^Sou a Luiza, formada em Fisioterapia há 10 anos/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/^Minha prática une conhecimento científico atualizado/)
    ).toBeInTheDocument();
  });

  it('identifica a profissional pelo nome completo e pelo registro no conselho', () => {
    render(<About />);

    expect(screen.getByText('Dra. Luiza Rafaela de Castro Dolabella')).toBeInTheDocument();
    expect(screen.getByText('CREFITO 4 MG 213042-F')).toBeInTheDocument();
  });

  it('mostra a foto dela com descrição, carregada sob demanda', () => {
    render(<About />);

    const photo = screen.getByRole('img', { name: /luiza/i });

    expect(photo).toHaveAttribute('loading', 'lazy');
    expect(photo).toHaveAttribute('width');
    expect(photo).toHaveAttribute('height');
  });

  it('lista as seis certificações, na ordem aprovada, cada uma com título e descrição', () => {
    render(<About />);

    const list = screen.getByRole('list', { name: 'Certificações e qualificações' });
    const items = within(list).getAllByRole('listitem');
    const titles = items.map((item) => within(item).getByRole('heading', { level: 4 }).textContent);

    expect(titles).toEqual([
      'Fisioterapia',
      'Disfunções Musculoesqueléticas',
      'Pilates Clínico e Funcional',
      'Hidroterapia e Fisiologia',
      'Terapias Manuais Avançadas',
      'Raciocínio Clínico Avançado'
    ]);
    for (const item of items) {
      expect(item.querySelector('p')?.textContent?.length).toBeGreaterThan(40);
    }
  });

  it('os ícones das certificações são só enfeite', () => {
    render(<About />);

    const icons = screen
      .getByRole('list', { name: 'Certificações e qualificações' })
      .querySelectorAll('svg');

    expect(icons).toHaveLength(6);
    for (const icon of icons) expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('mantém a hierarquia de títulos: seção (h2), certificações (h3), cada uma (h4)', () => {
    render(<About />);

    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Certificações e qualificações'
    );
    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(6);
  });

  it('o botão leva ao WhatsApp para agendar uma avaliação', () => {
    render(<About />);

    const link = screen.getByRole('link', { name: /agendar avaliação/i });
    const url = new URL(link.getAttribute('href') ?? '');

    expect(url.origin + url.pathname).toBe('https://wa.me/5500000000000');
    expect(url.searchParams.get('text')).toBe('Olá! Gostaria de agendar uma avaliação.');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('é a seção de maior destaque: o botão é o cheio para fundo escuro, dentro do bloco verde', () => {
    render(<About />);

    const link = screen.getByRole('link', { name: /agendar avaliação/i });

    expect(link).toHaveClass('bg-cream');
    expect(link.closest('.bg-olive-deep')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2 }).closest('.bg-olive-deep')).not.toBeNull();
  });

  it('as certificações ficam fora do bloco verde', () => {
    render(<About />);

    const list = screen.getByRole('list', { name: 'Certificações e qualificações' });

    expect(list.closest('.bg-olive-deep')).toBeNull();
  });
});
