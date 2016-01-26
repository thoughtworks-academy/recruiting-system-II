'use strict';

var Reflux = require('reflux');

var HomeworkActions = Reflux.createActions([
  'changeOrderId',
  'loadHomeworkList',
  'submitUrl',
  'submited',
  'getBranches'
]);

module.exports = HomeworkActions;