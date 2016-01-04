var express = require('express');
var router = express.Router();
var Promise = this.Promise || require('promise');
var superAgent = require('superagent');
var agent = require('superagent-promise')(superAgent, Promise);
var userPuzzle = require('../../models/user-puzzle');

router.get('/', function (req, res) {

  var orderId = req.query.orderId;
  var userId = req.session.user.id;
  var quizAll;
  var userAnswer;
  var itemsCount;

  userPuzzle.findOne({userId: userId})
      .then(function (data) {
        if (data === null) {
          var newUser = new userPuzzle({
            userId: userId
          });

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

          newUser.quizDemos = [
            {id: 2, uri: 'quizItems/2'},
            {id: 3, uri: 'quizItems/3'},
            {id: 4, uri: 'quizItems/4'}
          ];

          newUser.save(function () {
            return 'success'
          });
        }

      }).then(function (data) {
        quizAll = data.quizDemos.concat(data.quizItems);
        itemsCount = quizAll.length;
        return quizAll[orderId].uri;
      })
      .then(function (uri) {
        return agent.get(apiServer + uri)
            .set('Content-Type', 'application/json')
            .end();
      })
      .then(function (data) {

        userAnswer = quizAll[orderId].userAnswer || 6;//data.body.answer
        res.send({
          item: {
            id: data.body.id,
            initializedBox: JSON.parse(data.body.initializedBox),
            question: data.body.questionZh,
            description: JSON.parse(data.body.descriptionZh),
            chartPath: data.body.chartPath
          },
          userAnswer: userAnswer,
          itemsCount: itemsCount,
          isExample: quizAll[orderId].userAnswer === undefined
        });
      });
});


module.exports = router;
