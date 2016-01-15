'use strict';

var express = require('express');
var router = express.Router();
var programme = require('../../models/programme');

var ProgrammeController  = require('../../controllers/programme-controller');
var programmeController  = new  ProgrammeController();

router.get('/get-list', programmeController.getList);

module.exports = router;
