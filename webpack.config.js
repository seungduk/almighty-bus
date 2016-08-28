
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/bus.js',
  output: {
    path: './dist/',
    filename: 'bus.js',
  },
  module: {
    loaders: [
      {
        test: /[.]js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  plugins: [
    new LodashModuleReplacementPlugin,
    new webpack.optimize.OccurrenceOrderPlugin,
  ],
};
