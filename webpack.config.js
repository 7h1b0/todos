const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({ prod = false } = {}) => {
  const plugins = prod
    ? [
        new ManifestPlugin({
          seed: {
            short_name: 'Todos',
            name: 'Todos',
            background_color: '#eeeeee',
            display: 'standalone',
            theme_color: '#eeeeee',
            start_url: '/todos/',
            icons: [
              {
                src: 'icon-192.png',
                type: 'image/png',
                sizes: '192x192',
              },
              {
                src: 'icon-512.png',
                type: 'image/png',
                sizes: '512x512',
              },
            ],
          },
        }),
        new SWPrecacheWebpackPlugin({
          filename: 'service-worker.js',
          dontCacheBustUrlsMatching: /\.\w{8}\./,
          minify: true,
          staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
        new CopyWebpackPlugin([{ from: 'public/' }]),
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
            ecma: 8,
            compress: {
              pure_getters: true,
              unsafe: true,
            },
            mangle: {
              properties: {
                regex: /^(_|(clear|toggle|handle)([A-Za-z]+))/,
              },
            },
          },
        }),
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
      new CleanWebpackPlugin({ verbose: false }),
      ...plugins,
    ],
    devServer: {
      contentBase: path.join(__dirname, 'public'),
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
