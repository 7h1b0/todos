const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = () => {
  const isProd = ['production', 'coverage'].includes(process.env.NODE_ENV);

  return {
    mode: isProd ? 'production' : 'development',
    entry: './src',
    target: 'web',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name]-[contenthash].js',
      pathinfo: !isProd,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js/i,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      alias: {
        components: path.join(__dirname, 'src/components/'),
        utils: path.join(__dirname, 'src/utils/'),
        contexts: path.join(__dirname, 'src/contexts/'),
      },
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            ecma: 2018,
            compress: {
              pure_getters: true,
              unsafe: true,
              booleans_as_integers: false,
              drop_console: true,
              passes: 3,
            },
            mangle: {
              properties: {
                regex: /^(_|(handle)([A-Za-z]+))/,
              },
            },
          },
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify: isProd
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              minifyCSS: true,
              useShortDoctype: true,
            }
          : false,
      }),
      new CleanWebpackPlugin({
        verbose: false,
        cleanOnceBeforeBuildPatterns: ['main*'],
      }),
    ],
    devServer: {
      open: true,
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      port: 3000,
      stats: 'errors-only',
    },
    bail: true,
    node: false,
    stats: {
      colors: true,
      assets: true,
      cached: false,
      chunks: false,
      children: false,
      modules: false,
      hash: false,
      version: false,
      timings: true,
      warnings: true,
      errors: true,
      errorDetails: true,
      builtAt: false,
      entrypoints: false,
    },
  };
};
