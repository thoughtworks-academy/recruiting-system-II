'use strict';

var Reflux = require('reflux');
var PasswordActions = require('../../actions/reuse/password-actions');


var UserDetailStore = Reflux.createStore({
  listenables: [PasswordActions],

  onChangeNewPassword: function(passwordObj) {
    this.trigger(passwordObj);
  }
});


module.exports = UserDetailStore;
