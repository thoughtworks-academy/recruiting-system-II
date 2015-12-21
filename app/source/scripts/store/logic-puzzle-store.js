var Reflux = require('reflux');
var LogicPuzzleActions = require('../actions/logic-puzzle-actions');
var request = require('superagent');

var _currentIndex = 1;

var LogicPuzzleStore = Reflux.createStore({
  listenables: [LogicPuzzleActions],

  onLoadItem: function() {
    this.updateItem();
  },

  onSubmitAnswer: function(){
    alert('交了也白交');
  },

  onLastPuzzle: function () {
    if(_currentIndex > 1) {
      _currentIndex -= 1;
    }
    this.updateItem();
  },

  onNextPuzzle: function () {
    if(_currentIndex < 10) {
      _currentIndex += 1;
    }
    this.updateItem();
  },

  updateItem: function() {
    var that = this;
    request.get('/logic-puzzle')
        .set('Content-Type', 'application/json')
        .query({
          orderIndex: _currentIndex
        })
        .end(function (err, res) {
          that.item = res.body;
          if(_currentIndex === 1) {
            that.item['isFirstOne'] = true;
            that.item['isLastOne'] = false;
          } else if (_currentIndex === 10){
            that.item['isFirstOne'] = false;
            that.item['isLastOne'] = true;
          } else {
            that.item['isFirstOne'] = false;
            that.item['isLastOne'] = false;
          }
          that.trigger(that.item);
        });
  }
});

module.exports = LogicPuzzleStore;
