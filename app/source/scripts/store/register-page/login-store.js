'use strict';

var Reflux = require('reflux');
var LoginActions = require('../../actions/login-actions');
var request = require('superagent');
var constant = require('../../../../mixin/constant');
var page = require('page');

var LoginStore = Reflux.createStore({
  listenables: LoginActions,

  onLogin: function (phoneEmail, loginPassword){
    request.get('/login')
        .set('Content-Type', 'application/json')
        .query({
          account: phoneEmail,
          password: loginPassword
        })
        .end((err, req) => {
          var data = JSON.parse(req.text);
          if (data.status === constant.httpCode.OK) {
            this.trigger({
              loginFailed : false
            });
            page('dashboard.html');
          } else {
            this.trigger({
              clickable: false,
              loginFailed : true
            });
          }
        });
  },

  onChangeState: function (isLoginState){
    this.trigger({
      isLoginState: !isLoginState,
      phoneEmailError: '',
      loginPasswordError: '',
      mobilePhoneError: '',
      emailError: '',
      passwordError: '',
      agree: false
    });
  }

});

module.exports = LoginStore;