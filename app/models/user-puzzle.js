'use strict';

var mongoose = require('mongoose');
var superAgent = require('superagent');
var agent = require('superagent-promise')(superAgent, Promise);
var apiServer = require('../configuration').apiServer;

var Schema = mongoose.Schema;

var userPuzzleSchema = new Schema({
  userId: Number,
  startTime: Number,
  quizItems: [{
    id: Number,
    question: String,
    description: String,
    chartPath: String,
    initializedBox: String,
    userAnswer: Number
  }],
  quizExamples: [{
    id: Number,
    question: String,
    answer: Number,
    description: String,
    chartPath: String,
    initializedBox: String
  }],
  blankQuizId: Number,
  paperId: Number,
  isCommited: Boolean,
  endTime: String
});

userPuzzleSchema.statics.isPaperCommited = function (userId) {
  var data = {};

  return this.findOne({userId: userId})
      .then((userPuzzle, err) => {

        if (err || !userPuzzle) {
          data.status = 404;
        }else {

          var startTime = userPuzzle.startTime || Date.parse(new Date()) / 1000;
          var now = Date.parse(new Date()) / 1000;
          var usedTime = now - startTime;

          data.isPaperCommited = userPuzzle.isCommited || parseInt(5400 - usedTime) <= 0 ? true : false;
          data.status = 200;
        }

        return data;
      });
};

userPuzzleSchema.statics.getUserPuzzle = function (req, res) {
  var orderId = req.query.orderId;
  var userId = req.session.user.id;
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

        res.send({
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
        });
      });
};

userPuzzleSchema.statics.submitPaper = function (req, res) {
  var examerId = req.session.user.id;
  var endTime = Date.parse(new Date()) / 1000;
  this.findOne({userId: examerId})
      .then(function (data) {

        var itemPosts = [];
        data.quizItems.forEach(function (quizItem) {
          itemPosts.push({answer: quizItem.userAnswer, quizItemId: quizItem.id});
        });
        agent.post(apiServer + 'scoresheets')
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
            .end(function(err){
              if(err){
                console.log(err);
              }
            });
      })
      .then(function (data) {
        data.endTime = endTime;
        data.isCommited = true;
        data.save();
        res.send({status: 200});
      });
};

userPuzzleSchema.statics.saveAnswer = function (req, res) {
  var orderId = req.body.orderId;
  var userAnswer = req.body.userAnswer;
  var userId = req.session.user.id;
  this.findOne({userId: userId})
      .then(function (data) {

        if (orderId > data.quizExamples.length - 1) {
          data.quizItems[orderId - data.quizExamples.length].userAnswer = userAnswer;
          data.save(function (err) {
            if (err) {
              console.log(err);
            }
          });
        }
      })
      .then(function () {
        res.sendStatus(200);
      });
};

userPuzzleSchema.statics.initialDB = function (req, res) {
  var userId = req.session.user.id;
  var quizItems,quizExamples,blankQuizId,paperId;
  var userPuzzleUrl = 'papers/enrollment';

  this.findOne({userId: userId})
      .then((data) => {
        if(!data){
          return agent.get(apiServer + userPuzzleUrl)
              .set('Content-Type', 'application/json')
              .end();
        }else{
          return null;
        }

      })
      .then((res) => {
        if(res){
          var quizzes = res.body.sections[0].quizzes[0];
          blankQuizId = quizzes.id;
          paperId = res.body.id;
          return quizzes.items.uri;
        }else{
          return null;
        }

      })
      .then((itemsUri) => {
        if(itemsUri){
          return agent.get(apiServer + itemsUri)
              .set('Content-Type', 'application/json')
              .end();
        }else{
          return null;
        }

      })
      .then((items) => {
        if(items){
          quizItems = items.body.quizItems;
          quizExamples = items.body.exampleItems;
          console.log(quizItems);
          console.log(quizExamples);
          return {isNotExit: true};
        }else{
          return {isNotExit: false};
        }
      })
      .then((result) => {
        if(result.isNotExit){
          this.create({
            userId: userId,
            quizItems: quizItems,
            quizExamples: quizExamples,
            blankQuizId: blankQuizId,
            paperId: paperId
          });
          res.send({status: 200, message: '创建成功!'});
        }else{
          res.send({status: 200, message: '数据库已存在!'});
        }
      });
};

module.exports = mongoose.model('UserPuzzles', userPuzzleSchema);
