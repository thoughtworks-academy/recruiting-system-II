var express = require('express');
var router = express.Router();
var Promise = this.Promise || require('promise');
var superAgent = require('superagent');
var agent = require('superagent-promise')(superAgent, Promise);
var userPuzzle = require('../../models/user-puzzle');

router.get('/', function (req, res) {

  var orderId = req.query.orderId;
  var userId = req.session.user.id;
  var userAnswer;
  var itemsCount;

  userPuzzle.findOne({userId: userId})
      .then(function (data) {
        userAnswer = data.quizItems[orderId].userAnswer;
        itemsCount = data.quizItems.length;
        return data.quizItems[orderId].uri;
      })
      .then(function (uri) {
        return agent.get(apiServer + uri)
            .set('Content-Type', 'application/json')
            .end();
      })
      .then(function (data) {
        res.send({
          item: {
            id: data.body.id,
            initializedBox: JSON.parse(data.body.initializedBox),
            question: data.body.questionZh,
            description: JSON.parse(data.body.descriptionZh),
            chartPath: data.body.chartPath
          },
          userAnswer: userAnswer,
          itemsCount: itemsCount
        });
      });
});

module.exports = router;
