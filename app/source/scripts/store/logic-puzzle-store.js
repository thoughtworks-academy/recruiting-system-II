'use strict';

var Reflux = require('reflux');
var LogicPuzzleActions = require('../actions/logic-puzzle-actions');
var superAgent = require('superagent');
var agent = require('superagent-promise')(superAgent, Promise);
var page = require('page');
var _currentIndex = 0;
var _answer;
var constant = require('../../../mixin/constant');


var LogicPuzzleStore = Reflux.createStore({
  listenables: [LogicPuzzleActions],

  onLoadItem: function () {

    this.updateItem()
        .then((res) => {
          _answer = res.body.userAnswer;
          this.trigger({
            'item': res.body.item,
            'userAnswer': res.body.userAnswer,
            'itemsCount': res.body.itemsCount,
            'orderId': _currentIndex,
            'isExample': res.body.isExample
          });
        });
  },

  onSubmitAnswer: function (newOrderId) {
    this.onSaveUserAnswer()
        .then(() => {
          _currentIndex = newOrderId;
          return this.updateItem();
        })
        .then((res) => {
          _answer = res.body.userAnswer;
          this.trigger({
            'item': res.body.item,
            'userAnswer': res.body.userAnswer,
            'itemsCount': res.body.itemsCount,
            'orderId': _currentIndex,
            'isExample': res.body.isExample
          });
        });
  },

  onSaveUserAnswer: function () {
    return agent.post('/logic-puzzle/save')
        .set('Content-Type', 'application/json')
        .send({userAnswer: _answer, orderId: _currentIndex})
        .end();
  },

  onChangeAnswer: function (val) {
    _answer = val;
    this.trigger({
      'userAnswer': _answer
    });
  },

  onSubmitPaper: function () {
    this.onSaveUserAnswer()
        .then(function (res) {
          superAgent.post('/logic-puzzle')
              .set('Content_Type', 'application/json')
              .end(function (err, res) {
                if(res.statusCode === constant.httpCode.OK){
                  page('dashboard.html');
                }
              });
        });
  },

  updateItem: function () {
    return agent.get('/logic-puzzle')
        .set('Content-Type', 'application/json')
        .query({
          orderId: _currentIndex
        })
        .end();
  }

});


module.exports = LogicPuzzleStore;
