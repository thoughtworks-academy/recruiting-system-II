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
  quizExamples: [{
    id: Number,
    uri: String
  }],
  blankQuizId: Number,
  paperId: Number,
  isCommited: Boolean,
  isCompleted:Boolean,
  endTime: String
});

module.exports = mongoose.model('UserPuzzles', userPuzzleSchema);