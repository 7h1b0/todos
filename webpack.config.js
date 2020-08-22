const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
        new WorkboxPlugin.GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
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
              booleans_as_integers: true,
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
      }),
      new CleanWebpackPlugin({
        verbose: false,
        cleanOnceBeforeBuildPatterns: ['main-*'],
      }),
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
