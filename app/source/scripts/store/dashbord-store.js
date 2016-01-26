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
        })


  }

});

module.exports = DashbordStore;
