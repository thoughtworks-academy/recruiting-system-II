'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userHomeworkQuizzesSchema = new Schema({
  userId: Number,
  homeworkItems: [{
    id: Number,
    locked: Boolean,
    status: Number
  }]
});

userHomeworkQuizzesSchema.statics.initUserHomeworkQuizzes = function (userId, idList, callback) {
  this.findOne({userId: userId}, (err, doc) => {
    if (doc){
      callback(new Error('is exist'), null);
    }else {
      var homeworkItems = [];

      idList.forEach((id) => {
        homeworkItems.push({
          id: id,
          locked: true,
          status: 0
        });
      });

      this.create({
        userId: userId,
        homeworkItems: homeworkItems
      }, callback);
    }
  });
};

module.exports = mongoose.model('UserHomeworkQuizzes', userHomeworkQuizzesSchema);
