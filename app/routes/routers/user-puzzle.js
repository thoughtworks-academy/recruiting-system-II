'use strict';

var express = require('express');
var router = express.Router();
var constant = require('../../mixin/back-constant');
var UserPuzzleController = require('../../controllers/user-puzzle');
var userPuzzleController = new UserPuzzleController();

router.post('/save', userPuzzleController.saveAnswer);

router.get('/initialUser', userPuzzleController.initialUser);

module.exports = router;