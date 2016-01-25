'use strict';

var Reflux = require('reflux');

var RegisterActions = Reflux.createActions([
  'register',
  'initialUserQuiz',
  'checkEmail',
  'checkMobilePhone'
]);

module.exports = RegisterActions;