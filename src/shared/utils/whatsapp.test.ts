import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildWhatsAppUrl, formatWhatsAppNumber } from './whatsapp';

describe('buildWhatsAppUrl', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '5500000000000');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('monta o link do wa.me com o número configurado no ambiente', () => {
    expect(buildWhatsAppUrl('Oi')).toBe('https://wa.me/5500000000000?text=Oi');
  });

  it('codifica espaços e acentos da mensagem', () => {
    expect(buildWhatsAppUrl('Olá! Quero agendar uma avaliação.')).toBe(
      'https://wa.me/5500000000000?text=Ol%C3%A1!%20Quero%20agendar%20uma%20avalia%C3%A7%C3%A3o.'
    );
  });

  it('codifica caracteres que quebrariam a URL, como & e #', () => {
    const url = new URL(buildWhatsAppUrl('Pilates & Fisio #1?'));

    expect(url.searchParams.get('text')).toBe('Pilates & Fisio #1?');
    expect([...url.searchParams.keys()]).toEqual(['text']);
    expect(url.hash).toBe('');
  });
});

describe('formatWhatsAppNumber', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('mostra o número de celular com DDI, DDD e hífen antes dos quatro últimos dígitos', () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '5535988960886');

    expect(formatWhatsAppNumber()).toBe('+55 35 98896-0886');
  });

  it('também funciona com número fixo, de oito dígitos', () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '553533312222');

    expect(formatWhatsAppNumber()).toBe('+55 35 3331-2222');
  });
});
