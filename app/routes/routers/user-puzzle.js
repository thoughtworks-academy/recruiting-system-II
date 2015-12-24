var express = require('express');
var router = express.Router();
var mongoose = require('../../utils/db-connection');

var UserPuzzle = require('../../models/user-puzzle');

var db = mongoose.db;

var _userId = 1;

router.post('/', function (req, res) {

  mongoose.open();
  db.once('open', function () {

    var newUser = new UserPuzzle({
      userId: _userId,
      puzzle: [{
        puzzleId: req.body.puzzleId,
        userPuzzleIndex: req.body.userPuzzleIndex,
        userAnswer: req.body.userAnswer
      }]
    });

    UserPuzzle.findOne({userId: 1}, function (err, doc) {
      if (err) {
        console.log(err)
      }
      if (doc) {
        var index = answerIndex(doc.puzzle, req.body.userPuzzleIndex);
        if (index !== -1) {
          doc.puzzle[index].userAnswer = req.body.userAnswer;
          doc.save(function(){
            if (err) {
              res.send(err);
              return console.error(err);
            }
            db.close(function () {
              res.send('cover answer success');
            });
          });
        } else {
          doc.puzzle.push(req.body);
          doc.save(function () {
            if (err) {
              res.send(err);
              return console.error(err);
            }
            db.close(function () {
              res.send('push answer success');
            });
          })
        }
      } else {
        newUser.save(function (err) {
          if (err) {
            res.send(err);
            return console.error(err);
          }
          db.close(function () {
            res.send('create answer success');
          });

        });
      }
    });
  });
});

router.get('/', function (req, res) {
  UserPuzzle.findOne({userId: _userId},function(err,doc){
    console.log(doc.puzzle);
    var currentPuzzleIndex = answerIndex(doc.puzzle, parseInt(req.query.index));
    console.log(currentPuzzleIndex);
    res.send(doc.puzzle[currentPuzzleIndex].userAnswer);
  });
});

function answerIndex(puzzle, index) {
  for (var i = 0; i < puzzle.length; i++) {
    if (puzzle[i].userPuzzleIndex === index) {
      return i;
    }
  }
  return -1;
}


module.exports = router;