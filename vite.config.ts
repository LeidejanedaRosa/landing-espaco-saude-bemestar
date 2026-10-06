import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'vitest/config';

const REQUIRED_ENV = ['VITE_SITE_URL', 'VITE_WHATSAPP_NUMBER', 'VITE_INSTAGRAM_URL'];

function assertRequiredEnv(mode: string) {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const missing = REQUIRED_ENV.filter((name) => !env[name]);

  if (missing.length > 0) {
    throw new Error(
      `Variáveis de ambiente ausentes: ${missing.join(', ')}. ` +
        'Copie .env.example para .env e preencha (na Vercel: Settings → Environment Variables).'
    );
  }
}

export default defineConfig(({ mode }) => {
  // Os testes unitários definem as variáveis de que precisam com vi.stubEnv.
  if (mode !== 'test') assertRequiredEnv(mode);

  return {
    plugins: [react(), tailwindcss(), imagetools()],
    test: {
      environment: 'jsdom',
      setupFiles: ['src/test/setup.ts'],
      include: ['src/**/*.test.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
        // entry-client só liga o React ao DOM real; quem cobre esse caminho é o e2e.
        exclude: ['src/entry-client.tsx', 'src/test/**', 'src/**/*.test.{ts,tsx}', 'src/**/*.d.ts'],
        // lcov é o formato que o SonarCloud lê para mostrar a cobertura.
        reporter: ['text', 'html', 'lcov'],
        thresholds: { statements: 90, branches: 90, functions: 90, lines: 90 }
      }
    }
  };
});
