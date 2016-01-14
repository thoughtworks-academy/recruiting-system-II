'use strict';

var express = require('express');
var router = express.Router();

var logicPuzzle = require('../../models/logic-puzzle');

var LogicPuzzleController = require('../../controllers/logic-puzzle-controller');
var logicPuzzleController = new LogicPuzzleController();

router.get('/', logicPuzzleController.getLogicPuzzle);

router.post('/', function (req, res) {
  logicPuzzle.submitPaper(req, res);
});

router.post('/save', logicPuzzleController.saveAnswer);

module.exports = router;
