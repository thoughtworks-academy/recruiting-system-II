var Reflux = require('reflux');
var LogicPuzzleActions = require('../actions/logic-puzzle-actions');
var request = require('superagent');

var _currentIndex = 0;
var _answer;


var LogicPuzzleStore = Reflux.createStore({
  listenables: [LogicPuzzleActions],

  onLoadItem: function () {
    this.updateItem();
  },

  onSubmitAnswer: function (puzzle) {
    this.onSaveUserAnswer(puzzle);
    this.onNextPuzzle();
  },

  onLastPuzzle: function () {
    if (_currentIndex > 1) {
      _currentIndex -= 1;
    }
    this.updateItem();
  },

  onNextPuzzle: function () {
    if (_currentIndex < 10) {
      _currentIndex += 1;
    }
    this.updateItem();
  },

  onSaveUserAnswer: function (puzzle) {
    puzzle.userPuzzleIndex = _currentIndex;
    puzzle.puzzleId = this.item.id;
    request.post('/user-puzzle')
        .set('Content-Type', 'application/json')
        .send(puzzle)
        .end((err, res)=> {
          if (res.answer === null) {
            console.log('null');
          }
        });
  },

  onChangeAnswer: function(val) {
    _answer = val;
    console.log("action get:" + val);
  },


  updateItem: function () {
    request.get('/logic-puzzle')
        .set('Content-Type', 'application/json')
        .query({
          orderId: _currentIndex
        })
        .end((err, res) => {
          this.trigger({
            "item": res.body.item,
            "userAnswer": res.body.userAnswer,
            "itemsCount": res.body.itemsCount,
            "orderId": _currentIndex
          });

          //if (res.body.isOutRange === true) {
          //  alert('outRange');
          //  return;
          //}
          //this.item = res.body;
          //if (_currentIndex === 1) {
          //  this.item['isFirstOne'] = true;
          //  this.item['isLastOne'] = false;
          //} else if (_currentIndex === 10) {
          //  this.item['isFirstOne'] = false;
          //  this.item['isLastOne'] = true;
          //} else {
          //  this.item['isFirstOne'] = false;
          //  this.item['isLastOne'] = false;
          //}
          //this.item.index = _currentIndex;
          //this.trigger({
          //  "item": this.item
          //});
        });
  }

});

module.exports = LogicPuzzleStore;
