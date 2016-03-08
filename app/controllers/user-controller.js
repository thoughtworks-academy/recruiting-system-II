'use strict';
var apiRequest = require('../services/api-request');
var constant = require('../mixin/constant');
var async = require('async');
var userHomeworkQuizzes = require('../models/user-homework-quizzes');

function UserController() {

}

UserController.prototype.answer = (req, res)=> {

  var userId = req.query.userId;
  var userUri = 'users/' + userId + '/logicPuzzle';
  var userDetailUrl = 'users/' + userId + '/detail';
  var logicPuzzle = {};
  var homework = {
    quizzes: []
  };

  async.waterfall([
    (done)=> {
      apiRequest.get(userUri, done);
    }, (result, done) => {

      logicPuzzle.correctNumber = result.body.correctNumber;
      logicPuzzle.itemNumber = result.body.itemNumber;
      logicPuzzle.startTime = result.body.startTime;
      logicPuzzle.endTime = result.body.endTime;
      userHomeworkQuizzes.findOne({userId: userId}, done);

    }, (results, done)=> {
      var correctNumber = 0;

      results.quizzes.forEach(function (result) {
        var commitTimes = {
          commitTime: []
        };

        if (!(result.homeworkSubmitPostHistory === undefined)) {
          var homeworkSubmitPostHistoryLength = result.homeworkSubmitPostHistory.length - 1;

          result.homeworkSubmitPostHistory.forEach(function (log) {
            commitTimes.commitTime.push(log.timestamp);
          });
        }

        if (!(result.homeworkSubmitPostHistory === undefined) && result.homeworkSubmitPostHistory[homeworkSubmitPostHistoryLength].status === constant.homeworkQuizzesStatus.SUCCESS) {
          correctNumber++;
        }

        var quiz = {
          startTime: result.startTime,
          commitTimes: commitTimes
        };

        homework.quizzes.push(quiz);
      });

      homework.correctNumber = correctNumber;

      var response = {
        userDetailUrl: userDetailUrl,
        logicPuzzle: logicPuzzle,
        homework: homework
      };
      done(null, response);
    }
  ], (err, data) => {
    if (err) {
      res.sendStatus({status: constant.httpCode.INTERNAL_SERVER_ERROR});
    } else {
      res.send(data);
    }

  });
};

module.exports = UserController;


