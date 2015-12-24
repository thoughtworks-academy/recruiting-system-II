var Reflux = require('reflux');

var LogicPuzzleActions = Reflux.createActions([
  'loadItem',
  'submitAnswer',
  'lastPuzzle',
  'nextPuzzle',
  'getUserAnswer',
  'saveUserAnswer'
]);

module.exports = LogicPuzzleActions;
