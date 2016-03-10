/*eslint no-magic-numbers: 2*/
'use strict';

var apiRequest = require('../services/api-request');
var constant = require('../mixin/constant');
var async = require('async');
var userHomeworkQuizzes = require('../models/user-homework-quizzes');
var json2csv = require('json2csv');
var fs = require('fs');
var _percentage = 100;

function UserController() {

}


function createUserDetail(data) {

  return {
    name: data.name,
    mobilePhone: data.mobilePhone,
    email: data.email
  };
}

function createLogicPuzzle(data) {
  var accuracy = 0;
  var logicPuzzle = data[0];

  var itemNumber = logicPuzzle.itemNumber;
  var correctNumber = logicPuzzle.correctNumber;

  if (correctNumber !== 0) {
    accuracy = ((correctNumber / itemNumber) * _percentage).toFixed(2);
  }

  return {
    correctNumber: correctNumber,
    itemNumber: itemNumber,
    startTime: logicPuzzle.startTime,
    endTime: logicPuzzle.endTime,
    accuracy: accuracy + '%'
  };
}

function createHomework(data) {

  var sumTime = 0;
  var correctNumber = 0;
  var homework = {
    quizzes: []
  };

  data.quizzes.forEach(function (result) {
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

  var completion = (correctNumber / data.quizzes.length) * _percentage;

  homework.elapsedTime = sumTime;
  homework.completion = completion.toFixed(2) + '%';
  homework.correctNumber = correctNumber;
  homework.quizNumber = data.quizzes.length;

  return homework;
}

function getUserDataByUserId(userId, callback) {

  var logicPuzzleURL = 'users/' + userId + '/logicPuzzle';
  var userDetailURL = 'users/' + userId + '/detail';

  async.parallel({
    userDetail: function (done) {
      apiRequest.get(userDetailURL, done);
    },
    logicPuzzle: function (done) {
      apiRequest.get(logicPuzzleURL, done);
    },
    homework: function (done) {
      userHomeworkQuizzes.findOne({userId: userId}, done);
    }
  }, (err, result)=> {

    if (err) {
      callback({
        httpCode: constant.httpCode.NOT_FOUND
      });
    } else {
      callback({
        result: result,
        httpCode: constant.httpCode.OK
      });
    }
  });
}


function createUserInfo(userId, callback) {

  getUserDataByUserId(userId, function (userData) {

    var userInfo = {};

    if (userData.httpCode !== constant.httpCode.NOT_FOUND) {

      userInfo.userDetail = createUserDetail(userData.result.userDetail.body);
      userInfo.logicPuzle = createLogicPuzzle(userData.result.logicPuzzle.body);
      userInfo.homework = createHomework(userData.result.homework);
      userInfo.httpCode = userData.httpCode;
    } else {
      userInfo.httpCode = constant.httpCode.NOT_FOUND;
    }

    callback(userInfo);
  });

}

function createCSV(userInfo) {

  var userDetail = userInfo.userDetail;
  var logicPuzzle = userInfo.logicPuzle;
  var homework = userInfo.homework;

  var fieldNames = ['姓名', '电话', '邮箱', '逻辑题准确率', '家庭作业下载地址', '家庭作业花费时间', '日志下载地址'];
  var fields = ['name', 'mobilePhone', 'email', 'accuracy', 'homeworkAddress', 'homeworkElapsedTime', 'log'];

  var user = [{
    name: userDetail.name,
    mobilePhone: userDetail.mobilePhone,
    email: userDetail.email,
    accuracy: logicPuzzle.accuracy,
    homeworkAddress: 'url',
    homeworkElapsedTime: homework.elapsedTime + '分钟',
    log: 'url'
  }];

  json2csv({data: user, fields: fields, fieldNames: fieldNames}, function (err, csv) {

    fs.writeFile('file.csv', csv, function (err) {
      if (err) {
        console.log(err);
      }
      console.log('file saved');
    });

  });
}

UserController.prototype.exportCsv = (req, res)=> {

  var userId = req.params.userId;
  createUserInfo(userId, function (userInfo) {

    if (userInfo.httpCode === constant.httpCode.NOT_FOUND) {
      res.sendStatus(constant.httpCode.NOT_FOUND);
    } else {

      createCSV(userInfo);
      res.end();
    }
  });
};

module.exports = UserController;

