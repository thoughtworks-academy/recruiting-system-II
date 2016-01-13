'use strict';

var Reflux = require('reflux');

var UserDetailActions = Reflux.createActions([
  'loadUserDetail',
  'updateUserDetail',
  'changePassword'
]);

module.exports = UserDetailActions;
