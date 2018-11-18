const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const plugins = isProduction
  ? [
      new ManifestPlugin(),
      new SWPrecacheWebpackPlugin({
        minify: true,
        filename: 'service-worker.js',
      }),
    ]
  : [];

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    pathinfo: !isProduction,
  },
  devtool: isProduction ? 'none' : 'eval-source-map',
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
      minify: {
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
      },
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
