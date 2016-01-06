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
  userPuzzle.initialDB(req, res)
});

module.exports = router;