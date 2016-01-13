'use strict';

var express = require('express');
var router = express.Router();
var constant = require('../../mixin/back-constant.json');
var UserPuzzleController = require('../../controllers/user-puzzle');
var userPuzzleController = new UserPuzzleController();

router.post('/save', userPuzzleController.saveAnswer);

router.get('/createUser', userPuzzleController.createUser);

module.exports = router;