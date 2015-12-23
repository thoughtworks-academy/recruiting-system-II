var express = require('express');
var router = express.Router();
var request = require('superagent');
var constant = require('../../tools/back-constant.json');
var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);
var validate = require("validate.js");

var containers = {
  email: {
    presence: {message: "^请输入邮箱"},
    email: {message: "^请输入正确邮箱"}
  },
  mobilePhone: {
    presence: {message: '^请输入手机号'},
    format: {
      pattern: /^1[3|4|5|8][0-9]\d{8}$/,
      message: '^请输入合法手机号'
    }
  }
};

function checkRegisterInfo(registerInfo) {
  var pass = true;

  var valObj = {};
  valObj.email = registerInfo.email;
  valObj.mobilePhone = registerInfo.mobilePhone;

  var result = validate(valObj, containers);

  if (result !== undefined){
    pass = false;
  }

  if (registerInfo.password.length < constant.PASSWORD_MIN_LENGTH ||
      registerInfo.password.length > constant.PASSWORD_MAX_LENGTH) {
        pass = false;
  }
  return pass;
}

router.post('/', function(req, res) {
  var registerInfo = req.body;
  var result = {};
  result.data = {};

  if (checkRegisterInfo(registerInfo)) {
    var message = '';

    agent('GET', appServer + 'register/validate-mobile-phone')

      .set('Content-Type', 'application/json')
      .query({
        mobilePhone: registerInfo.mobilePhone
      })
      .end()
      .then(function onResult(response) {
        result.data.mobilePhoneStatus = response.body.status;
        message = response.body.status === constant.SUCCESSFUL_STATUS ? constant.MOBILE_PHONE : '';

        return agent('GET', appServer + 'register/validate-email')
          .set('Content-Type', 'application/json')
          .query({
            email: registerInfo.email
          }).end()

      .then(function onResult(response) {
        result.data.emailStatus = response.body.status;
        message += response.body.status === constant.SUCCESSFUL_STATUS ? constant.EMAIL : '';

        if (message !== '') {
          res.send({
            status: constant.FAILING_STATUS,
            data: result.data,
            message: message + constant.EXIST
          })
        } else {
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

      }, function onError(err) {
        console.log(err)
      });

    }, function onError(err) {
      console.log(err)
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
