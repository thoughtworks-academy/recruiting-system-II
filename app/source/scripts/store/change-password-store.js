'use strict';

var Reflux = require('reflux');
var ChangePasswordActions = require('../actions/change-password-actions');
var request = require('superagent');
var page = require('page');

var ChangePasswordStore = Reflux.createStore({
  listenables: [ChangePasswordActions],

  onChangePassword: function (passwordInfo) {
    this.trigger({isRespond: true});
    request.put('/user-detail/change-password')
        .set('Content-Type', 'application/json')
        .send({
          data: passwordInfo
        })
        .end((err, req) => {
          if (req.body.status === 200) {
            this.trigger({success: true});
            this.trigger({isRespond: false});
          } else if (req.body.status === 400) {
            this.trigger({oldPasswordError: '旧密码错误'});
          } else {
            console.log('error');
          }
        });
  }
});

module.exports = ChangePasswordStore;
