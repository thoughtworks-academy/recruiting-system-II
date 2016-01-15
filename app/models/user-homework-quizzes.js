'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userHomeworkQuizzesSchema = new Schema({
  userId: Number,
  homeworkItems: [{
    id: Number,
    locked: Boolean,
    states: Number
  }]
});

module.exports = mongoose.model('UserHomeworkQuizzes', userHomeworkQuizzesSchema);
