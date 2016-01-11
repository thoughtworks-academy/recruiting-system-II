'use strict';

var express = require('express');
var router = express.Router();
var superAgent = require('superagent');
var agent = require('superagent-promise')(superAgent, Promise);
var _ = require('lodash');
var validate = require('validate.js');
var constraint = require('../../mixin/user-detail-constraint');
var apiServer = require('../../configuration').apiServer;


function checkUserInfo(userInfo) {
  var valObj = {};

  valObj.school = userInfo.school;
  valObj.name = userInfo.name;
  valObj.major = userInfo.major;
  valObj.degree = userInfo.degree;

  var result = validate(valObj, constraint);

  if (result === undefined) {
    return true;
  }
}

router.get('/', function (req, res) {
  var userId = req.session.user.id;
  var result;

  agent.get(apiServer + 'user/' + userId)
      .set('Content-Type', 'application/json')
      .end()
      .then(function (resp) {
        if (resp.status === 200) {
          result = _.assign(resp.body);
        } else {
          throw new Error();
        }
        return result;
      })
      .then(function () {
        return agent.get(apiServer + 'user/' + userId + '/detail')
            .set('Content-Type', 'application/json')
            .end();
      })
      .then(function (resp) {
        result = _.assign(result, resp.body);
        return result;
      }, function () {
        return result;
      })
      .then(function (result) {
        res.send({
          status: 200,
          data: result
        });
      })
      .catch(function () {
        res.status(404);
        res.send({
          status: 404
        });
      });
});

router.put('/update', function (req, res) {
  var userId = req.session.user.id;
  var userInfo = req.body.data;
  var result = _.assign({userId: req.session.user.id}, userInfo);

  if (checkUserInfo(result) && result.gender !== '') {
    agent.put(apiServer + 'user/' + userId + '/detail')
        .set('Content-Type', 'application/json')
        .send(result)
        .end()
        .then(function (resp) {
          if (resp.status === 200) {
            res.send({
              status: 200
            });
          } else {
            throw new Error();
          }
        })
        .catch(function () {
          res.status(404);
          res.send({
            status: 404
          });
        });
  } else {
    res.send({status: 500});
  }
});

module.exports = router;
