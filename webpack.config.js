'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  minimist = require('minimist'),
  ngAnnotatePlugin = require('ng-annotate-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');


var argv = minimist(process.argv.slice(2));
var DEBUG = !argv.release;
var STYLE_LOADER = 'style-loader';
var CSS_LOADER = DEBUG ? 'css-loader' : 'css-loader?minimize';

var GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};


module.exports = {

  output: {
    path: path.join(__dirname, 'www'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },

  devtool: 'source-map',

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG
  },

  entry: {
    app: ['./app/index.js']
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules|dist|www|build/,
      loader: 'eslint-loader'
    }],

    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css!sass-loader')
    }, {
      test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?prefix=font/&limit=10000&name=font/[hash].[ext]'
    }, {
      test: /[\/]angular\.js$/,
      loader: 'exports?angular'
    }, {
      test: /[\/]ionic\.js$/,
      loader: 'exports?ionic'
    }, {
      test: /.*\.(gif|png|jpe?g)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?{progressive:true, optimizationLevel:1, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
      //' + DEBUG ? '1' : '7' + '
    }]
  },

  resolve: {
    root: [
      path.join(__dirname, 'app'),
      path.join(__dirname, 'node_modules')
    ],
    moduleDirectories: [
      'node_modules'
    ],
    alis: {}
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      pkg: require('./package.json'),
      template: 'app/entry-template.html'
    }),
    new ngAnnotatePlugin({
      add: true
    }),
    new ExtractTextPlugin('styles.css')

  ]
};