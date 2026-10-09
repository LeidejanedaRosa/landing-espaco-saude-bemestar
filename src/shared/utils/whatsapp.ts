export function buildWhatsAppUrl(message: string): string {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Número do studio para leitura, a partir dos dígitos da variável de ambiente
 * (DDI + DDD + número): "5535988960886" vira "+55 35 98896-0886".
 */
export function formatWhatsAppNumber(): string {
  const digits = import.meta.env.VITE_WHATSAPP_NUMBER;
  const country = digits.slice(0, 2);
  const area = digits.slice(2, 4);
  const local = digits.slice(4);

  return `+${country} ${area} ${local.slice(0, -4)}-${local.slice(-4)}`;
}
