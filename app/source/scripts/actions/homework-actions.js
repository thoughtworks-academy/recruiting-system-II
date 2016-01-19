'use strict';

var Reflux = require('reflux');

var HomeworkActions = Reflux.createActions([
  'loadHomeworkStatus',
  'getFocus'
]);

module.exports = HomeworkActions;