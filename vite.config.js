import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
  root: 'src',
  build: {
    assetsInlineLimit: 0,
    target: ['firefox91', 'safari14', 'chrome90'],
    reportCompressedSize: false,
  },
  plugins: [
    svelte(),
    istanbul({
      include: 'src/*',
      cypress: true,
    }),
  ],
  server: {
    open: '/',
  },
});
