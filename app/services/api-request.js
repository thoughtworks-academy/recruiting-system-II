"use strict";

var superAgent = require('superagent');
var apiServer = require('../configuration').apiServer;

var apiRequest = {
  get: function (url, query, callback) {

    if ('function' === typeof query) {
      callback = query;
      query = {};
    }

    superAgent.get(apiServer + url)
        .set('Content-Type', 'application/json')
        .query(query)
        .end(callback);
  },

  post: function (url, body, callback) {

    superAgent.post(apiServer + url)
        .set('Content-Type', 'application/json')
        .send(body)
        .end(callback);
  }
};

module.exports = apiRequest;