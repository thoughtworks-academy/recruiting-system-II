'use strict';

var express = require('express');
var router = express.Router();
var request = require('superagent');
var constant = require('../../mixin/back-constant');
var md5 = require('js-md5');
var validate = require('validate.js');
var constraint = require('../../mixin/login-constraint');
var passport = require('passport');
var apiServer = require('../../configuration').apiServer;

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

router.get('/', function (req, res) {
  var account = req.query.account;
  var password = req.query.password;

  if (!checkLoginInfo(account, password)) {
    res.send({
      message: constant.LOGIN_FAILED,
      status: 403
    });
  } else {
    password = md5(password);

    request
        .post(apiServer + 'login')
        .set('Content-Type', 'application/json')
        .send({
          email: account,
          password: password
        })
        .end(function (err, result) {
          if (result.body.id) {
            req.session.user = {
              id: result.body.id,
              userInfo: result.body.userInfo
            };
          }
          res.send({
            status: result.status
          });
        });
  }
});

router.get('/github',
    passport.authenticate('github'),
    function (req, res) {
      // The request will be redirected to GitHub for authentication, so this
      // function will not be called.
    });


router.get('/github/callback',
    passport.authenticate('github', {failureRedirect: '/'}),
    function (req, res) {
      res.redirect('/start');
    });

module.exports = router;
