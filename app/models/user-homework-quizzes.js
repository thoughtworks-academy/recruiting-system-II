'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var constant = require('../mixin/constant');

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

userHomeworkQuizzesSchema.statics.unlockNext = function (userId, callback) {
  this.findOne({userId: userId}, function (err, data) {
    if (err || !data) {
      callback(err || new Error('user is not allowed'));
    } else {
      var locked = 0;
      var success = 0;

      data.quizzes.forEach(function (quiz) {
        if (quiz.locked) {
          locked++;
        } else if (quiz.status === constant.homeworkQuizzesStatus.SUCCESS) {
          success++;
        }
      });

      if (data.quizzes.length === (locked + success)) {
        data.quizzes[success].status = 1;
        data.quizzes[success].locked = false;

        data.save(callback);
      } else {
        callback(null, true);
      }
    }
  });
};

userHomeworkQuizzesSchema.statics.findProgressTasks = function (callback) {
  this.find({quizzes: {$elemMatch: {status: 2}}}, 'userId quizzes', (err, doc) => {
    if (err) {
      callback(err);
    } else {
      var result = [];

      doc.forEach((item) => {
        var userAnswerRepo;
        var quizId;
        item.quizzes.forEach((quiz) => {
          userAnswerRepo = quiz.status === 2 ? quiz.userAnswerRepo : userAnswerRepo;
          quizId = quiz.status === 2 ? quiz.id : quizId;
        });

        result.push({
          userId: item.userId,
          quizId: quizId,
          userAnswerRepo: userAnswerRepo
        });
      });

      callback(null, result);
    }
  });
};

userHomeworkQuizzesSchema.statics.checkData = function (userId, orderId, callback) {
  var isValidate;
  var result = {};

  this.findOne({userId: userId}, (err, data) => {

    if (err || !data) {
      callback(err || new Error('error'));
    } else if (typeof orderId !== 'number' || orderId < 1 || orderId === undefined || orderId > data.quizzes.length) {
      isValidate = false;
      result.data = null;
      result.isValidate = isValidate;
    } else if (data.quizzes[orderId - 1].status === constant.homeworkQuizzesStatus.ACTIVE || data.quizzes[orderId - 1].status === constant.homeworkQuizzesStatus.ERROR) {
      isValidate = true;
      result.data = data;
      result.isValidate = isValidate;
    } else {
      isValidate = false;
      result.data = data;
      result.isValidate = isValidate;
    }

    callback(null, result);

  });
};

module.exports = mongoose.model('UserHomeworkQuizzes', userHomeworkQuizzesSchema);
