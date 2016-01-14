'use strict';

var express = require('express');
var router = express.Router();
var request = require('superagent');
var constant = require('../../mixin/back-constant.json');
var agent = require('superagent-promise')(require('superagent'), Promise);
var validate = require('validate.js');
var md5 = require('js-md5');
var constraint = require('../../mixin/register-constraint');
var apiServer = require('../../configuration').apiServer;

function checkRegisterInfo(registerInfo) {
  var pass = true;

  var valObj = {};
  valObj.email = registerInfo.email;
  valObj.mobilePhone = registerInfo.mobilePhone;
  valObj.password = registerInfo.password;

  var result = validate(valObj, constraint);

  if (result !== undefined){
    pass = false;
  }

  if (registerInfo.password.length < constant.PASSWORD_MIN_LENGTH ||
      registerInfo.password.length > constant.PASSWORD_MAX_LENGTH) {
    pass = false;
  }
  return pass;
}

function checkMobilePhoneExist(mobilePhone){
  return agent('GET', apiServer + 'user')
      .set('Content-Type', 'application/json')
      .query({
        field: 'mobilePhone',
        value: mobilePhone
      })
      .end();
}

function checkEmailExist(email){
  return agent('GET', apiServer + 'user')
      .set('Content-Type', 'application/json')
      .query({
        field: 'email',
        value: email
      })
      .end();
}

router.post('/', function(req, res) {
  var registerInfo = req.body;
  var result = {};
  result.data = {};

  if (checkRegisterInfo(registerInfo)) {
    var isMobilePhoneExist;
    var isEmailExist;

    checkMobilePhoneExist(registerInfo.mobilePhone)
      .then(function onResult(response) {
        isMobilePhoneExist = true;
      }, function onError(err) {
        isMobilePhoneExist = false;
      })
      .then(function(){
        return checkEmailExist(registerInfo.email);
      })
      .then(function onResult(response) {
        isEmailExist = true;
      }, function onError(err) {
        isEmailExist = false;
      })
      .then(function(){
        if(isEmailExist || isMobilePhoneExist){
          throw new Error('isExist');
        }else {
          registerInfo.password = md5(registerInfo.password);

          return agent('POST', apiServer + 'register')
            .set('Content-Type', 'application/json')
            .send(registerInfo)
            .end();
        }
      })
      .then(function(result){
        if(result.body.id){
          req.session.user = {
            id: result.body.id,
            userInfo: result.body.userInfo
          };
        }
        res.send({
          status: result.status,
          message: constant.REGISTER_SUCCESS
        });
      })
      .catch(function(err){
        res.send({
          status: constant.FAILING_STATUS,
          message: constant.EXIST,
          data: {
            isEmailExist: isEmailExist,
            isMobilePhoneExist: isMobilePhoneExist
          }
        });
      });

  } else {
    res.send({
      message: constant.REGISTER_FAILED,
      status: constant.FAILING_STATUS
    });
  }
});

router.get('/validate-mobile-phone', function(req, res) {
  request.get(apiServer + 'user')
      .set('Content-Type', 'application/json')
      .query({
        field: 'mobilePhone',
        value: req.query.mobilePhone
      })
      .end(function(err, result) {
        if(result.body.uri) {
          res.send({
            status: constant.SUCCESSFUL_STATUS
          });
        }else {
          res.send({
            status: constant.FAILING_STATUS
          });
        }
      });
});

router.get('/validate-email', function(req, res) {
  request.get(apiServer + 'user')
      .set('Content-Type', 'application/json')
      .query({
        field: 'email',
        value: req.query.email
      })
      .end(function(err, result) {
        if(result.body.uri) {
          res.send({
            status: constant.SUCCESSFUL_STATUS
          });
        }else {
          res.send({
            status: constant.FAILING_STATUS
          });
        }
      });
});
module.exports = router;