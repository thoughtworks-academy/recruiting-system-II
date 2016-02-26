'use strict';

var superAgent = require('superagent');
var yamlConfig = require('node-yaml-config');
var apiServer = yamlConfig.load('./config/config.yml').apiServer;
var token = null;

var apiRequest = {
  get: function (req, url, query, callback) {

    if ('function' === typeof query) {
      callback = query;
      query = {};
    }

    if(!req.session){
      token = null;
    } else if(req.session.user){
      token = req.session.user.token;
    }

    superAgent.get(apiServer + url)
        .set('Content-Type', 'application/json')
        .set('token',token)
        .query(query)
        .end(callback);
  },

  post: function (req, url, body, callback) {
    if(!req.session){
      token = null;
    } else if(req.session.user){
      token = req.session.user.token;
    }

    superAgent.post(apiServer + url)
        .set('Content-Type', 'application/json')
        .set('token',token)
        .send(body)
        .end(callback);
  },

  put: function (req, url, data ,callback) {
    if(!req.session){
      token = null;
    } else if(req.session.user){
      token = req.session.user.token;
    }

    superAgent.put(apiServer + url)
        .set('Content-Type', 'application/json')
        .set('token',token)
        .send(data)
        .end(callback);
  }
};

module.exports = apiRequest;