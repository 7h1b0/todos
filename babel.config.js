module.exports = (api) => {
  const addCoverage = api.env('coverage');
  const additionnalPlugins = [addCoverage && 'istanbul'].filter(Boolean);

  return {
    presets: ['@babel/preset-env'],
    plugins: [
      [
        '@babel/plugin-transform-react-jsx',
        {
          runtime: 'classic',
          pragma: 'h',
        },
      ],
      ...additionnalPlugins,
    ],
  };
};
