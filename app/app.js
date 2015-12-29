'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var route = require('./routes/route');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var filterRoute = require('./mixin/filter-route');

app.use(cookieParser());
app.use(session({secret: 'RECRUITING_SYSTEM', resave: false, saveUninitialized: false}));

global.apiServer = 'http://localhost:8080/api/';

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

var compile = webpack(require("./webpack.config"));

var env = process.env.NODE_ENV === "production" ? "production" : "development";

if(env === 'development') {
  app.use(webpackDevMiddleware(compile, {
    publicPath: "/assets/",   // 以/assets/作为请求的公共目录
    lazy: true,               // 只有请求时才编译
    noInfo: true,             // 只打印警告和错误信息
    stats: {
      colors: true
    }
  }));
}

app.use(function (req, res, next) {
  if(env === 'development'){

    if(!req.session.user){
      req.session.user = {
        name: null,
        href: 'user/1'
      };
    }
  }

  if (req.session.user) {
    next();
  } else {
    var arr = req.url.split('/');

    arr.forEach(function(item, i){
      arr[i] = item.split('?')[0];
    });

    var lastElement = arr[arr.length - 1];

    if (lastElement.indexOf("html") !== -1 && filterRoute.blackList.indexOf(lastElement) !== -1){
      res.redirect('/');
    }else{
      next();
    }
  }
});

app.use(express.static('public'));

route.setRoutes(app);

app.listen(3000, function() {
  console.log('App listening at http://localhost:3000');
});