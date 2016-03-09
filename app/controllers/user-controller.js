/*eslint no-magic-numbers: 2*/
'use strict';

var apiRequest = require('../services/api-request');
var constant = require('../mixin/constant');
var async = require('async');
var userHomeworkQuizzes = require('../models/user-homework-quizzes');
var _percentage = 100;
function UserController() {

}

UserController.prototype.answer = (req, res)=> {

  var userId = req.query.userId;
  var userUri = 'users/' + userId + '/logicPuzzle';
  var userDetailURL = 'users/' + userId + '/detail';
  var logicPuzzle = {};

  var homework = {
    quizzes: []
  };

  async.waterfall([
    (done)=> {
      apiRequest.get(userUri, done);
    }, (result, done) => {
      var accuracy = 0;
      var itemNumber = result.body[0].itemNumber;
      var correctNumber = result.body[0].correctNumber;

      if (correctNumber !== 0) {
        accuracy = ((correctNumber / itemNumber) * _percentage).toFixed(2);
      }

      logicPuzzle.correctNumber = correctNumber;
      logicPuzzle.itemNumber = itemNumber;
      logicPuzzle.startTime = result.body[0].startTime;
      logicPuzzle.endTime = result.body[0].endTime;
      logicPuzzle.accuracy = accuracy + '%';

      userHomeworkQuizzes.findOne({userId: userId}, done);

    }, (results, done)=> {

      var correctNumber = 0;
      var sumTime = 0;
      results.quizzes.forEach(function (result) {
        var commitHistory = [];

        var elapsedTime = 0;
        if (result.homeworkSubmitPostHistory.length !== 0) {

          var homeworkSubmitPostHistoryLength = result.homeworkSubmitPostHistory.length - 1;
          result.homeworkSubmitPostHistory.forEach(function (log) {

            var commit = {};
            commit.githubURL = log.homeworkURL;
            commit.branch = log.branch;
            commit.commitTime = log.commitTime;
            commit.resultURL = log.resultURL;
            commitHistory.push(commit);
          });

          elapsedTime = result.homeworkSubmitPostHistory[homeworkSubmitPostHistoryLength].commitTime - result.startTime;
        }

        if ((result.homeworkSubmitPostHistory.length !== 0) && result.homeworkSubmitPostHistory[homeworkSubmitPostHistoryLength].status === constant.homeworkQuizzesStatus.SUCCESS) {
          correctNumber++;
        }

        sumTime += elapsedTime;

        var quiz = {
          startTime: result.startTime,
          homeworkDesc: result.uri,
          elapsedTime: elapsedTime,
          commitHistory: commitHistory
        };

        homework.quizzes.push(quiz);
      });

      var completion = (correctNumber / results.quizzes.length) * _percentage;
      homework.elapsedTime = sumTime;
      homework.completion = completion.toFixed(2) + '%';
      homework.correctNumber = correctNumber;
      homework.quizNumber = results.quizzes.length;

      var response = {
        userDetailURL: userDetailURL,
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
