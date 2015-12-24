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
  stats: {
    colors: true
  }
}));

app.use(express.static('public'));

route.setRoutes(app);



app.listen(3000, function() {
  console.log('App listening at http://localhost:3000');
});