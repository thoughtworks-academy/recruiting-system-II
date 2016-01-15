'use strict';

var LogicPuzzleController = require('../../controllers/logic-puzzle-controller');
var logicPuzzle = require('../../models/logic-puzzle');
var apiRequest = require('../../services/api-request');
var time = require('../../mixin/time');
var constant = require('../../mixin/constant');

describe('LogicPuzzleController', function () {

  var controller;
  var quiz;

  beforeEach(function () {
    controller = new LogicPuzzleController();
    quiz = null;

  });

  describe('getLogicPuzzle', function () {

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

  describe('saveAnswer', function () {

    it('should save user answer successfully when it is not example', function (done) {

      spyOn(logicPuzzle, 'findOne').and.callFake(function (id, done) {
        done(null, {
          save: function (done) {
            quiz = this.quizItems;
            done(null, quiz);
          },
          quizExamples: ['1', '2', '3'],
          quizItems: [{userAnswer: '1'}, {userAnswer: '2'}, {userAnswer: '3'}, {userAnswer: '4'}, {userAnswer: '5'}]
        });
      });

      controller.saveAnswer({
        body: {
          orderId: 4, userAnswer: '1'
        },
        session: {
          user: {
            id: 1
          }
        }
      },
        {
          sendStatus: function (data) {
            expect(data).toEqual(constant.OK);
            expect(quiz[1].userAnswer).toEqual('1');
            done();
          }
        });
    });

    it('should ignore when it is example', function (done) {

      spyOn(logicPuzzle, 'findOne').and.callFake(function (id, done) {
        done(null, {
          save: function (done) {
            quiz = this.quizItems;
            done(null, quiz);
          },
          quizExamples: ['1', '2', '3'],
          quizItems: [{userAnswer: '1'}, {userAnswer: '2'}, {userAnswer: '3'}, {userAnswer: '4'}, {userAnswer: '5'}]
        });
      });

      controller.saveAnswer({
        body: {
          orderId: 0, userAnswer: '1'
        },
        session: {
          user: {
            id: 1
          }
        }
      }, {
        sendStatus: function (data) {
          expect(data).toEqual(constant.OK);
          expect(quiz).toEqual(null);
          done();
        }
      });
    });

    it('should return server error when it\'s error', function (done) {

      spyOn(logicPuzzle, 'findOne').and.callFake(function (id, done) {
        done('oooooops!', {});
      });

      controller.saveAnswer({body: {orderId: 4, userAnswer: '1'}, session: {user: {id: 1}}},
        {
          sendStatus: function (data) {
            expect(data).toEqual(constant.INTERNAL_SERVER_ERROR);
            done();
          }
        });
    });

  });

});