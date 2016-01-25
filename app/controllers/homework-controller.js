'use strict';

var userHomeworkQuizzes = require('../models/user-homework-quizzes');
var homeworkQuizzes = require('../models/homework-quizzes');
var async = require('async');
var constant = require('../mixin/constant');

function HomeworkController() {

}

HomeworkController.prototype.getList = function (req, res) {
  var userId = req.session.user.id;
  var quizzesStatus = [];

  async.waterfall([
    (done)=> {
      userHomeworkQuizzes.unlockNext(userId, done);
    },
    (data, result, done) => {
      done = typeof(result) === 'function' ? result : done;
      userHomeworkQuizzes.findOne({userId: userId}, done);
    },
    (data, done)=> {
      data.quizzes.forEach((quiz) => {
        quizzesStatus.push({
          status: quiz.status
        });
      });
      done();
    }
  ], (err) => {
    if (err) {
      res.status(constant.httpCode.INTERNAL_SERVER_ERROR);
      res.send({status: constant.httpCode.INTERNAL_SERVER_ERROR, message: err.message});
    } else {
      res.send({
        status: constant.httpCode.OK,
        homeworkQuizzes: quizzesStatus
      });
    }
  });

};

HomeworkController.prototype.getQuiz = (req, res) => {
  var userId = req.session.user.id;
  var orderId = req.query.orderId;

  async.waterfall([
    (done) => {
      userHomeworkQuizzes.unlockNext(userId, done);
    },
    (data, result, done) => {
      done = typeof(result) === 'function' ? result : done;
      userHomeworkQuizzes.findOne({userId: userId}, done);
    },
    (result, done) => {
      var integer = (Number(orderId) === parseInt(orderId, 10));
      if (!integer || orderId === undefined || orderId > result.quizzes.length || orderId < 1) {
        done(new Error('orderId error'));
      } else if (result.quizzes[orderId - 1].status === constant.homeworkQuizzesStatus.LOCKED) {
        done(new Error('is locked'));
      } else {
        homeworkQuizzes.findOne({id: result.quizzes[orderId - 1].id}, done);
      }
    }
  ], (err, data) => {
    if (err) {
      if (err.message === 'is locked' || err.message === 'orderId error') {
        res.send({
          status: constant.httpCode.FORBIDDEN
        });
      } else {
        console.log(err);
      }
    } else {
      res.send({
        status: constant.httpCode.OK,
        quiz: {
          desc: data.desc,
          templateRepo: data.templateRepo
        }
      });
    }
  });

};

HomeworkController.prototype.saveGithubUrl = (req, res) => {
  var userId = req.session.user.id;
  var orderId = req.body.orderId;

  async.waterfall([
    (done)=> {
      userHomeworkQuizzes.checkDataForSubmit(userId, orderId, done);
    }, (result, done) => {
      if (result.isValidate === true) {
        result.data.quizzes[orderId - 1].userAnswerRepo = req.body.userAnswerRepo;
        result.data.quizzes[orderId - 1].branch = req.body.branch;
        result.data.quizzes[orderId - 1].status = constant.homeworkQuizzesStatus.PROGRESS;
        result.data.save(done);
      } else {
        done(new Error('validate error'));
      }
    }
  ], (err, data) => {
    if (err) {
      if (err.message === 'validate error') {
        res.send({
          status: constant.httpCode.FORBIDDEN
        });
      } else {
        console.log(err);
      }
    } else {
      res.send({
        status: constant.httpCode.OK
      });
    }
  });

};

HomeworkController.prototype.updateResult = (req, res)=> {
  var userId = req.body.userId;
  var orderId = req.body.orderId;
  var resultPath = req.body.resultPath;
  var resultStatus = req.body.status;

  async.waterfall([
    (done)=> {
      userHomeworkQuizzes.checkDataForUpdate(userId, orderId, done);
    }, (result, done)=> {
      if (result.isValidate === true) {
        result.data.quizzes[orderId - 1].status = resultStatus;
        result.data.quizzes[orderId - 1].resultPath = resultPath;
        result.data.save(done);
      } else {
        done(true, result);
      }
    }
  ], (err, data)=> {
    if (err) {
      if (data.status === constant.httpCode.BAD_REQUEST) {
        res.send({
          status: data.status,
          homeworkStatus: data.homeworkStatus
        });
      }
      if (data.status === constant.httpCode.NOT_FOUND) {
        res.send({status: data.status});
      }
    } else {
      res.send({status: constant.httpCode.OK});
    }
  });
};


module.exports = HomeworkController;
