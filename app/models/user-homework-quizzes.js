'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var constant = require('../mixin/constant');

var userHomeworkQuizzesSchema = new Schema({
  userId: Number,
  quizzes: [{
    id: Number,
    status: Number,
    startTime: Number,
    userAnswerRepo: String,
    uri: String,
    branch: String,
    commitSHA: String
  }]
});

userHomeworkQuizzesSchema.statics.initUserHomeworkQuizzes = function (userId, quizzes, callback) {
  this.findOne({userId: userId}, (err, doc) => {
    if (doc) {
      callback(new Error('is exist'), null);
    } else {
      var _quizzes = [];

      quizzes.forEach((quiz) => {
        _quizzes.push({
          id: quiz.id,
          uri: quiz.definition_uri,
          status: constant.homeworkQuizzesStatus.LOCKED
        });
      });

      _quizzes[0].status = constant.homeworkQuizzesStatus.ACTIVE;

      this.create({
        userId: userId,
        quizzes: _quizzes
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
        if (quiz.status === constant.homeworkQuizzesStatus.LOCKED) {
          locked++;
        } else if (quiz.status === constant.homeworkQuizzesStatus.SUCCESS) {
          success++;
        }
      });

      if (data.quizzes.length === (locked + success)) {
        data.quizzes[success].status = constant.homeworkQuizzesStatus.ACTIVE;
        data.save(callback);
      } else {
        callback(null, true);
      }
    }
  });
};

userHomeworkQuizzesSchema.statics.findProgressTasks = function (callback) {
  this.find({quizzes: {$elemMatch: {status: constant.homeworkQuizzesStatus.PROGRESS}}}, 'userId quizzes', (err, doc) => {
    if (err) {
      callback(err);
    } else {
      var result = [];

      doc.forEach((item) => {
        var userAnswerRepo;
        var quizId;
        item.quizzes.forEach((quiz) => {
          userAnswerRepo = quiz.status === constant.homeworkQuizzesStatus.PROGRESS ? quiz.userAnswerRepo : userAnswerRepo;
          quizId = quiz.status === constant.homeworkQuizzesStatus.PROGRESS ? quiz.id : quizId;
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

userHomeworkQuizzesSchema.statics.checkDataForSubmit = function (userId, orderId, callback) {
  var result = {};
  this.findOne({userId: userId}, (err, data) => {
    var integer = (Number(orderId) === parseInt(orderId, 10));
    if (err || !data) {
      result.isValidate = false;
      result.status = constant.httpCode.NOT_FOUND;
      result.data = null;
      callback(true, result);
    } else if (!integer || orderId < 1 || orderId === undefined || orderId > data.quizzes.length) {
      result.data = null;
      result.status = constant.httpCode.NOT_FOUND;
      result.isValidate = false;
    } else if (data.quizzes[orderId - 1].status === constant.homeworkQuizzesStatus.ACTIVE || data.quizzes[orderId - 1].status === constant.homeworkQuizzesStatus.ERROR) {
      result.data = data;
      result.status = constant.httpCode.OK;
      result.isValidate = true;
    } else {
      result.data = data;
      result.status = constant.httpCode.FORBIDDEN;
      result.isValidate = false;
    }

    callback(null, result);
  });
};


userHomeworkQuizzesSchema.statics.checkDataForUpdate = function (userId, orderId, callback) {
  var result = {};
  this.findOne({userId: userId}, (err, data) => {
    var integer = (Number(orderId) === parseInt(orderId, 10));
    if (err || !data) {
      result.isValidate = false;
      result.status = constant.httpCode.NOT_FOUND;
      result.data = null;
      callback(true, result);
    } else if (!integer || orderId < 1 || orderId === undefined || orderId > data.quizzes.length) {
      result.data = null;
      result.status = constant.httpCode.NOT_FOUND;
      result.isValidate = false;
    } else if (data.quizzes[orderId - 1].status === constant.homeworkQuizzesStatus.PROGRESS || data.quizzes[orderId - 1].status === constant.homeworkQuizzesStatus.ERROR) {
      result.data = data;
      result.status = constant.httpCode.OK;
      result.isValidate = true;
    } else {
      result.data = data;
      result.status = constant.httpCode.BAD_REQUEST;
      result.homeworkStatus = data.quizzes[orderId - 1].status;
      result.isValidate = false;
    }

    callback(null, result);
  });
};

module.exports = mongoose.model('UserHomeworkQuizzes', userHomeworkQuizzesSchema);
