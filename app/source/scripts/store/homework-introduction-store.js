'use strict';

var Reflux = require('reflux');
var HomeworkActions = require('../actions/homework-actions');
var request = require('superagent');
var constant = require('../../../mixin/constant');
var homeworkQuizzesStatus = require('../../../mixin/constant').homeworkQuizzesStatus;

var HomeworkIntroductionStore = Reflux.createStore({
  listenables: [HomeworkActions],

  onChangeOrderId: function (orderId) {
    request.get('homework/quiz')
        .set('Content-Type', 'application/json')
        .query({orderId: orderId})
        .end((err, res) => {
          if(res.body.status === constant.httpCode.FORBIDDEN){
            this.trigger({
              desc: '##当前题目处于锁定状态!',
              showRepo: false
            });
          } else if(res.body.quiz.quizStatus === homeworkQuizzesStatus.PROGRESS){
            this.trigger({
              submited:true,
              checked:false,
              githubUrl:res.body.quiz.userAnswerRepo,
              branches:[res.body.quiz.branch]
            });
          } else if(res.body.quiz.quizStatus === homeworkQuizzesStatus.SUCCESS){
            this.trigger({
              submited:true,
              checked:true,
              githubUrl:res.body.quiz.userAnswerRepo,
              branches:[res.body.quiz.branch]
            });
          }
          if(res.body.status === constant.httpCode.OK){
            this.trigger({
              desc: res.body.quiz.desc,
              templateRepo: res.body.quiz.templateRepo,
              showRepo: true
            });
          }
        });
  }
});

module.exports = HomeworkIntroductionStore;