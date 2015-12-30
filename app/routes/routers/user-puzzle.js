var express = require('express');
var router = express.Router();

var userPuzzle = require('../../models/user-puzzle');
var constant = require('../../mixin/back-constant.json');


router.post('/', function (req, res) {

  var userId = req.session.user.id || 5;

  userPuzzle.findOne({userId: userId}, function (err, doc) {

    if (err === null && doc === null) {

      var newUser = new UserPuzzle({
        userId: userId,
        startTime: Date.parse(new Date()) / 1000,
        quizItems: [
          {id: 1, uri : 'quizItems/1',  userAnswer: 9},
          {id: 5, uri : 'quizItems/5',  userAnswer: null},
          {id: 8, uri : 'quizItems/8',  userAnswer: null},
          {id: 14, uri : 'quizItems/14',  userAnswer: 1},
          {id: 26, uri : 'quizItems/26',  userAnswer: null},
          {id: 33, uri : 'quizItems/33',  userAnswer: null},
          {id: 36, uri : 'quizItems/36',  userAnswer: null},
          {id: 41, uri : 'quizItems/41',  userAnswer: 1},
          {id: 47, uri : 'quizItems/47',  userAnswer: null},
          {id: 49, uri : 'quizItems/49',  userAnswer: null}
        ]
      });

      newUser.save(function (err) {
        if (err) {
          res.send(err);
          return console.error(err);
        }else {
          res.send({
            status: constant.SUCCESSFUL_STATUS
          });
        }
      });

    }else {
      res.send({
        status: constant.SUCCESSFUL_STATUS
      });
    }

  });
});


router.post('/save',function(req, res){
  var orderId = req.body.orderId;
  var userAnswer = req.body.userAnswer;
  var userId = req.session.user.id;
  userPuzzle.findOne({userId: userId})
      .then(function(data){
        data.quizItems[orderId].userAnswer = userAnswer;
        data.save(function(err){
          if(err)
            console.log(err);
        });
      })
      .then(function(){
        res.send('submit success!');
      })

});

module.exports = router;