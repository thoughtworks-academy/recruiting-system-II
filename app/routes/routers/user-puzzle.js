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

router.post('/save', function (req, res) {userPuzzle.saveAnswer(req, res)});

router.get('/createUser', function (req, res) {

  var userId = req.session.user.id;
  var userPuzzleUrl = 'papers/enrollment';
  var newUser;
  
  userPuzzle.findOne({userId: userId})
      .then(function (data) {
        if (data === null) {
          newUser = new userPuzzle({
            userId: userId
          });
        }else{
          res.send({status: 200});
        }
      })
      .then(function(){
        return agent.get(apiServer + userPuzzleUrl)
            .set('Content-Type', 'application/json')
            .end()
      })
      .then(function (res) {
        var quizzes = res.body.sections[0].quizzes[0];
        newUser.blankQuizId =quizzes.id;
        newUser.paperId = res.body.id;
        return quizzes.items.url;
      })
      .then(function(itemsUrl){
        return agent.get(apiServer + itemsUrl)
            .set('Content-Type', 'application/json')
            .end()
      })
      .then(function(items){
        newUser.quizItems = items.body.quizItems;
        newUser.quizExamples = items.body.exampleItems;
        newUser.save(function(err){
          if(err){
            console.log(err);
          }else{
            res.send({status:200});
          }
        })
      })
});

module.exports = router;