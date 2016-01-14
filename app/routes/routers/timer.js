'use strict';

var express = require('express');
var router = express.Router();
var time = require('../../mixin/time');
var _timeBase = 90;
var logicPuzzle = require('../../models/logic-puzzle');

router.get('/remain-time', function (req, res) {
  var TOTAL_TIME = _timeBase * time.MINUTE;

  logicPuzzle.findOne({userId: req.session.user.id})
      .then((logicPuzzle) => {

        if (!logicPuzzle.startTime) {
          logicPuzzle.startTime = Date.parse(new Date()) / time.SECONDS;

          return logicPuzzle.save();

        } else {
          return logicPuzzle;
        }
      })
      .then((logicPuzzle) => {

        var now = Date.parse(new Date()) / time.SECONDS;
        var usedTime = now - logicPuzzle.startTime;

        res.send({
          remainTime: parseInt((TOTAL_TIME - usedTime))
        });
      });
});

module.exports = router;