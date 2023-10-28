import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  build: {
    sourcemap: false,
    assetsInlineLimit: 0,
    target: ['firefox115', 'safari16', 'chrome110'],
    reportCompressedSize: true,
  },
  plugins: [svelte()],
  server: {
    open: '/',
  },
  preview: {
    port: 4173,
  },
});
