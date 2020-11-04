module.exports = {
  root: true,
  parser: '@babel/eslint-parser',

  plugins: ['react', 'jsx-a11y', 'cypress'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:cypress/recommended',
  ],

  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
    'cypress/globals': true,
  },

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 10,
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      pragma: 'h',
      version: '16.8',
    },
  },

  rules: {
    'react/no-unknown-property': 'off', // prevents error with class vs className
    'react/prop-types': 'off',
  },
};
