import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  build: {
    sourcemap: true,
    assetsInlineLimit: 0,
    target: ['firefox91', 'safari14', 'chrome90'],
    reportCompressedSize: false,
  },
  plugins: [svelte()],
  server: {
    open: '/',
  },
  preview: {
    port: 4173,
  },
});
