'use strict';

var Reflux = require('reflux');
var LogicPuzzleActions = require('../actions/logic-puzzle-actions');
var superAgent = require('superagent');

var TimerStore = Reflux.createStore({
  listenables: [LogicPuzzleActions],

  onGetRemainTime: function () {
    superAgent.get('/timer/remain-time')
      .set('Content-Type', 'application/json')
      .end((err,res) => {
        this.trigger({
          'remainTime': res.body.remainTime
        });
      });
  },

  onTimeOver: function (){
    this.trigger({
      'showModal': true
    });
  }
});

module.exports = TimerStore;