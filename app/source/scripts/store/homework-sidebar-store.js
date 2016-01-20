'use strict';

var Reflux = require('reflux');
var HomeworkActions = require('../actions/homework-actions');
var superAgent = require('superagent');
var constant = require('../../../mixin/constant');


var HomeworkSidebarStore = Reflux.createStore({
  listenables: [HomeworkActions],

  onLoadHomeworkList: function () {
    superAgent.get('/homework/get-list')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          if (err || res.status !== constant.httpCode.OK) {
            return;
          }
          this.trigger({homeworkStatusList:res.body.homeworkQuizzes});
        });
  }
});

module.exports = HomeworkSidebarStore;
