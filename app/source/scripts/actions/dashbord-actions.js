'use strict';

var Reflux = require('reflux');

var DashbordActions = Reflux.createActions([
  'getStatus',
  'showPrompt',
  'hidePrompt'
]);

module.exports = DashbordActions;
