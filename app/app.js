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
var constant = require('./mixin/constant');

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
    ttl: constant.time.MINUTE_PER_HOUR * constant.time.SECONDS_PER_MINUTE
  })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

var env;

if(process.env.NODE_ENV !== 'test'){
  env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
} else {
  env = process.env.NODE_ENV
}

if (env === 'development' || env === 'test') {
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

var port = 3000;
var testPort = 5000;

if(env === 'test'){
  app.listen(testPort, function () {
    console.log('App listening at http://localhost:' + testPort);
  });
} else {
  app.listen(port, function () {
    console.log('App listening at http://localhost:' + port);
  });
}



module.exports = app;