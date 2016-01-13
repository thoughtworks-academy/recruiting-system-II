'use strict';

var express = require('express');
var router = express.Router();

var userPuzzle = require('../../models/user-puzzle');

router.get('/', function (req, res) {
  let userId = req.session.user.id;
  userPuzzle.isPaperCommited(userId, (data) => {
    res.send({
      isPaperCommited: data
    });
  });
});

module.exports = router;
