module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: 70,
          firefox: 60,
        },
      },
    ],
  ],
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
