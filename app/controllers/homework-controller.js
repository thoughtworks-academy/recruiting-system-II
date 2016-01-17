'use strict';

var homework = require('../models/user-homework-quizzes');
var async = require('async');

function HomeworkController() {

}

HomeworkController.prototype.getList = function (req, res) {
  res.send({topicStatusList: [{topicStatus: 3}, {topicStatus: 4}, {topicStatus: 2}, {topicStatus: 1}, {topicStatus: 0}]});
};


HomeworkController.prototype.updateStatus = function (existStatus, receiceStatus) {
  //TODO:
};


module.exports = HomeworkController;