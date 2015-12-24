var express = require('express');
var router = express.Router();
var mongoose = require('../../utils/db-connection');

var UserPuzzle = require('../../models/user-puzzle');

var db = mongoose.db;

router.post('/', function (req, res) {
  var newUser = new UserPuzzle({
    userId: req.body.userId,
    puzzle: {
      puzzleId: req.body.puzzle.puzzleId,
      userPuzzleIndex: req.body.puzzle.userPuzzleIndex,
      userAnswer: req.body.puzzle.userAnswer
    }
  });

  mongoose.open();
  db.once('open', function () {
    newUser.save(function (err) {
      if (err) {
        res.send(err);
        return console.error(err);
      }
      db.close(function () {
        res.send('success');
      });
    });
  });


});


module.exports = router;