var express = require('express');
var router = express.Router();

var userPuzzle = require('../../models/user-puzzle');
var constant = require('../../mixin/back-constant.json');

router.get('/remain-time', function(req, res){
  userPuzzle.findOne({userId: req.session.user.id})
    .then((userPuzzle) => {

      if(!userPuzzle.startTime){
        userPuzzle.startTime = Date.parse(new Date()) / 1000;

        return userPuzzle.save();

      }else{
        return userPuzzle;
      }
    })
    .then((userPuzzle) => {

      var now = Date.parse(new Date()) / 1000;
      var usedTime = now - userPuzzle.startTime;

      res.send({
        remainTime: parseInt((5400 - usedTime))
      });
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