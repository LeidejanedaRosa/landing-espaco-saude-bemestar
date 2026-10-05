import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      // entry-client só liga o React ao DOM real; quem cobre esse caminho é o e2e.
      exclude: ['src/entry-client.tsx', 'src/test/**', 'src/**/*.test.{ts,tsx}'],
      reporter: ['text', 'html'],
      thresholds: { statements: 90, branches: 90, functions: 90, lines: 90 }
    }
  }
});
