var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userPuzzleSchema = new Schema({
  userId: Number,
  puzzle: [{
    puzzleId: Number,
    userPuzzleIndex: Number,
    userAnswer: Number
  }]
});

module.exports = mongoose.model('UserPuzzles', userPuzzleSchema);