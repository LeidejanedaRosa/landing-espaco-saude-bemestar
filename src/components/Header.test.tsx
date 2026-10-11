import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Header } from './Header';

const navItems = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Contato', href: '#contato' }
];

function renderHeader() {
  render(<Header navItems={navItems} contentId="inicio" />);

  return {
    user: userEvent.setup(),
    menuButton: screen.getByRole('button', { name: /menu/i }),
    nav: screen.getByRole('navigation', { name: 'Principal', hidden: true })
  };
}

describe('Header', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '5500000000000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('lista os links de navegação recebidos, cada um para a sua seção', () => {
    const { nav } = renderHeader();

    const links = within(nav).getAllByRole('link', { hidden: true });

    expect(links.map((link) => [link.textContent, link.getAttribute('href')])).toEqual([
      ['Serviços', '#servicos'],
      ['Contato', '#contato']
    ]);
  });

  it('o logo leva ao início da página e diz isso ao leitor de tela', () => {
    renderHeader();

    const logoLink = screen.getByRole('link', { name: /ir para o início/i });

    expect(logoLink).toHaveAttribute('href', '#inicio');
  });

  it('oferece um atalho para pular direto ao conteúdo', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: 'Pular para o conteúdo' })).toHaveAttribute(
      'href',
      '#inicio'
    );
  });

  it('o botão Agendar abre o WhatsApp com a mensagem de agendamento preenchida', () => {
    renderHeader();

    const link = screen.getByRole('link', { name: /agendar/i });
    const url = new URL(link.getAttribute('href') ?? '');

    expect(url.origin + url.pathname).toBe('https://wa.me/5500000000000');
    expect(url.searchParams.get('text')).toBe('Olá! Gostaria de agendar uma avaliação.');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('o menu começa fechado e o botão informa esse estado', () => {
    const { menuButton, nav } = renderHeader();

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveAttribute('aria-controls', nav.id);
    expect(menuButton).toHaveAccessibleName('Abrir menu');
  });

  it('abre e fecha o menu pelo botão, atualizando estado e rótulo', async () => {
    const { user, menuButton } = renderHeader();

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(menuButton).toHaveAccessibleName('Fechar menu');

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('fecha o menu ao escolher um link, para não cobrir a seção de destino', async () => {
    const { user, menuButton } = renderHeader();

    await user.click(menuButton);
    await user.click(screen.getByRole('link', { name: 'Serviços' }));

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('fecha com Esc e devolve o foco ao botão do menu', async () => {
    const { user, menuButton } = renderHeader();

    await user.click(menuButton);
    await user.click(screen.getByRole('link', { name: 'Contato' }));
    await user.click(menuButton);
    await user.tab();
    await user.keyboard('{Escape}');

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveFocus();
  });
});
