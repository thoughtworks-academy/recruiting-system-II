'use strict';

var userHomeworkQuizzes = require('../models/user-homework-quizzes');
var homeworkQuizzes = require('../models/homework-quizzes');
var async = require('async');
var constant = require('../mixin/constant');

function UserHomeworkController() {

}

UserHomeworkController.prototype.getList = function (req, res) {
  var userId = req.session.user.id;
  var quizzesStatus = [];

  async.waterfall([
    (done)=> {
      userHomeworkQuizzes.findOne({userId: userId}, done);
    },
    (data, done)=> {
      var locked = 0;
      var success = 0;

      data.quizzes.forEach((quiz) => {
        if (quiz.locked) {
          locked++;
        } else if (quiz.status === constant.homeworkQuizzesStatus.SUCCESS) {
          success++;
        }
      });

      if (data.quizzes.length === (locked + success)) {
        data.quizzes[success].status = 1;
        data.quizzes[success].locked = false;
      }

      data.quizzes.forEach((quiz) => {
        quizzesStatus.push({
          status: quiz.status
        });
      });

      data.save(done);
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

UserHomeworkController.prototype.getQuiz = (req, res) => {
  var userId = req.session.user.id;
  var orderId = req.query.orderId;

  async.waterfall([
    (done) => {
      userHomeworkQuizzes.unlockNext(userId, done);
    },
    (result, done) => {
      userHomeworkQuizzes.findOne({userId: userId}, done);
    },
    (result, done) => {
      if (result.quizzes[orderId - 1].locked) {
        done(new Error('is locked'));
      }else {
        homeworkQuizzes.findOne({id: result.quizzes[orderId - 1].id}, done);
      }
    }
  ], (err, data) => {
    if (err) {
      if (err.message === 'is locked') {
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

module.exports = UserHomeworkController;

