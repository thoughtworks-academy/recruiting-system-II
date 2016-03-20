'use strict';

var express = require('express');
var router = express.Router();
var request = require('superagent');
var async = require('async');
var apiRequest = require('../../services/api-request');

function getInfoFromApi(done) {
  apiRequest.get('inspector', function (err, resp) {
    var data;
    if(err) {
      data = {api: err};
    } else {
      data = resp.body;
    }
    done(null, data);
  });
}

router.get('/', function (req, res) {
  var data = {app: "connected"};

  async.parallel([
    getInfoFromApi,
  ], function(err, result) {
    result.forEach(function(v, k) {
      data = Object.assign(data, v);
    });
    res.send(data);
  })

})
module.exports = router;
