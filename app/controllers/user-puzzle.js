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


module.exports = UserPuzzleController;