'use strict';

var Reflux = require('reflux');
var UserDetailActions = require('../actions/user-detail-actions');
var request = require('superagent');
var page = require('page');

var UserDetailStore = Reflux.createStore({
  listenables: [UserDetailActions],

  onLoadUserDetail: function () {
    request.get('/user-detail')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          if (err || res.status !== 200) {
            return;
          }
          this.trigger(res.body.data);
        });
  },

  onUpdateUserDetail: function (userData) {

    request.put('/user-detail/update')
        .set('Content-Type', 'application/json')
        .send({
          data: userData
        })
        .end((err, req) => {
          if (req.body.status === 200) {
            page('dashboard.html');
          } else {
            console.log('update error');
          }
        });
  },

  onChangePassword: function (passwordInfo) {
    request.put('/user-detail/change-password')
        .set('Content-Type', 'application/json')
        .send({
          data: passwordInfo
        })
        .end((err, req) => {
          if (req.body.status === 200) {
            alert('修改成功');
          } else if (req.body.status === 400) {
            this.trigger({oldPasswordError:'旧密码错误'});
          } else {
            console.log('error');
          }
        });
  }
});

module.exports = UserDetailStore;
