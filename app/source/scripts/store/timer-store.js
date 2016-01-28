'use strict';

var Reflux = require('reflux');
var TimerActions = require('../actions/timer-actions');
var superAgent = require('superagent');

var TimerStore = Reflux.createStore({
  listenables: [TimerActions],

  onGetRemainTime: function () {
    superAgent.get('/timer/remain-time')
      .set('Content-Type', 'application/json')
      .end((err,res) => {
        this.trigger({
          'remainTime': res.body.remainTime
        });
      });
  }
});

module.exports = TimerStore;