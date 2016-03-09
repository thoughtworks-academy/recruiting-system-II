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
        accuracy = ((correctNumber / itemNumber) * 100).toFixed(2);
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
        if (!(result.homeworkSubmitPostHistory === undefined)) {

          var homeworkSubmitPostHistoryLength = result.homeworkSubmitPostHistory.length - 1;

          result.homeworkSubmitPostHistory.forEach(function (log) {

            var commit = {};
            commit.githubURL = log.homeworkURL;
            commit.branch = log.branch;
            commit.commitTime = log.commitTime;
            commit.resultURL = log.resultURL;


            commitHistory.push(commit);
          });

        }

        if (!(result.homeworkSubmitPostHistory === undefined) && result.homeworkSubmitPostHistory[homeworkSubmitPostHistoryLength].status === constant.homeworkQuizzesStatus.SUCCESS) {
          elapsedTime = result.homeworkSubmitPostHistory[homeworkSubmitPostHistoryLength].commitTime - result.startTime;
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


      var completion = (correctNumber / results.quizzes.length) * 100;

      homework.elapsedTime = 123;
      homework.completion = completion.toFixed(2) + '%';
      homework.correctNumber = correctNumber;

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


//var userHomeworkQuizzesSchema = new Schema({
//  userId: Number,
//  paperId: Number,
//  quizzes: [{
//    id: Number,
//    status: Number,
//    startTime: Number,
//    uri: String,
//    homeworkSubmitPostHistory: [{
//      homeworkURL: String,
//      status: Number,
//      version: String,
//      branch: String,
//      commitTime: Number,
//      resultURL: String
//    }]
//  }]
//});


//var result = {
//  userDetailUrl: 'users/' + userId + '/detail',
//  logicPuzzle: {
//    correctNumber: 6,
//    itemNumber: 10,
//    startTime: 75,
//    endTime: 98,
//    accuracy: 0.65
//  },
//  homework: {
//    correctNumber: 2,
//    elapsedTime: 123,
//    completion: 0.65,
//    quizzes: [
//      {
//        startTime: 10,
//        homeworkDesc: json,
//        elapsedTime: 20,
//        commitHistory: [{
//          githubUrl: string,
//          branch: string,
//          commitTime: interger,
//          resultUrl: url
//        }, {
//          githubUrl: string,
//          branch: string,
//          commitTime: interger,
//          resultUrl: url
//        }]
//      }]
//  }
//};


