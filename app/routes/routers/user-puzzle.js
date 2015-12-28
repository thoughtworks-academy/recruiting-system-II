var express = require('express');
var router = express.Router();
var mongoose = require('../../utils/db-connection');

var UserPuzzle = require('../../models/user-puzzle');

var db = mongoose.db;

var _userId = 1;

router.post('/',function(req,res,next){
  mongoose.open();
  db.once('open', function () {
    console.log('open!');
    next();
  });
});

router.post('/', function (req, res, next) {

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
          doc.save(function () {
            if (err) {
              res.send(err);
              return console.error(err);
            }else {
              res.send('cover answer success');
            }
            next();
          });
        } else {
          doc.puzzle.push(req.body);
          doc.save(function () {
            if (err) {
              res.send(err);
              return console.error(err);
            }else{
              res.send('push answer success');
            }
            next();
          })
        }
      } else {
        newUser.save(function (err) {
          if (err) {
            res.send(err);
            return console.error(err);
          }else{
            res.send('create answer success');
          }
          next();
        });
      }
    });

});

router.get('/', function (req, res, next) {
  UserPuzzle.findOne({userId: _userId}, function (err, doc) {
    if (err) {
      res.send(err);
    }
    if (doc === null) {
      res.send({answer: null});
    }else {

      var currentPuzzleIndex = answerIndex(doc.puzzle, parseInt(req.query.index));
      if (currentPuzzleIndex !== -1) {
        res.send({answer: doc.puzzle[currentPuzzleIndex].userAnswer});
      } else {
        res.send({answer: null});
      }
    }
    next();
  });
});

router.post('/',function(){
  db.close(function () {
    console.log('closed!')
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