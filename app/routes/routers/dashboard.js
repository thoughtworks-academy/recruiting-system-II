'use strict';

var express = require('express');
var router = express.Router();

var userPuzzle = require('../../models/user-puzzle');

router.get('/', function (req, res) {
  if (req.session.user){
    let userId = req.session.user.id;
    userPuzzle.isPaperCommited(userId)
        .then((data) => {
          res.send(data);
        })
  }else {
    res.send({status: 404});
  }
});

module.exports = router;
