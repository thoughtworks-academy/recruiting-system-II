'use strict';

var express = require('express');
var router = express.Router();

var UserController = require('../../controllers/user-controller');
var userController = new UserController();

router.get('/answer', userController.answer);

module.exports = router;