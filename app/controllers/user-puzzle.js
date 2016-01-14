'use strict';
var httpCode = require('../mixin/constant');
var apiRequest = require('../services/api-request');
var userPuzzle = require('../models/user-puzzle');
var async = require('async');

function UserPuzzleController() {
}

UserPuzzleController.prototype.getUserPuzzle = function (req, res) {
  var orderId = req.query.orderId;
  var userId = req.session.user.id;

  userPuzzle.getUserPuzzle(orderId, userId)
      .then((data) => {
        res.send(data);
      });
};

UserPuzzleController.prototype.saveAnswer = function (req, res) {
  var orderId = req.body.orderId;
  var userAnswer = req.body.userAnswer;
  var userId = req.session.user.id;
  userPuzzle.saveAnswer(orderId, userAnswer, userId)
      .then((isSucceed) => {
        if (isSucceed === true) {
          res.sendStatus(httpCode.OK);
        }
      });
};

UserPuzzleController.prototype.initialUser = function (req, res) {
  var userId = req.session.user.id;
  var quizItems, quizExamples, blankQuizId, paperId;
  var userPuzzleUrl = 'papers/enrollment';

  async.waterfall([

    function (done) {

      userPuzzle.findOne({userId: userId}, (err, data) => {
        if (err) {
          done(err, data);
        } else {
          done(!!data, data);
        }
      });
    }, function (data, done) {
      apiRequest.get(userPuzzleUrl, done);
    }, function (responds, done) {

      var quizzes = responds.body.sections[0].quizzes[0];
      blankQuizId = quizzes.id;
      paperId = responds.body.id;
      var itemsUri = quizzes.items.uri;

      done(null, itemsUri);
    }, function (itemsUri, done) {
      apiRequest.get(itemsUri, done);
    }, function (responds, done) {

      quizItems = responds.body.quizItems;
      quizExamples = responds.body.exampleItems;

      var isNotExist = true;

      done(null, isNotExist);
    }, function (isNotExist, done) {

      userPuzzle.create({
        userId: userId,
        quizItems: quizItems,
        quizExamples: quizExamples,
        blankQuizId: blankQuizId,
        paperId: paperId
      },done);

    }
  ], function (err) {
    if (true !== err && err) {
      res.statusCode(httpCode.INTERNAL_SERVER_ERROR);
      res.send({status: httpCode.INTERNAL_SERVER_ERROR, message: '服务器错误'});
    } else {
      res.send({status: httpCode.OK, message: '初始化成功!'});
    }
  });
};

module.exports = UserPuzzleController;