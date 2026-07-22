import { sveltePreprocess } from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess(),
  compilerOptions: {
    runes: true,
    cssHash: ({ hash, filename, css }) => `_${hash(filename ?? css)}`,
  },
};
