module.exports = {
  presets: ['@babel/preset-modules'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'h',
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
