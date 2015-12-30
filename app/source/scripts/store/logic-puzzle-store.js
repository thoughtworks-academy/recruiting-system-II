var Reflux = require('reflux');
var LogicPuzzleActions = require('../actions/logic-puzzle-actions');
var request = require('superagent');
var Promise = require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);
var _currentIndex = 0;
var _answer;


var LogicPuzzleStore = Reflux.createStore({
  listenables: [LogicPuzzleActions],

  onLoadItem: function () {

    this.updateItem()
        .then((res) => {
          this.trigger({
            "item": res.body.item,
            "userAnswer": res.body.userAnswer,
            "itemsCount": res.body.itemsCount,
            "orderId": _currentIndex
          });
        });
  },

  onSubmitAnswer: function (newOrderId) {
    _answer = document.getElementById("result").value;
    this.onSaveUserAnswer()
        .then(() => {
          _currentIndex = newOrderId;
          return this.updateItem()
        })
        .then((res) => {
          this.trigger({
            "item": res.body.item,
            "userAnswer": res.body.userAnswer,
            "itemsCount": res.body.itemsCount,
            "orderId": _currentIndex
          });
        })
  },

  onSaveUserAnswer: function () {
    return agent.post('/user-puzzle/save')
        .set('Content-Type', 'application/json')
        .send({userAnswer: _answer, orderId: _currentIndex})
        .end();
  },

  onChangeAnswer: function (val) {
    _answer = val;
    this.trigger({
      "userAnswer": _answer
    });
  },

  updateItem: function () {
    return agent.get('/logic-puzzle')
        .set('Content-Type', 'application/json')
        .query({
          orderId: _currentIndex
        })
        .end();
  },

  refreshTime: function(remainTime){
    setInterval(() => {
      remainTime --;
      
      var minutes = Math.floor(remainTime / 60);
      var seconds = remainTime % 60;

      this.trigger({
        "minutes": minutes,
        "seconds": seconds
      });
    }, 1000);
  },

  onGetRemainTime: function () {
    request.get('/user-puzzle/remain-time')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        this.refreshTime(res.body.remainTime);
      });
  }
});



module.exports = LogicPuzzleStore;
