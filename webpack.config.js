const path = require('path')
const webpack = require('webpack')
const package = require('./package.json')
const TerserPlugin = require('terser-webpack-plugin')

const PATH = {
  entryPoint: path.resolve(__dirname, './src/index.ts'),
  dist: path.resolve(__dirname, './dist'),
}

const config = {
  entry: PATH.entryPoint,
  mode: 'production',
  output: {
    filename: `index.js`,
    path: PATH.dist,
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [{ test: /\.ts?$/, loader: 'ts-loader' }],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  },
}

module.exports = config
