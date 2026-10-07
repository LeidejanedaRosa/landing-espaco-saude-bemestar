import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Services } from './Services';

const TAB_LABELS = ['Fisioterapia', 'Pilates', 'Funcional', 'Massoterapia', 'Atendimento médico'];

function renderServices() {
  render(<Services />);

  return {
    user: userEvent.setup(),
    tab: (name: string) => screen.getByRole('tab', { name }),
    // O jsdom não conhece `inert`; no navegador, o painel inativo some da árvore de acessibilidade.
    visiblePanel: () => {
      const active = screen
        .getAllByRole('tabpanel')
        .filter((panel) => !panel.hasAttribute('inert'));
      expect(active).toHaveLength(1);
      return active[0];
    }
  };
}

describe('Services', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '5500000000000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('é a seção de destino do link "#servicos", com o título aprovado pela cliente', () => {
    renderServices();

    const section = screen.getByRole('region', {
      name: 'O que Luiza Espaço Saúde e bem estar oferece?'
    });

    expect(section).toHaveAttribute('id', 'servicos');
  });

  it('mostra as cinco abas de uma vez, na ordem aprovada, com a primeira ativa', () => {
    const { tab } = renderServices();

    const labels = screen.getAllByRole('tab').map((element) => element.textContent);

    expect(labels).toEqual(TAB_LABELS);
    expect(tab('Fisioterapia')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getAllByRole('tab', { selected: true })).toHaveLength(1);
  });

  it('mostra um serviço por vez: clicar em uma aba troca o painel', async () => {
    const { user, tab, visiblePanel } = renderServices();

    expect(within(visiblePanel()).getByRole('heading', { level: 3 })).toHaveTextContent(
      'Fisioterapia'
    );

    await user.click(tab('Massoterapia'));

    expect(tab('Massoterapia')).toHaveAttribute('aria-selected', 'true');
    expect(tab('Fisioterapia')).toHaveAttribute('aria-selected', 'false');
    expect(within(visiblePanel()).getByRole('heading', { level: 3 })).toHaveTextContent(
      'Massoterapia'
    );
  });

  it('cada aba aponta para o seu painel, e o painel se identifica pela aba', async () => {
    const { user, tab, visiblePanel } = renderServices();

    await user.click(tab('Pilates'));

    expect(visiblePanel()).toHaveAttribute('id', tab('Pilates').getAttribute('aria-controls'));
    expect(visiblePanel()).toHaveAttribute('aria-labelledby', tab('Pilates').id);
  });

  it('mantém os cinco serviços no HTML, com os inativos inertes, para buscadores lerem', () => {
    renderServices();

    const panels = screen.getAllByRole('tabpanel');
    const names = panels.map((panel) => panel.querySelector('h3')?.textContent);

    expect(names).toEqual([
      'Fisioterapia',
      'Pilates Clínico e Funcional',
      'Treinamento Funcional',
      'Massoterapia',
      'Atendimento Médico'
    ]);
    expect(panels.filter((panel) => panel.hasAttribute('inert'))).toHaveLength(4);
  });

  it('só a aba ativa entra na ordem do Tab', () => {
    renderServices();

    const tabIndexes = screen.getAllByRole('tab').map((element) => element.tabIndex);

    expect(tabIndexes).toEqual([0, -1, -1, -1, -1]);
  });

  it('as setas trocam de aba levando o foco, e dão a volta nas pontas', async () => {
    const { user, tab } = renderServices();
    tab('Fisioterapia').focus();

    await user.keyboard('{ArrowRight}');
    expect(tab('Pilates')).toHaveFocus();
    expect(tab('Pilates')).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(tab('Atendimento médico')).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(tab('Fisioterapia')).toHaveFocus();
  });

  it('Home e End vão para a primeira e a última aba; outras teclas não fazem nada', async () => {
    const { user, tab } = renderServices();
    tab('Fisioterapia').focus();

    await user.keyboard('{End}');
    expect(tab('Atendimento médico')).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{Home}');
    expect(tab('Fisioterapia')).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('a');
    expect(tab('Fisioterapia')).toHaveAttribute('aria-selected', 'true');
  });

  it('cada serviço tem três itens, com o começo em destaque onde o texto é corrido', async () => {
    const { user, tab, visiblePanel } = renderServices();

    for (const label of TAB_LABELS) {
      await user.click(tab(label));
      expect(within(visiblePanel()).getAllByRole('listitem')).toHaveLength(3);
    }

    await user.click(tab('Fisioterapia'));
    const first = within(visiblePanel()).getAllByRole('listitem')[0];
    expect(first).toHaveTextContent(
      'Avaliação detalhada para entender dores, limitações e necessidades específicas.'
    );
    expect(first.querySelector('strong')).toHaveTextContent('Avaliação detalhada');
  });

  it('o botão de cada serviço abre o WhatsApp já dizendo qual serviço a pessoa quer', async () => {
    const { user, tab, visiblePanel } = renderServices();

    await user.click(tab('Pilates'));
    const link = within(visiblePanel()).getByRole('link', { name: /agendar pilates/i });
    const url = new URL(link.getAttribute('href') ?? '');

    expect(url.origin + url.pathname).toBe('https://wa.me/5500000000000');
    expect(url.searchParams.get('text')).toBe('Olá! Gostaria de agendar uma aula de pilates.');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('o atendimento médico lista as três especialidades, e não o texto de massoterapia', async () => {
    const { user, tab, visiblePanel } = renderServices();

    await user.click(tab('Atendimento médico'));
    const items = within(visiblePanel())
      .getAllByRole('listitem')
      .map((item) => item.textContent);

    expect(items).toEqual(['Ortomolecular', 'Reumatologia', 'Endocrinologia']);
    expect(visiblePanel()).toHaveTextContent('Dra. Veronika Baptista');
    expect(visiblePanel()).not.toHaveTextContent('massagem');
  });

  it('cada ilustração tem texto alternativo próprio', () => {
    renderServices();

    const alts = screen
      .getAllByRole('tabpanel', { hidden: true })
      .map((panel) => panel.querySelector('img')?.getAttribute('alt') ?? '');

    expect(new Set(alts).size).toBe(5);
    expect(alts.every((alt) => alt.startsWith('Ilustração'))).toBe(true);
  });

  it('fecha com o objetivo do espaço', () => {
    renderServices();

    expect(screen.getByText('Nosso objetivo:')).toBeInTheDocument();
  });
});
