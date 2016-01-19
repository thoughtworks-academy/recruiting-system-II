'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userHomeworkQuizzesSchema = new Schema({
  userId: Number,
  quizzes: [{
    id: Number,
    locked: Boolean,
    status: Number,
    startTime: Number,
    userAnswerRepo: String,
    message: String,
    branch: String,
    commitSHA: String
  }]
});

userHomeworkQuizzesSchema.statics.initUserHomeworkQuizzes = function (userId, idList, callback) {
  this.findOne({userId: userId}, (err, doc) => {
    if (doc) {
      callback(new Error('is exist'), null);
    } else {
      var quizzes = [];

      idList.forEach((id) => {
        quizzes.push({
          id: id,
          locked: true,
          status: 0
        });
      });

      this.create({
        userId: userId,
        quizzes: quizzes
      }, callback);
    }
  });
};

module.exports = mongoose.model('UserHomeworkQuizzes', userHomeworkQuizzesSchema);
