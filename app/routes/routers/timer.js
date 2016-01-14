'use strict';

var express = require('express');
var router = express.Router();
var userPuzzle = require('../../models/user-puzzle');
var time = require('../../mixin/time');
var _timeBase = 90;

router.get('/remain-time', function (req, res) {
  var TOTAL_TIME = _timeBase * time.MINUTE;

  userPuzzle.findOne({userId: req.session.user.id})
      .then((userPuzzle) => {

        if (!userPuzzle.startTime) {
          userPuzzle.startTime = Date.parse(new Date()) / time.SECONDS;

          return userPuzzle.save();

        } else {
          return userPuzzle;
        }
      })
      .then((userPuzzle) => {

        var now = Date.parse(new Date()) / time.SECONDS;
        var usedTime = now - userPuzzle.startTime;

        res.send({
          remainTime: parseInt((TOTAL_TIME - usedTime))
        });
      });
});

module.exports = router;