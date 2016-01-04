var Reflux = require('reflux');

var LogicPuzzleActions = Reflux.createActions([
  'loadItem',
  'submitAnswer',
  'saveUserAnswer',
  'changeAnswer',
  'getRemainTime',
  'submitPaper'
]);

module.exports = LogicPuzzleActions;
