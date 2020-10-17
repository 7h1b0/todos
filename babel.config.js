module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'classic',
        pragma: 'h',
      },
    ],
  ],
};
