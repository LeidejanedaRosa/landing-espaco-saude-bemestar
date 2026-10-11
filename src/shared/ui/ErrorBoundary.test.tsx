import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

function BrokenSection(): never {
  throw new Error('falha simulada');
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // O React registra no console todo erro capturado; aqui o erro é esperado.
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('mostra o conteúdo normalmente quando nada quebra', () => {
    render(
      <ErrorBoundary fallback={<p>tela de erro</p>}>
        <p>conteúdo da página</p>
      </ErrorBoundary>
    );

    expect(screen.getByText('conteúdo da página')).toBeInTheDocument();
    expect(screen.queryByText('tela de erro')).not.toBeInTheDocument();
  });

  it('troca o conteúdo pela tela de erro quando um componente filho quebra', () => {
    render(
      <ErrorBoundary fallback={<p>tela de erro</p>}>
        <p>conteúdo da página</p>
        <BrokenSection />
      </ErrorBoundary>
    );

    expect(screen.getByText('tela de erro')).toBeInTheDocument();
    expect(screen.queryByText('conteúdo da página')).not.toBeInTheDocument();
  });
});
