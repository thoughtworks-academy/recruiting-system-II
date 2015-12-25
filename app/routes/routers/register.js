var express = require('express');
var router = express.Router();
var request = require('superagent');
var constant = require('../../tools/back-constant.json');
var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);
var validate = require("validate.js");
var md5 = require('js-md5');
var constraint = require('../../common/register-constraint');

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
      .end()
}

function checkEmailExist(email){
  return agent('GET', apiServer + 'user')
      .set('Content-Type', 'application/json')
      .query({
        field: 'email',
        value: email
      })
      .end()
}

router.post('/', function(req, res) {
  var registerInfo = req.body;
  var result = {};
  result.data = {};

  if (checkRegisterInfo(registerInfo)) {
    var message = '';

    var isMobilePhoneExist;
    var isEmailExist;

    checkMobilePhoneExist(registerInfo.mobilePhone)
        .then(function onResult(response) {
          isMobilePhoneExist = true;
        }, function onError(err) {
          isMobilePhoneExist = false;
        })

        .then(function() {
          checkEmailExist(registerInfo.email)
              .then(function onResult(response) {
                isEmailExist = true;
              }, function onError(err) {
                isEmailExist = false;
              }).then(function () {
            if(isEmailExist || isMobilePhoneExist){
              res.send({
                status: constant.FAILING_STATUS,
                message: constant.EXIST,
                data: {
                  isEmailExist: isEmailExist,
                  isMobilePhoneExist: isMobilePhoneExist
                }
              });
            }else {
              registerInfo.password = md5(registerInfo.password);

              request
                  .post(apiServer + 'register')
                  .set('Content-Type', 'application/json')
                  .send(registerInfo)
                  .end(function (err, result) {
                    res.send({
                      status: result.status,
                      message: constant.REGISTER_SUCCESS
                    });
                  });
            }
          })
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
        if(result.body.user) {
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
        if(result.body.user) {
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