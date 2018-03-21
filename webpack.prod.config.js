const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require('webpack');

var entryHome = './public/js/home.js';
var entryPages = './public/js/pages.js';

var destination = path.join(__dirname, 'public/js/dist');

module.exports = {

  entry: {
    home: entryHome,
    pages: entryPages
  },
  output: {
    path: destination,
    filename: "[name].js"
  },

  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['*', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: {
          presets:['env'],
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "common",
          filename: 'common.bundle.js',
          chunks: "all"
        }
      }
    }
  },
};
