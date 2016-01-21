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
      res.send({status: 500, message: err.message});
    } else {
      res.send({
        status: 200,
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
      if (orderId === undefined || orderId > result.quizzes.length || orderId < 1) {
        done(new Error('orderId error'));
      } else if (result.quizzes[orderId - 1].locked) {
        done(new Error('is locked'));
      } else {
        homeworkQuizzes.findOne({id: result.quizzes[orderId - 1].id}, done);
      }
    }
  ], (err, data) => {
    if (err) {
      if (err.message === 'is locked' || err.message === 'orderId error') {
        res.send({
          status: 403
        });
      } else {
        console.log(err);
      }
    } else {
      res.send({
        status: 200,
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
  var orderId = req.query.orderId;

  async.waterfall([
    (done)=> {
      userHomeworkQuizzes.findOne({userId: userId}, done);
    }, function (data, done) {
      if (orderId === undefined || orderId > data.quizzes.length || orderId < 1) {
        done(new Error('orderId error'));
      } else if (data.quizzes[orderId - 1].locked === true) {
        done(new Error('is locked'));
      } else {
        data.quizzes[orderId - 1].userAnswerRepo = req.body.userAnswerRepo;
        done(null, data);
      }
    }
  ], function (err, data) {
    if (err) {
      if (err.message === 'is locked' || err.message === 'orderId error') {
        res.send({
          status: 403
        });
      } else {
        console.log(err);
      }
    } else {
      res.send({
        status: 200
      });
    }
  });
};

HomeworkController.prototype.getProgressTasks = (req, res) => {
  var progressTasks;

  async.waterfall([
    (done) => {
      userHomeworkQuizzes.findProgressTasks(done);
    },
    (result, done) => {
      progressTasks = result;
      homeworkQuizzes.find({}, done);
    },
    (result, done) => {

      progressTasks.forEach((item, i) => {
        result.forEach((ele, x) => {

          if(item.quizId === ele.id) {
            progressTasks[i].evaluateScript = ele.evaluateScript;
            progressTasks[i].evaluateRepo = ele.evaluateRepo;
          }
        });
      });
      done(null, progressTasks);
    }
  ], (err, data) => {
    if(err){
      res.status(constant.httpCode.INTERNAL_SERVER_ERROR);
      res.send({status: 500, message: err.message});
    }else {
      res.send({
        status: data.length === 0 ? constant.httpCode.NOT_FOUND : constant.httpCode.OK,
        userAnswers: data
      });
    }
  });
};

module.exports = HomeworkController;
