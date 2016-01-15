'use strict';

var Reflux = require('reflux');
var ProgrammeActions = require('../actions/programme-actions');
var request = require('superagent');

var ProgrammeStore = Reflux.createStore({
  listenables: [ProgrammeActions],

  onLoadTopicState: function () {


  }
});

module.exports = ProgrammeStore;
