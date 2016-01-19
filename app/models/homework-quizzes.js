'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var homeworkQuizzesSchema = new Schema({
  id: Number,
  desc: String,
  templateRespos: String
});

homeworkQuizzesSchema.statics.getList = function (callback) {
  this.find((err, data) => {
    var list = [];

    data.forEach((item) => {
      list.push(item.id);
    });

    callback(null, list);
  });
};

homeworkQuizzesSchema.statics.upsertData = function (data, callback) {
  this.getList((err, list) => {
    data.forEach((item) => {
      if(!~list.indexOf(item.id)) {
        this.create({
          id: item.id,
          desc: item.description,
          templateRespos: item.templateRepository
        });
      }
    });

    callback(null, data);
  });
};

module.exports = mongoose.model('HomeworkQuizzes', homeworkQuizzesSchema);