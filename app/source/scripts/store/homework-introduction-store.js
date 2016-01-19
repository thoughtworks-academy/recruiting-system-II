'use strict';

var Reflux = require('reflux');
var HomeworkIntroductionActions = require('../actions/homework-actions');
var request = require('superagnet');
var constant = require('../../../mixin/constant');

var HomeworkIntroductionStore = Reflux.createStore({
  listenables:[HomeworkIntroductionActions],

  onGetContent: function (orderId) {
    //TODO:
  }

});

module.exports = HomeworkIntroductionStore;