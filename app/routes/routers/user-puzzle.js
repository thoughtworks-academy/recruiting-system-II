var express = require('express');
var router = express.Router();
var Promise = this.Promise || require('promise');
var superAgent = require('superagent');
var agent = require('superagent-promise')(superAgent, Promise);
var userPuzzle = require('../../models/user-puzzle');
var constant = require('../../mixin/back-constant.json');

router.get('/remain-time', function (req, res) {
  userPuzzle.findOne({userId: req.session.user.id})
      .then((userPuzzle) => {

        if (!userPuzzle.startTime) {
          userPuzzle.startTime = Date.parse(new Date()) / 1000;

          return userPuzzle.save();

        } else {
          return userPuzzle;
        }
      })
      .then((userPuzzle) => {

        var now = Date.parse(new Date()) / 1000;
        var usedTime = now - userPuzzle.startTime;

        res.send({
          remainTime: parseInt((5400 - usedTime))
        });
      });
});

router.post('/save', function (req, res) {
  var orderId = req.body.orderId;
  var userAnswer = req.body.userAnswer;
  var userId = req.session.user.id;
  userPuzzle.findOne({userId: userId})
      .then(function (data) {
        if (orderId > data.quizDemos.length - 1) {
          data.quizItems[orderId - data.quizDemos.length].userAnswer = userAnswer;
          data.save(function (err) {
            if (err)
              console.log(err);
          });
        }
      })
      .then(function () {
        res.send(200);
      })

});

router.get('/createUser', function (req, res) {

  var userId = req.session.user.id;
  var userPuzzleUrl = 'papers/enrollment';
  var quizzesItemsUrl = '';
  var quizzesExamplesUrl = '';
  var quizItems;
  var quizExamples;

  //agent.get(apiServer + userPuzzleUrl)
  //    .set('Content-Type', 'application/json')
  //    .end()
  //    .then(function (err, res) {
  //      quizzesItemsUrl = res.body.section[0].quizzes[0].items;
  //      quizzesExamplesUrl = res.body.section[0].quizzes[0].examples;
  //    });
  //
  //agent.get(apiServer + quizzesItemsUrl)
  //    .set('Content-Type', 'application/json')
  //    .end()
  //    .then(function (err, res) {
  //      quizItems = res.body.quizItems;
  //    });
  //
  //agent.get(apiServer + quizzesExamplesUrl)
  //    .set('Content-Type', 'application/json')
  //    .end()
  //    .then(function (err, res) {
  //      quizExamples = res.body.quizExamples;
  //    });


  userPuzzle.findOne({userId: userId})
      .then(function (data) {
        if (data === null) {
          var newUser = new userPuzzle({
            userId: userId
          });

          //newUser.quizItems = quizItems;

          newUser.quizItems = [
            {id: 1, uri: 'quizItems/1', userAnswer: 9},
            {id: 5, uri: 'quizItems/5', userAnswer: null},
            {id: 8, uri: 'quizItems/8', userAnswer: null},
            {id: 14, uri: 'quizItems/14', userAnswer: 1},
            {id: 26, uri: 'quizItems/26', userAnswer: null},
            {id: 33, uri: 'quizItems/33', userAnswer: null},
            {id: 36, uri: 'quizItems/36', userAnswer: null},
            {id: 41, uri: 'quizItems/41', userAnswer: 1},
            {id: 47, uri: 'quizItems/47', userAnswer: null},
            {id: 49, uri: 'quizItems/49', userAnswer: null}
          ];

          //newUser.quizExamples = quizExamples;
          newUser.quizDemos = [
            {id: 2, uri: 'quizItems/2'},
            {id: 3, uri: 'quizItems/3'},
            {id: 4, uri: 'quizItems/4'}
          ];

          return newUser.save();
        }

        res.send({status: 200})
      });
});


module.exports = router;