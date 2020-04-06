const path = require("path");
const webpack = require("webpack");
const package = require("./package.json");

const PATH = {
  entryPoint: path.resolve(__dirname, './src/index.ts'),
  dist: path.resolve(__dirname, './dist'),
}

const config = {
  entry: PATH.entryPoint,
  devtool: "source-map",
  mode: "production",
  output: {
    filename: `index.js`,
    path: PATH.dist,
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }

};

module.exports = config;