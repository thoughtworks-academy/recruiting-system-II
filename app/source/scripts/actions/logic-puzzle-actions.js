var Reflux = require('reflux');

var LogicPuzzleActions = Reflux.createActions([
  'loadItem',
  'submitAnswer',
  'lastPuzzle',
  'nextPuzzle'
]);

module.exports = LogicPuzzleActions;
