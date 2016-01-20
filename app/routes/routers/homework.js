'use strict';

var express = require('express');
var router = express.Router();
var homework = require('../../models/user-homework-quizzes');

var HomeworkController  = require('../../controllers/homework-controller');
var homeworkController  = new  HomeworkController();

router.get('/get-list', homeworkController.getList);
//router.get('/getContent',homeworkController.getHomeworkQuiz);

module.exports = router;
