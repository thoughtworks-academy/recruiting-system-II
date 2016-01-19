'use strict';

var UserHomeworkQuizzes = require('../models/user-homework-quizzes');
var async = require('async');
var constant = require('../mixin/constant');

function UserHomeworkController() {

}

UserHomeworkController.prototype.getList = function (req, res) {
  var userId = req.session.user.id;
  var quizzesStatus = [];

  async.waterfall([
    (done)=> {
      UserHomeworkQuizzes.findOne({userId: userId}, done);
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

module.exports = UserHomeworkController;

