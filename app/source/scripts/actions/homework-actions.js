'use strict';

var Reflux = require('reflux');

var HomeworkActions = Reflux.createActions([
  'loadHomeworkStatus',
  'getFocus',
  'getContent'
]);

module.exports = HomeworkActions;