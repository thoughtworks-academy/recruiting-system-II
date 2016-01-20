'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var homeworkQuizzesSchema = new Schema({
  id: Number,
  desc: String,
  evaluateScript: String,
  evaluateRepo: String,
  templateRepo: String
});

homeworkQuizzesSchema.statics.getList = function (callback) {
  this.find((err, data) => {
    if (err){
      callback(err);
    }else {
      var list = [];

      data.forEach((item) => {
        list.push(item.id);
      });

      callback(null, list);
    }
  });
};

homeworkQuizzesSchema.statics.upsertData = function (data, callback) {
  this.getList((err, list) => {
    data.forEach((item) => {
      if(!~list.indexOf(item.id)) {
        this.create({
          id: item.id,
          desc: item.description,
          evaluateScript: item.evaluateScript,
          evaluateRepo: item.evaluateRepository,
          templateRepo: item.templateRepository
        });
      }
    });

    callback(null, 'success');
  });
};

module.exports = mongoose.model('HomeworkQuizzes', homeworkQuizzesSchema);
