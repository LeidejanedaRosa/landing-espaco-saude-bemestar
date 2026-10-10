import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Testimonials } from './Testimonials';
import { GOOGLE_REVIEWS_URL, TESTIMONIALS } from './testimonialsList';

describe('Testimonials', () => {
  it('é a seção de destino do link "#depoimentos", com o título aprovado pela cliente', () => {
    render(<Testimonials />);

    const section = screen.getByRole('region', { name: 'O que dizem sobre nós' });

    expect(section).toHaveAttribute('id', 'depoimentos');
  });

  it('mostra um cartão por depoimento, com o nome, a nota e o texto em uma citação', () => {
    render(<Testimonials />);

    const cards = within(screen.getAllByRole('list')[0]).getAllByRole('listitem');

    expect(cards).toHaveLength(TESTIMONIALS.length);
    for (const [index, card] of cards.entries()) {
      const testimonial = TESTIMONIALS[index];
      expect(within(card).getByRole('heading', { level: 3 })).toHaveTextContent(testimonial.name);
      expect(within(card).getByText(`Nota ${testimonial.rating} de 5`)).toBeInTheDocument();
      expect(card.querySelector('blockquote')).toHaveTextContent(testimonial.text);
    }
  });

  it('desenha uma estrela por ponto da nota, só de enfeite', () => {
    render(<Testimonials />);

    const first = within(screen.getAllByRole('list')[0]).getAllByRole('listitem')[0];
    const stars = first.querySelectorAll('p svg');

    expect(stars).toHaveLength(TESTIMONIALS[0].rating);
    for (const star of stars) expect(star).toHaveAttribute('aria-hidden', 'true');
  });

  it('o cartão recebe foco, para abrir pelo teclado e não só com o mouse', () => {
    render(<Testimonials />);

    for (const card of within(screen.getAllByRole('list')[0]).getAllByRole('listitem')) {
      expect(card).toHaveAttribute('tabindex', '0');
    }
  });

  it('a foto é decorativa: quem é a pessoa já está no nome, logo abaixo', () => {
    render(<Testimonials />);

    const photos = [...screen.getAllByRole('list')[0].querySelectorAll('picture img')];

    expect(photos).toHaveLength(TESTIMONIALS.length);
    for (const photo of photos) {
      expect(photo).toHaveAttribute('alt', '');
      expect(photo).toHaveAttribute('loading', 'lazy');
    }
  });

  it('as folhagens espalhadas são só enfeite e não recebem cliques', () => {
    render(<Testimonials />);

    const leaves = screen
      .getByRole('region', { name: 'O que dizem sobre nós' })
      .querySelectorAll('img[aria-hidden="true"].pointer-events-none');

    expect(leaves.length).toBeGreaterThanOrEqual(4);
  });

  it('leva a todas as avaliações no Google, em nova aba e com proteção', () => {
    render(<Testimonials />);

    const link = screen.getByRole('link', { name: /ver todas as avaliações no google/i });

    expect(link).toHaveAttribute('href', GOOGLE_REVIEWS_URL);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('o endereço das avaliações é o perfil do studio no Google Maps, sem parâmetros de rastreio', () => {
    const url = new URL(GOOGLE_REVIEWS_URL);

    expect(url.hostname).toBe('www.google.com');
    expect(url.pathname).toContain('/maps/place/');
    expect([...url.searchParams.keys()]).toEqual(['hl']);
  });

  // As avaliações atuais repetem a da Leidejane, com um texto marcador, só para aprovar o
  // layout. A landing não vai para a `main` com elas (ver docs/backlog.md).
  it.todo('trocar as avaliações provisórias pelas reais, com o consentimento de cada pessoa');
});
