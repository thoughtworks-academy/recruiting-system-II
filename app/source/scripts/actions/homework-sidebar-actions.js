'use strict';

var Reflux = require('reflux');

var HomeworkSidebarActions = Reflux.createActions([
  'loadHomeworkStatus',
  'getFocus'
]);

module.exports = HomeworkSidebarActions;