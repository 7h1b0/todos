import { defineConfig } from 'cypress';

export default defineConfig({
  video: true,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  e2e: {
    baseUrl: 'http://localhost:4173',
  },
});
