import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  build: {
    sourcemap: true,
    assetsInlineLimit: 0,
    target: ['firefox91', 'safari15', 'chrome100'],
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
