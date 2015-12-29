'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var route = require('./routes/route');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var dbConnection = require('./middleware/db-connection');
var sessionChick= require('./middleware/session-check');

app.use(cookieParser());
app.use(session({secret: 'RECRUITING_SYSTEM', resave: false, saveUninitialized: false}));

global.apiServer = 'http://localhost:8080/api/';

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


var env = process.env.NODE_ENV === "production" ? "production" : "development";

if(env === 'development') {
  var compile = webpack(require("./webpack.config"));
  app.use(webpackDevMiddleware(compile, {
    publicPath: "/assets/",   // 以/assets/作为请求的公共目录
    lazy: true,               // 只有请求时才编译
    noInfo: true,             // 只打印警告和错误信息
    stats: {
      colors: true
    }
  }));
}

sessionChick(app, env);

app.use(express.static('public'));

dbConnection(app);

route.setRoutes(app);

app.listen(3000, function() {
  console.log('App listening at http://localhost:3000');
});