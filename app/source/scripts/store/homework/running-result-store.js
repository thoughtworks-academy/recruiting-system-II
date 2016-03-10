'use strict';

var Reflux = require('reflux');
var HomeworkActions = require('../../actions/homework/homework-actions');
var superAgent = require('superagent');

var RunningResultStore = Reflux.createStore({
  listenables: [HomeworkActions],

  onSubmitUrl: function () {
    this.trigger({isSubmited: true});
  },

  onGetRunningResult: function () {
    superAgent.get('homework/getResult')
        .set('Content-Type', 'application/json')
        .query({orderId: orderId})
        .use(errorHandler)
        .end((err,res) => {
          this.trigger({

          });
        });
  }
});

module.exports = RunningResultStore;
