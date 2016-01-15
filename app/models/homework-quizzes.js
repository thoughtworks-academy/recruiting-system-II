'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var homeworkQuizzesSchema = new Schema({
  id: Number,
  desc: String,
  templateRespos: String
});

module.exports = mongoose.model('HomeworkQuizzes', homeworkQuizzesSchema);
