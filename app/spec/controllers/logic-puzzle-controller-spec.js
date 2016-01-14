'use strict';

var LogicPuzzleController = require('../../controllers/logic-puzzle-controller');
var logicPuzzle = require('../../models/logic-puzzle');
var apiRequest = require('../../services/api-request');
var time = require('../../mixin/time');

describe('LogicPuzzleController', function () {

  var controller;

  beforeEach(function () {
    controller = new LogicPuzzleController();

  });

  it('should_return_quiz_item_by_order_index', function (done) {

    spyOn(logicPuzzle, 'getLogicPuzzle').and.callFake(function (orderId, userId) {

      return {
        then: function (fn) {
          setTimeout(function () {
            fn({data: 123});
          }, time.SECONDS);
        }
      };
    });

    controller.getLogicPuzzle({
      query: {orderId: 1},
      session: {
        user: {id: 3}
      }
    }, {
      send: function (data) {
        expect(data).toEqual({
          data: 123
        });
        done();
      }
    });

  });

});