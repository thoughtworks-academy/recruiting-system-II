'use strict';

var express = require('express');
var router = express.Router();
var async = require('async');
var _ = require('lodash');
var validate = require('validate.js');
var userConstraint = require('../../mixin/user-detail-constraint');
var passwordConstraint = require('../../mixin/password-constraint');
var md5 = require('js-md5');
var constant = require('../../mixin/constant');
var apiRequest = require('../../services/api-request');

function checkInfo(info, constraint) {
  var result = validate(info, constraint);

  if (result === undefined) {
  }
  return true;
}

router.get('/', function (req, res) {
  var userId = req.session.user.id;
  var result;

  async.waterfall([
    (done) => {
      apiRequest.get('users/' + userId, done);
    },
    (resp, done) => {
      if (resp.status === constant.httpCode.OK) {
        result = _.assign(resp.body);
      } else {
        throw new Error();
      }
      done(null, result);
    },
    (result, done) => {
      apiRequest.get('users/' + userId + '/detail', done);
    },
    (resp, done) => {
      result = _.assign(result, resp.body);
      done(null, result);
    }
  ],(err) => {
    if(err){
      res.status(constant.httpCode.NOT_FOUND);
      res.send({
        status: constant.httpCode.NOT_FOUND
      });
    }else{
      res.send({
        status: constant.httpCode.OK,
        data: result
      });
    }
  });


});

router.put('/update', function (req, res) {
  var userId = req.session.user.id;
  var userInfo = req.body.data;
  var result = _.assign({userId: userId}, userInfo);

  if (checkInfo(result, userConstraint) && result.gender !== '') {
    var url = 'users/' + userId + '/detail';

    apiRequest.put(url, result, function (err, resp) {
      if (resp === undefined) {
        res.send({
          status: constant.httpCode.INTERNAL_SERVER_ERROR
        });
      } else if (resp.status === constant.httpCode.OK) {
        res.send({
          status: constant.httpCode.OK
        });
      } else if (resp.status === constant.httpCode.NOT_FOUND) {
        res.send({
          status: constant.httpCode.NOT_FOUND
        });
      } else {
        res.status(constant.httpCode.INTERNAL_SERVER_ERROR);
        res.send({
          status: constant.httpCode.INTERNAL_SERVER_ERROR
        });
      }
    });
  } else {
    res.send({status: constant.httpCode.BAD_REQUEST});
  }
});

router.put('/change-password', function (req, res) {
  var userId = req.session.user.id;
  var passwordInfo = req.body.data;

  if (checkInfo(passwordInfo, passwordConstraint) && passwordInfo.password === passwordInfo.confirmPassword) {
    var partResult = {};

    partResult.oldPassword = md5(passwordInfo.oldPassword);
    partResult.password = md5(passwordInfo.password);
    var url = 'users/' + userId + '/password';

    apiRequest.put(url, partResult, function (err, resp) {
      if (resp === undefined) {
        res.status(constant.httpCode.INTERNAL_SERVER_ERROR);
        res.send({
          status: constant.httpCode.INTERNAL_SERVER_ERROR
        });
      } else if (resp.status === constant.httpCode.OK) {
        res.send({
          status: constant.httpCode.OK
        });
      } else if (resp.status === constant.httpCode.BAD_REQUEST) {
        res.send({
          status: constant.httpCode.BAD_REQUEST
        });
      } else {
        res.status(constant.httpCode.INTERNAL_SERVER_ERROR);
        res.send({
          status: constant.httpCode.INTERNAL_SERVER_ERROR
        });
      }
    });
  } else {
    res.send({
      status: constant.httpCode.BAD_REQUEST
    });
  }
});

module.exports = router;
