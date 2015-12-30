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

  onSubmitAnswer: function (answer) {
    this.onSaveUserAnswer(answer);
    this.onNextPuzzle();
  },

  onLastPuzzle: function () {
    if (_currentIndex > 0) {
      _currentIndex -= 1;
    }
    this.updateItem();
  },

  onNextPuzzle: function (itemsCount) {
    if (_currentIndex < itemsCount - 1) {
      _currentIndex += 1;
    }
    this.updateItem();
  },

  onSaveUserAnswer: function (answer) {

    request.post('/user-puzzle/save')
        .set('Content-Type', 'application/json')
        .send({userAnswer: answer, orderId: _currentIndex})
        .end();
  },

  onChangeAnswer: function (val) {
    _answer = val;
    this.trigger({
      "userAnswer": _answer
    });
    console.log("action get:" + val);
  },


  updateItem: function () {
    request.get('/logic-puzzle')
        .set('Content-Type', 'application/json')
        .query({
          orderId: _currentIndex
        })
        .end((err, res) => {
          _currentIndex === 0 ?
              res.body.item['last'] = true :
              res.body.item['last'] = false;
          _currentIndex === res.body.itemsCount - 1 ?
              res.body.item['next'] = true :
              res.body.item['next'] = false;
          this.trigger({
            "item": res.body.item,
            "userAnswer": res.body.userAnswer,
            "itemsCount": res.body.itemsCount,
            "orderId": _currentIndex
          });

        });
  }

});

module.exports = LogicPuzzleStore;
