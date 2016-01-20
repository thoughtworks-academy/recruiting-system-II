'use strict';

var Reflux = require('reflux');

var HomeworkActions = Reflux.createActions([
  'changeOrderId',
  'loadHomeworkList'
]);

module.exports = HomeworkActions;