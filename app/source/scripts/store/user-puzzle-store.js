'use strict';

var Reflux = require('reflux');
var UserPuzzleActions = require('../actions/user-puzzle-actions');
var agent = require('superagent-promise')(require('superagent'), Promise);

var UserPuzzleStore = Reflux.createStore({
  listenables: [UserPuzzleActions],

  onGetRemainTime: function () {
    agent.get('/user-puzzle/remain-time')
      .set('Content-Type', 'application/json')
      .end()
      .then((res) => {
        this.trigger({
          'remainTime': res.body.remainTime
        });
      });
  }
});

module.exports = UserPuzzleStore;