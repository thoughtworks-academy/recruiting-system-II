'use strict';

var Reflux = require('reflux');
var HomeworkActions = require('../actions/homework-actions');
var request = require('superagent');
var constant = require('../../../mixin/constant');


var HomeworkSidebarStore = Reflux.createStore({
  listenables: [HomeworkActions],

  onLoadHomeworkStatus: function () {
    request.get('/homework/get-list')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          if (err || res.status !== constant.httpCode.OK) {
            return;
          }
          this.trigger(res.body);
        });
  }
});

module.exports = HomeworkSidebarStore;
