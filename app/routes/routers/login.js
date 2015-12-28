var express = require('express');
var router = express.Router();
var request = require('superagent');
var constant = require('../../tools/back-constant.json');
var md5 = require('js-md5');
var validate = require('validate.js');
var constraint = require('../../common/login-constraint');

function checkLoginInfo(account, password) {
  var pass = true;
  var valObj = {};

  valObj.phoneEmail = account;
  valObj.loginPassword = password;
  var result = validate(valObj, constraint);

  if (result !== undefined) {
    pass = false;
  }

  if (password.length < constant.PASSWORD_MIN_LENGTH ||
      password.length > constant.PASSWORD_MAX_LENGTH) {
        pass = false;
  }
  return pass;
}

router.get('/', function(req, res) {
  var account = req.query.account;
  var password = req.query.password;

  if (!checkLoginInfo(account, password)) {
    res.send({
      message: constant.LOGIN_FAILED,
      status: 403
    })
  } else {
    password = md5(password);

    request
      .post(apiServer + 'login')
      .set('Content-Type', "application/json")
      .send({
        email: account,
        password: password
      })
      .end(function(err, result) {
        if(result.body.user){
          req.session.user = result.body.user;
        }
        res.send({
          status: result.status
        });
      })
  }
});

module.exports = router;
