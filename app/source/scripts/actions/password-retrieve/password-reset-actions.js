'use strict';

var Reflux = require('reflux');

var passwordResetActions = Reflux.createActions([
  'reset',
  'changeValue'
]);

module.exports = passwordResetActions;