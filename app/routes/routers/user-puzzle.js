var express = require('express');
var router = express.Router();
var db = require('../../utils/db-connection');

var UserPuzzle = require('../../models/user-puzzle');

router.post('/', function (req, res) {
  var newUser = new UserPuzzle({
    userId: req.body.userId,
    puzzle: {
      puzzleId: req.body.puzzle.puzzleId,
      userPuzzleIndex: req.body.puzzle.userPuzzleIndex,
      userAnswer: req.body.puzzle.userAnswer
    }
  });

  newUser.save(function (err) {
    if (err) {
      res.send(err);
      return console.error(err);
    }
    res.send('success');
  });
});


module.exports = router;
