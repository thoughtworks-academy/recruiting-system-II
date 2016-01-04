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
        quizAll = data.quizExamples.concat(data.quizItems);
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
            question: data.body.question,
            description: JSON.parse(data.body.description),
            chartPath: data.body.chartPath
          },
          userAnswer: userAnswer,
          itemsCount: itemsCount,
          isExample: quizAll[orderId].userAnswer === undefined
        });
      })
});

router.post('/',function(req, res) {
  var examerId = req.session.user.id;
  var endTime = Date.parse(new Date()) / 1000;
  console.log(req.session.user.id);
  userPuzzle.findOne({userId: examerId})
      .then(function(data){

        var itemPosts = [];
        data.quizItems.forEach(function(quizItem){
          itemPosts.push({answer: quizItem.userAnswer, quizItemId: quizItem.id});
        });
        console.log(itemPosts)
        var result = {
          examerId: examerId,
          paperId: data.paperId,
          blankQuizSubmits: [
            {
              blankQuizId: data.blankQuizId,
              itemPosts: itemPosts
            }
          ]
        };
        return data;
      })
      .then(function(data){
        data.endTime = endTime;
        data.isCommited = true;
        console.log(data);
        data.save();
        res.send({status:200});
      })
});


module.exports = router;
