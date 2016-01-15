'use strict';

var logicPuzzle = require('../models/logic-puzzle');
var constant = require('../mixin/constant');
var async = require('async');

function LogicPuzzleController() {
}

LogicPuzzleController.prototype.getLogicPuzzle = function (req, res) {
  var orderId = req.query.orderId;
  var userId = req.session.user.id;

  logicPuzzle.getLogicPuzzle(orderId, userId)
      .then((data) => {
        res.send(data);
      });
};

LogicPuzzleController.prototype.saveAnswer = function (req, res) {
  var orderId = req.body.orderId;
  var userAnswer = req.body.userAnswer;
  var userId = req.session.user.id;
  async.waterfall([
    function (done) {
      logicPuzzle.findOne({userId: userId}, done);
    }, function (data, done) {

      if (orderId > data.quizExamples.length - 1) {
        data.quizItems[orderId - data.quizExamples.length].userAnswer = userAnswer;
        data.save((err,doc)=>{
          done(err,doc);
        });
      } else {
        done(null,'doc');
      }
    }, function (doc,done) {
      done();
    }
  ],function (err) {
    if(!err){
      res.sendStatus(constant.OK);
    } else {
      res.sendStatus(constant.INTERNAL_SERVER_ERROR);
    }
  });
};


module.exports = LogicPuzzleController;