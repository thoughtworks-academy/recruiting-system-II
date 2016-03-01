'use strict';

var Reflux = require('reflux');

var UserCenterActions = Reflux.createActions([
  'loadUserDetail',
  'updateUserDetail',
  'changePassword',
  'changeState',
  'changeGender',
  'validateGender',
  'changeBirthday',
  'checkGender',
  'checkBirthday'
]);

module.exports = UserCenterActions;
