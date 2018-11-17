const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
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
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new CleanWebpackPlugin('dist', { verbose: false }),
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
