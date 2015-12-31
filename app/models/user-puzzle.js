var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userPuzzleSchema = new Schema({
  userId: Number,
  startTime: Number,
  quizItems: [{
    id: Number,
    uri: String,
    userAnswer: Number
  }],
  quizDemo: [{
      id: Number,
      uri: String
    }]
});

module.exports = mongoose.model('UserPuzzles', userPuzzleSchema);