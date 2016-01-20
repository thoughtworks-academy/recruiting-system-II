'use strict';

var Reflux = require('reflux');
var HomeworkActions = require('../actions/homework-actions');
var request = require('superagent');
var constant = require('../../../mixin/constant');

var HomeworkIntroductionStore = Reflux.createStore({
  listenables: [HomeworkActions],

  onChangeOrderId: function (orderId) {
    request.get('homework/quiz')
        .set('Content-Type', 'application/json')
        .query({orderId: orderId})
        .end((err, res) => {
          if(res.body.status === 403){
            this.trigger({
              desc: '##当前题目处于锁定状态!'
            })
          }
          if(res.body.status === 200){
            this.trigger({
              desc: res.body.quiz.desc,
              templateRepo: res.body.quiz.templateRepo
            });
          }
        });
  }
});

module.exports = HomeworkIntroductionStore;