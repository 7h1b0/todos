import { sveltePreprocess } from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess(),
  compilerOptions: {
    cssHash: ({ hash, filename, css }) => `_${hash(filename ?? css)}`,
  },
};
