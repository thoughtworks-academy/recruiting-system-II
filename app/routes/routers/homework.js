'use strict';

var express = require('express');
var router = express.Router();
var homework = require('../../models/user-homework-quizzes');

var HomeworkController  = require('../../controllers/homework-controller');
var homeworkController  = new  HomeworkController();
var Vendor = require('../../vendor/vendor');
var vendor = new Vendor();

router.get('/get-list', homeworkController.getList);
router.get('/quiz',homeworkController.getQuiz);
router.post('/save',homeworkController.saveGithubUrl);
router.post('/result',homeworkController.updateResult);
router.get('/progress', homeworkController.getProgressTasks);
router.get('/get-branches',vendor.getBranches);

module.exports = router;