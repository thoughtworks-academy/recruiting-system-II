'use strict';

var express = require('express');
var router = express.Router();

var userPuzzle = require('../../models/user-puzzle');

var UserPuzzleController = require('../../controllers/user-puzzle');
var userPuzzleController = new UserPuzzleController();

router.get('/', userPuzzleController.getUserPuzzle);

router.post('/', function (req, res) {
  userPuzzle.submitPaper(req, res);
});


module.exports = router;
