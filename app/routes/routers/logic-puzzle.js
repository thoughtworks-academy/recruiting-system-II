'use strict';

var express = require('express');
var router = express.Router();

var userPuzzle = require('../../models/user-puzzle');

router.get('/', function (req, res) {userPuzzle.getUserPuzzle(req, res);});

router.post('/',function(req, res) {userPuzzle.submitPaper(req, res);});


module.exports = router;
