'use strict';

var Reflux = require('reflux');

var PasswordActions = Reflux.createActions([
  'changeNewPassword',
  'getPasswordError'
]);

module.exports = PasswordActions;
