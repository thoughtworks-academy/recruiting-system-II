var Reflux = require('reflux');

var LogicPuzzleActions = Reflux.createActions([
  'loadItem',
  'submitAnswer',
  'saveUserAnswer',
  'changeAnswer',
  'getRemainTime'
]);

module.exports = LogicPuzzleActions;
