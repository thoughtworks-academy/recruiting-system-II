var Reflux = require('reflux');

var LogicPuzzleActions = Reflux.createActions([
  'loadItem',
  'submitAnswer',
  'lastPuzzle',
  'nextPuzzle',
  'saveUserAnswer',
  'changeAnswer'
]);

module.exports = LogicPuzzleActions;
