const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = ({ prod = false }) => {
  const plugins = prod
    ? [
        new ManifestPlugin({
          seed: {
            short_name: 'Todos',
            name: 'Todos',
            background_color: '#eeeeee',
            display: 'standalone',
            theme_color: '#eeeeee',
          },
        }),
        new SWPrecacheWebpackPlugin({
          filename: 'service-worker.js',
          dontCacheBustUrlsMatching: /\.\w{8}\./,
          filename: 'service-worker.js',
          minify: true,
          staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
      ]
    : [];

  return {
    mode: prod ? 'production' : 'development',
    entry: './src',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name]-[contenthash].js',
      pathinfo: !prod,
    },
    devtool: prod ? 'none' : 'source-map',
    module: {
      rules: [
        {
          test: /\.js/i,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify: prod
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          : undefined,
      }),
      new CleanWebpackPlugin('dist', { verbose: false }),
      ...plugins,
    ],
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      compress: true,
      historyApiFallback: true,
      noInfo: true,
      port: 3000,
    },
    bail: true,
    node: false,
    stats: {
      assets: true,
      cached: false,
      chunks: false,
      children: false,
      modules: false,
      hash: false,
      version: true,
      timings: true,
      warnings: true,
      errors: true,
      errorDetails: true,
      builtAt: false,
      entrypoints: false,
    },
  };
};
