'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var route = require('./routes/route');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sessionCheck = require('./middleware/session-check');
var passport = require('passport');
var util = require('util');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost/twars');

var GITHUB_CLIENT_ID = '3d1ce4b21c72eed40be3';
var GITHUB_CLIENT_SECRET = 'fe406b1fdc3f386871979976e244e01224c933ac';

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/login/github/callback'
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, profile);
  });
}));

app.use(cookieParser());
app.use(session({
  secret: 'RECRUITING_SYSTEM', resave: false, saveUninitialized: false,
  store: new MongoStore({
    url: 'mongodb://localhost/twars',
    ttl: 60 * 60
  })
}));
app.use(passport.initialize());
app.use(passport.session());


global.apiServer = 'http://localhost:8080/api/';

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


var env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

if (env === 'development') {
  var compile = webpack(require('./webpack.config'));
  app.use(webpackDevMiddleware(compile, {
    publicPath: '/assets/',   // 以/assets/作为请求的公共目录
    lazy: true,               // 只有请求时才编译
    noInfo: true,             // 只打印警告和错误信息
    stats: {
      colors: true
    }
  }));
}

app.use(sessionCheck);

app.use(express.static('public'));

route.setRoutes(app);

app.listen(3000, function () {
  console.log('App listening at http://localhost:3000');
});