
'use strict';

var express = require('express');
var app = express();
var proxy = require('express-http-proxy');
var path = require('path');

app.use(express.static('web/public/assets'));

app.use('/api', proxy('192.168.99.100:3000/',{
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}));

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'web/public/assets', 'register.html'));
});

app.get('/*', function (req, res){
  var fileName = require('url').parse(req.url).path.split("/")[1];
  res.sendFile(path.join(__dirname, 'web/public/assets', fileName + '.html'),function(err){
    if(err){
      res.sendFile(path.join(__dirname, 'web/public/assets/', '404.html'));
    }
  });
});

app.listen(3333, function () {
  console.log('App listening at http://localhost:' + 3333);
});

module.exports = app;
