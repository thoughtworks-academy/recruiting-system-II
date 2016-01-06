var mongoose = require('mongoose');
var Promise = this.Promise || require('promise');
var superAgent = require('superagent');
var agent = require('superagent-promise')(superAgent, Promise);

var Schema = mongoose.Schema;

var userPuzzleSchema = new Schema({
  userId: Number,
  startTime: Number,
  quizItems: [{
    id: Number,
    uri: String,
    userAnswer: Number
  }],
  quizExamples: [{
    id: Number,
    uri: String
  }],
  blankQuizId: Number,
  paperId: Number,
  isCommited: Boolean,
  endTime: String
});

userPuzzleSchema.statics.getUserPuzzle = function (req, res) {
  var orderId = req.query.orderId;
  var userId = req.session.user.id;
  var quizAll;
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
        quizAll = data.quizExamples.concat(data.quizItems);
        itemsCount = quizAll.length;
        return quizAll[orderId].uri;
      })
      .then(function (uri) {
        return agent.get(apiServer + uri)
            .set('Content-Type', 'application/json')
            .end();
      })
      .then(function (data) {
        console.log(data);
        userAnswer = quizAll[orderId].userAnswer || data.body.answer || null;

        res.send({
          item: {
            id: data.body.id,
            initializedBox: JSON.parse(data.body.initializedBox),
            question: data.body.question,
            description: JSON.parse(data.body.description),
            chartPath: data.body.chartPath
          },
          userAnswer: userAnswer,
          itemsCount: itemsCount,
          isExample: quizAll[orderId].isExample
        });
      })
};

userPuzzleSchema.statics.submitPaper = function (req, res){
  var examerId = req.session.user.id;
  var endTime = Date.parse(new Date()) / 1000;
  this.findOne({userId: examerId})
      .then(function(data){

        var itemPosts = [];
        data.quizItems.forEach(function(quizItem){
          itemPosts.push({answer: quizItem.userAnswer, quizItemId: quizItem.id});
        });
        var result = {
          examerId: examerId,
          paperId: data.paperId,
          blankQuizSubmits: [
            {
              blankQuizId: data.blankQuizId,
              itemPosts: itemPosts
            }
          ]
        };
        return data;
      })
      .then(function(data){
        data.endTime = endTime;
        data.isCommited = true;
        data.save();
        res.send({status:200});
      })
};

userPuzzleSchema.statics.saveAnswer = function(reqq, res){
  var orderId = req.body.orderId;
  var userAnswer = req.body.userAnswer;
  var userId = req.session.user.id;
  this.findOne({userId: userId})
      .then(function (data) {
        if (orderId > data.quizExamples.length - 1) {
          data.quizItems[orderId - data.quizExamples.length].userAnswer = userAnswer;
          data.save(function (err) {
            if (err)
              console.log(err);
          });
        }
      })
      .then(function () {
        res.sendStatus(200);
      })
};

module.exports = mongoose.model('UserPuzzles', userPuzzleSchema);