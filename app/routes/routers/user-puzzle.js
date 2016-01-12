'use strict';

var express = require('express');
var router = express.Router();
var superAgent = require('superagent');
var agent = require('superagent-promise')(superAgent, Promise);
var userPuzzle = require('../../models/user-puzzle');
var constant = require('../../mixin/back-constant.json');
var UserPuzzleController = require('../../controllers/user-puzzle');
var userPuzzleController = new UserPuzzleController();

router.post('/save', userPuzzleController.saveAnswer);

router.get('/createUser', function (req, res) {
  userPuzzle.initialDB(req, res);
});

module.exports = router;