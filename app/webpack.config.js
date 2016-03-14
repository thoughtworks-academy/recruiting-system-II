'use strict';

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToJQuery = path.resolve(node_modules, 'jquery/dist/jquery.min.js');
var pathToBootstarp = path.resolve(node_modules, 'bootstrap/dist/');


module.exports = {
  entry: {
    "404": "./source/scripts/404.js",
    "index": "./source/scripts/index.js",
    "logic-puzzle": "./source/scripts/logic-puzzle",
    "homework": "./source/scripts/homework.js",
    "register": "./source/scripts/register.js",
    "start": "./source/scripts/start.js",
    "user-center": './source/scripts/user-center.js',
    "dashboard": './source/scripts/dashboard.js',
    "password-retrieve": './source/scripts/password-retrieve.js',
    "password-reset": './source/scripts/password-reset.js',
    "homework-details": './source/scripts/homework-details.js'
  },
  output: {
    path: __dirname + '/public/assets/',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=10000&name=build/[name].[ext]'
      }
    ],
    noParse: [pathToJQuery,pathToBootstarp,]
  },
  plugins: [
    new ExtractTextPlugin("[name].bundle.css")
  ],
  devtool: '#inline-source-map',
  resolve: {
    alias: {
      'jquery': pathToJQuery
    }
  }
};