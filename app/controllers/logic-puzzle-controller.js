'use strict';

var logicPuzzle = require('../models/logic-puzzle');
var constant = require('../mixin/constant');

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
  logicPuzzle.saveAnswer(orderId, userAnswer, userId)
      .then((isSucceed) => {
        if (isSucceed === true) {
          res.sendStatus(constant.OK);
        }
      });
};



module.exports = LogicPuzzleController;