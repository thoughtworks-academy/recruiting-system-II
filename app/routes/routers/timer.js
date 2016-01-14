'use strict';

var express = require('express');
var router = express.Router();
var userPuzzle = require('../../models/user-puzzle');

router.get('/remain-time', function (req, res) {
  var THOUSAND_MILLISECONDS = 1000;
  var TOTAL_TIME = 5400;

  userPuzzle.findOne({userId: req.session.user.id})
      .then((userPuzzle) => {

        if (!userPuzzle.startTime) {
          userPuzzle.startTime = Date.parse(new Date()) / THOUSAND_MILLISECONDS;

          return userPuzzle.save();

        } else {
          return userPuzzle;
        }
      })
      .then((userPuzzle) => {

        var now = Date.parse(new Date()) / THOUSAND_MILLISECONDS;
        var usedTime = now - userPuzzle.startTime;

        res.send({
          remainTime: parseInt((TOTAL_TIME - usedTime))
        });
      });
});

module.exports = router;