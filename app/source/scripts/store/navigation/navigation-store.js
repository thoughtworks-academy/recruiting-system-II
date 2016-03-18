'use strict';

var Reflux = require('reflux');
var NavigationActions = require('../../actions/navigation/navigation-actions');
var request = require('superagent');
var errorHandler = require('../../../../tools/error-handler');


var NavigationStore = Reflux.createStore({
  listenables: [NavigationActions],

  onLoadAccount:function() {
    request.get('/navigation')
        .set('Content-Type', 'application/json')
        .use(errorHandler)
        .end((err, res) => {
          console.log('11');
        });
  }
});

module.exports = NavigationStore;
