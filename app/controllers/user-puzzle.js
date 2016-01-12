'use strict';

//var superAgent = require('superagent');
//var agent = require('superagent-promise')(superAgent, Promise);
//var apiServer = require('../configuration').apiServer;
var userPuzzle = require('../models/user-puzzle');

function UserPuzzleController() {

}

UserPuzzleController.prototype.getUserPuzzle = function(req,res){
  var orderId = req.query.orderId;
  var userId = req.session.user.id;

  userPuzzle.getUserPuzzle(orderId,userId)
      .then((data) => {
        res.send(data);
      });
};

UserPuzzleController.prototype.saveAnswer = function(req,res){
  var orderId = req.body.orderId;
  var userAnswer = req.body.userAnswer;
  var userId = req.session.user.id;
  userPuzzle.saveAnswer(orderId,userAnswer,userId)
      .then((isSucceed) => {
        if(isSucceed === true){
          res.sendStatus(200);
        }
      });
};

module.exports = UserPuzzleController;