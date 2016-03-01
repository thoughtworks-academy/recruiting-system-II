'use strict';

var Reflux = require('reflux');

var UserCenterActions = Reflux.createActions([
  'loadUserDetail',
  'updateUserDetail',
  'changePassword',
  'changeState',
  'changeGender',
  'validateGender',
  'changeBirthday'
]);

module.exports = UserCenterActions;
