'use strict';

var express = require('express');
var router = express.Router();
var superAgent = require('superagent');
var agent = require('superagent-promise')(superAgent, Promise);
var _ = require('lodash');
var validate = require('validate.js');
var userConstraint = require('../../mixin/user-detail-constraint');
var passwordConstraint = require('../../mixin/password-constraint');
var md5 = require('js-md5');
var yamlConfig = require('node-yaml-config');
var apiServer = yamlConfig.load('./config/config.yml').apiServer;
var constant = require('../../mixin/constant');

function checkInfo(info, constraint) {
  var result = validate(info, constraint);

  if(result === undefined) {}
  return true;
}

router.get('/', function (req, res) {
  var userId = req.session.user.id;
  var result;

  agent.get(apiServer + 'users/' + userId)
      .set('Content-Type', 'application/json')
      .end()
      .then(function (resp) {
        if (resp.status === constant.httpCode.OK) {
          result = _.assign(resp.body);
        } else {
          throw new Error();
        }
        return result;
      })
      .then(function () {
        return agent.get(apiServer + 'users/' + userId + '/detail')
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
          status: constant.httpCode.OK,
          data: result
        });
      })
      .catch(function () {
        res.status(constant.httpCode.NOT_FOUND);
        res.send({
          status: constant.httpCode.NOT_FOUND
        });
      });
});

router.put('/update', function (req, res) {
  var userId = req.session.user.id;
  var userInfo = req.body.data;
  var result = _.assign({userId: userId}, userInfo);

  if (checkInfo(result, userConstraint) && result.gender !== '') {
    agent.put(apiServer + 'users/' + userId + '/detail')
        .set('Content-Type', 'application/json')
        .send(result)
        .end()
        .then(function (resp) {
          if (resp.status === constant.httpCode.OK) {
            res.send({
              status: constant.httpCode.OK
            });
          }else if(resp.status === constant.httpCode.NOT_FOUND){
            res.send({
              status: constant.httpCode.NOT_FOUND
            });
          } else {
            throw new Error();
          }
        })
        .catch(function () {
          res.status(constant.httpCode.INTERNAL_SERVER_ERROR);
          res.send({
            status: constant.httpCode.INTERNAL_SERVER_ERROR
          });
        });
  } else {
    res.send({status: constant.httpCode.BAD_REQUEST});
  }
});

router.put('/change-password', function (req, res) {
  var userId = req.session.user.id;
  var passwordInfo = req.body.data;

  if(checkInfo(passwordInfo, passwordConstraint) && passwordInfo.password === passwordInfo.confirmPassword) {
    var partResult = {};

    partResult.oldPassword = md5(passwordInfo.oldPassword);
    partResult.password = md5(passwordInfo.password);

    agent.put(apiServer + 'users/' + userId + '/password')
        .set('Content-Type', 'application/json')
        .send(partResult)
        .end()
        .then(function (resp) {
          if(resp.status === constant.httpCode.OK) {
            res.send({
              status: constant.httpCode.OK
            });
          }else if(resp.status === constant.httpCode.BAD_REQUEST){
            res.send({
              status:constant.httpCode.BAD_REQUEST
            });
          } else {
            throw new Error();
          }
        })
        .catch(function() {
          res.status(constant.httpCode.INTERNAL_SERVER_ERROR);
          res.send({
            status: constant.httpCode.INTERNAL_SERVER_ERROR
          });
        });
  }else {
    res.send({
      status: constant.httpCode.BAD_REQUEST
    });
  }
});

module.exports = router;
