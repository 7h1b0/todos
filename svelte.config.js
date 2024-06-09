import sveltePreprocess from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess(),
  compilerOptions: {
    cssHash: ({ hash, css }) => `_${hash(css)}`,
  },
};
