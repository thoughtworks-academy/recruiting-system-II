'use strict';

var Reflux = require('reflux');
var HomeworkActions = require('../actions/homework-actions');
var request = require('superagent');
var constant = require('../../../mixin/constant');

var HomeworkIntroductionStore = Reflux.createStore({
  listenables: [HomeworkActions],

  onGetContent: function (orderId) {
    request.get('homework/getContent')
        .set('Content-Type', 'application/json')
        .query({orderId: orderId})
        .end((err, res) => {
          if(err){
            console.log(err);
          }else {
            this.trigger({
              desc: res.body.desc,
              templateRepo: res.body.templateRepo
            });
          }
        });
  }
});

module.exports = HomeworkIntroductionStore;