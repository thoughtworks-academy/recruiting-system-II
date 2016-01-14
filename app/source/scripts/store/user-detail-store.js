'use strict';

var Reflux = require('reflux');
var UserDetailActions = require('../actions/user-detail-actions');
var request = require('superagent');
var page = require('page');
var constant = require('../../../mixin/constant');

var UserDetailStore = Reflux.createStore({
  listenables: [UserDetailActions],

  onLoadUserDetail: function () {
    request.get('/user-detail')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          if (err || res.status !== constant.httpCode.OK) {
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
          if (req.body.status === constant.httpCode.OK) {
            page('dashboard.html');
          } else {
            console.log('update error');
          }
        });
  }
});

module.exports = UserDetailStore;
