var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userPuzzleSchema = new Schema({
  userId: Number,
  startTime: Number,
  quizItems:[{
      id: Number,
      uri: String,
      userAnswer: Number
    }]
});

module.exports = mongoose.model('UserPuzzles', userPuzzleSchema);