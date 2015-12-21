var Reflux = require('reflux');
var LogicPuzzleActions = require('../actions/logic-puzzle-actions');
var request = require('superagent');

var LogicPuzzleStore = Reflux.createStore({
  listenables: [LogicPuzzleActions],

  onLoadItem: function() {
    this.updateItem();
  },

  onSubmitAnswer: function(){
    alert('交了也白交');
  },

  updateItem: function() {
    var that = this;
    request.get('/logic-puzzle')
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          that.item = res.body;
          that.trigger(res.body);
        });
  }
});

module.exports = LogicPuzzleStore;
