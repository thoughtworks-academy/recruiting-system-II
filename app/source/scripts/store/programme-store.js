'use strict';

var Reflux = require('reflux');
var ProgrammeActions = require('../actions/programme-actions');
var request = require('superagent');
var constant = require('../../../mixin/constant');


var ProgrammeStore = Reflux.createStore({
  listenables: [ProgrammeActions],

  onLoadTopicStatus: function () {
    request.get('/programme/get-list')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          if (err || res.status !== constant.httpCode.OK) {
            return;
          }
          this.trigger(res.body);
        });
  }
});

module.exports = ProgrammeStore;
