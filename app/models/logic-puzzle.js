'use strict';

var mongoose = require('mongoose');

var superAgent = require('superagent');
var agent = require('superagent-promise')(superAgent, Promise);
var apiServer = require('../configuration').apiServer;

var constant = require('../mixin/constant');
var _timeBase = 90;

var Schema = mongoose.Schema;

var logicPuzzleSchema = new Schema({
  userId: Number,
  startTime: Number,
  quizItems: [{
    id: Number,
    question: String,
    description: String,
    chartPath: String,
    initializedBox: String,
    userAnswer: String
  }],
  quizExamples: [{
    id: Number,
    question: String,
    answer: String,
    description: String,
    chartPath: String,
    initializedBox: String
  }],
  blankQuizId: Number,
  paperId: Number,
  isCommited: Boolean,
  endTime: String
});

logicPuzzleSchema.statics.isPaperCommited = function (userId, callback) {
  var isPaperCommited;

  this.findOne({userId: userId}, (err, logicPuzzle) => {
    if (err || !logicPuzzle) {
      isPaperCommited = false;
    } else {
      var TOTAL_TIME = _timeBase * constant.time.MINUTE_PER_HOUR;

      var startTime = logicPuzzle.startTime || Date.parse(new Date()) / constant.time.MILLISECOND_PER_SECONDS;
      var now = Date.parse(new Date()) / constant.time.MILLISECOND_PER_SECONDS;

      var usedTime = now - startTime;

      isPaperCommited = logicPuzzle.isCommited || parseInt(TOTAL_TIME - usedTime) <= 0 ? true : false;
    }

    callback(isPaperCommited);
  });
};

logicPuzzleSchema.statics.getLogicPuzzle = function (orderId, userId) {
  var userAnswer;
  var itemsCount;

  return this.findOne({userId: userId})
      .then(function (data) {
        data.quizExamples.forEach(function (example) {
          example.isExample = true;
        });
        data.quizItems.forEach(function (item) {
          item.isExample = false;
        });
        var quizAll = data.quizExamples.concat(data.quizItems);
        itemsCount = quizAll.length;
        return quizAll;
      })
      .then(function (quizAll) {
        userAnswer = quizAll[orderId].userAnswer || quizAll[orderId].answer || null;
        return {
          item: {
            id: quizAll[orderId].id,
            initializedBox: JSON.parse(quizAll[orderId].initializedBox),
            question: quizAll[orderId].question,
            description: JSON.parse(quizAll[orderId].description),
            chartPath: quizAll[orderId].chartPath
          },
          userAnswer: userAnswer,
          itemsCount: itemsCount,
          isExample: quizAll[orderId].isExample
        };
      });
};

logicPuzzleSchema.statics.submitPaper = function (req, res) {
  var examerId = req.session.user.id;
  var endTime = Date.parse(new Date()) / constant.time.MILLISECOND_PER_SECONDS;
  this.findOne({userId: examerId})
      .then(function (data) {

        var itemPosts = [];
        data.quizItems.forEach(function (quizItem) {
          itemPosts.push({answer: quizItem.userAnswer, quizItemId: quizItem.id});
        });
        return agent.post(apiServer + 'scoresheets')
            .set('Content-Type', 'application/json')
            .send({
              examerId: examerId,
              paperId: data.paperId,
              blankQuizSubmits: [
                {
                  blankQuizId: data.blankQuizId,
                  itemPosts: itemPosts
                }
              ]
            })
            .end((err) => {
              if(err){
                console.log(err);
              }else {
                data.endTime = endTime;
                data.isCommited = true;

                return data.save();
              }
            });
      })
      .then(function (data) {
        res.send({status: constant.httpCode.OK});
      });
};

module.exports = mongoose.model('LogicPuzzle', logicPuzzleSchema);
