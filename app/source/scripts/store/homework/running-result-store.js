'use strict';

var Reflux = require('reflux');
var HomeworkActions = require('../../actions/homework/homework-actions');
var superAgent = require('superagent');
var errorHandler = require('../../../../tools/error-handler');

var RunningResultStore = Reflux.createStore({
  listenables: [HomeworkActions],

  onSubmitUrl: function () {
    this.trigger({isSubmited: true});
  },

  onGetRunningResult: function (orderId) {
    superAgent.get('homework/getResult')
        .set('Content-Type', 'application/json')
        .query({orderId: orderId})
        .use(errorHandler)
        .end((err,res) => {
          this.trigger({
            isSubmited: res.body.isSubmited,
            resultText: res.body.resultText
          });
        });
  }
});

module.exports = RunningResultStore;
