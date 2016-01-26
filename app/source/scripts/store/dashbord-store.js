'use strict';

var Reflux = require('reflux');
var DashbordActions = require('../actions/dashbord-actions');
var request = require('superagent');

var DashbordStore = Reflux.createStore({
  listenables: DashbordActions,

  onGetStatus: function () {
    request.get('/dashboard')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          this.trigger({
            puzzleEnabled: res.body.isPaperCommited ? false : true,
            homeworkEnabled: res.body.isPaperCommited
          });
        });
  },

  onShowPrompt: function (puzzleEnabled, homeworkEnabled, event) {
    var iconName = event.target.parentNode.getAttribute('name');
    if (iconName === 'logic' && puzzleEnabled === false) {
      this.trigger({
        isTip: true,
        tipContent: '您的逻辑题已经完成'
      });
    }

    if (iconName === 'homework' && homeworkEnabled === false) {
      this.trigger({
        isTip: true,
        tipContent: puzzleEnabled === true ? '请先完成逻辑题' : '您的编程题已完成'
      });
    }

  },

  onHidePrompt: function () {
    this.trigger({
      isTip: false
    });
  }

});

module.exports = DashbordStore;
