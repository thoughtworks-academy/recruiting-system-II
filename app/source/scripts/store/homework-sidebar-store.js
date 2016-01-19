'use strict';

var Reflux = require('reflux');
var HomeworkSidebarActions = require('../actions/homework-sidebar-actions');
var request = require('superagent');
var constant = require('../../../mixin/constant');


var HomeworkSidebarStore = Reflux.createStore({
  listenables: [HomeworkSidebarActions],

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
