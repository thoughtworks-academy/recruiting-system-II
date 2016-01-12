'use strict';

var Reflux = require('reflux');
var TimerActions = require('../actions/timer-action');
var agent = require('superagent-promise')(require('superagent'), Promise);

var TimerStore = Reflux.createStore({
  listenables: [TimerActions],

  onGetRemainTime: function () {
    agent.get('/timer/remain-time')
      .set('Content-Type', 'application/json')
      .end()
      .then((res) => {
        this.trigger({
          'remainTime': res.body.remainTime
        });
      });
  }
});

module.exports = TimerStore;