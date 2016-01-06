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
        return quizAll
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
      })
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
      .then(function (data) {
        data.endTime = endTime;
        data.isCommited = true;
        data.save();
        res.send({status: 200});
      })
};

userPuzzleSchema.statics.saveAnswer = function (req, res) {
  var orderId = req.body.orderId;
  var userAnswer = req.body.userAnswer;
  var userId = req.session.user.id;
  console.log(userAnswer);
  this.findOne({userId: userId})
      .then(function (data) {

        if (orderId > data.quizExamples.length - 1) {
          data.quizItems[orderId - data.quizExamples.length].userAnswer = userAnswer;
          console.log(data.quizItems[orderId - data.quizExamples.length].userAnswer)
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

userPuzzleSchema.statics.initialDB = function (req, res) {
  var userId = req.session.user.id;
  var quizItems,quizExamples,blankQuizId,paperId;
  var userPuzzleUrl = 'papers/enrollment';

  this.findOne({userId: userId})
      .then((data) => {
        if(!data){
          return agent.get(apiServer + userPuzzleUrl)
              .set('Content-Type', 'application/json')
              .end()
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
              .end()
        }else{
          return null;
        }

      })
      .then((items) => {
        if(items){
          quizItems = items.body.quizItems;
          quizExamples = items.body.exampleItems;
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
          },function (){
            process.exit();
            res.send({status: 200})
          })
        }
      })
};

module.exports = mongoose.model('UserPuzzles', userPuzzleSchema);
