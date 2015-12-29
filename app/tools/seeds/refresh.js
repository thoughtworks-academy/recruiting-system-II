var mongoose = require('mongoose');
var userPuzzle = require("../../models/user-puzzle");


mongoose.connect("mongodb://localhost/twars");
db = mongoose.connection;
db.once('open', function () {
  userPuzzle.remove(function() {
    userPuzzle.create([
      {
        userId: 1,
        startTime: 1451383946848,
        quizItems: [
          {id: 1, uri : 'quizItems/1',  userAnswer: 1},
          {id: 5, uri : 'quizItems/5',  userAnswer: null},
          {id: 8, uri : 'quizItems/8',  userAnswer: null},
          {id: 14, uri : 'quizItems/14',  userAnswer: 2},
          {id: 26, uri : 'quizItems/26',  userAnswer: null},
          {id: 33, uri : 'quizItems/33',  userAnswer: null},
          {id: 36, uri : 'quizItems/36',  userAnswer: null},
          {id: 41, uri : 'quizItems/41',  userAnswer: 4},
          {id: 47, uri : 'quizItems/47',  userAnswer: null},
          {id: 49, uri : 'quizItems/49',  userAnswer: null}
        ]
      }
    ], function () {
      process.exit();
    });
  });

});