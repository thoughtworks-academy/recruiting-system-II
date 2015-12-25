var Reflux = require('reflux');

var LogicPuzzleActions = Reflux.createActions([
  'loadItem',
  'submitAnswer',
  'lastPuzzle',
  'nextPuzzle',
  'getUserAnswer',
  'saveUserAnswer',
  'countTotal'
]);

module.exports = LogicPuzzleActions;
