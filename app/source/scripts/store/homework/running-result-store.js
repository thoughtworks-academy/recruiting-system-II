'use strict';

var Reflux = require('reflux');
var HomeworkActions = require('../../actions/homework/homework-actions');

var RunningResultStore = Reflux.createStore({
  listenables: [HomeworkActions],

  onSubmitUrl: function () {
    this.trigger({isSubmited: true});
  }
});

module.exports = RunningResultStore;
