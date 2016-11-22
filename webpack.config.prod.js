'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    student: [
      './src/student/index'
    ],
    teacher: [
      './src/teacher/index'
    ]
  },
  output: {
    path: path.join(__dirname, '/assets/js'),
    filename: '[name]-bundle.js',
    publicPath: '/assets/js/'
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin({
        compressor: { warnings: false }
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass!postcss')
      }
    ]
  },

  postcss: [ autoprefixer({ browsers: ['last 50 versions'] }) ]
};
