import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'es2022',
    rolldownOptions: {
      output: {
        codeSplitting: { groups: [
          { name: 'three', test: /node_modules\/three/ },
          { name: 'motion', test: /node_modules\/(gsap|lenis)/ },
        ] },
      },
    },
  },
  test: { include: ['tests/**/*.test.ts'] },
});
