'use strict';

var Reflux = require('reflux');

var RegisterActions = Reflux.createActions([
  'register',
  'initialUserQuiz',
  'checkEmail',
  'checkMobilePhone',
  'changeState',
  'inputPassword',
  'changeValue',
  'checkData',
  'thirdPartyRegister'
]);

module.exports = RegisterActions;