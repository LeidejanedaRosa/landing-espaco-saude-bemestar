import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('tem um único título principal', () => {
    render(<HomePage />);

    const headings = screen.getAllByRole('heading', { level: 1 });

    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent('Saúde, movimento e bem-estar em um só espaço');
  });

  it('envolve o conteúdo em um landmark main', () => {
    render(<HomePage />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
