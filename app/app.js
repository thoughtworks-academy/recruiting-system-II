'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var route = require('./routes/route');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');

global.apiServer = 'http://localhost:8080/api/';

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

var compile = webpack(require("./webpack.config"));

app.use(webpackDevMiddleware(compile, {
  publicPath: "/assets/",   // 以/assets/作为请求的公共目录
  lazy: true,               // 只有请求时才编译
  noInfo: true,             // 只打印警告和错误信息
  stats: {
    colors: true
  }
}));

app.use(express.static('public'));

route.setRoutes(app);

app.listen(3000, function() {
  console.log('App listening at http://localhost:3000');
});