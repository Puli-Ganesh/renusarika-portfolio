import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './',
  build: { target: 'es2022' },
  test: { include: ['tests/**/*.test.ts'] },
});
