'use strict';

var express = require('express');
var router = express.Router();

var logicPuzzle = require('../../models/logic-puzzle');

router.get('/', function (req, res) {
  let userId = req.session.user.id;
  logicPuzzle.isPaperCommited(userId, (data) => {
    res.send({
      isPaperCommited: data
    });
  });
});

module.exports = router;
