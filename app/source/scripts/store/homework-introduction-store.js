'use strict';

var Reflux = require('reflux');
var HomeworkIntroductionActions = require('../actions/homework-actions');
var request = require('superagnet');
var constant = require('../../../mixin/constant');

var HomeworkIntroductionStore = Reflux.createStore({
  listenables: [HomeworkIntroductionActions],

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
              templateRespos: res.body.templateRespos
            });
          }
        });
  }
});

module.exports = HomeworkIntroductionStore;