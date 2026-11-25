import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/CalculadoraIPV4',
  build: { assets: 'assets' },
  vite: { plugins: [tailwindcss()] },
});
