/*eslint no-magic-numbers: 0 */
'use strict';

var UserController = require('../../controllers/user-controller');
var constant = require('../../mixin/constant');
var apiRequest = require('../../services/api-request');
var userHomeworkQuizzes = require('../../models/user-homework-quizzes');


describe('UserController', function () {
  describe('answer', ()=> {
    var controller;

    beforeEach(function () {
      controller = new UserController();
    });

    it('should return all user answers', function (done) {

      spyOn(apiRequest, 'get').and.callFake(function (url, callback) {
        callback(null, {
          body: {
            correctNumber: 6,
            itemNumber: 10,
            startTime: 75,
            endTime: 98
          }
        });
      });

      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (id, done) {

        var data = {
          quizzes: [
            {
              startTime: 10,
              status: constant.homeworkQuizzesStatus.SUCCESS,
              homeworkSubmitPostHistory: [{
                status: constant.homeworkQuizzesStatus.ERROR,
                timestamp: 11
              }, {
                status: constant.homeworkQuizzesStatus.SUCCESS,
                timestamp: 12
              }]

            }, {
              startTime: 13,
              status: constant.homeworkQuizzesStatus.SUCCESS,
              homeworkSubmitPostHistory: [{
                status: constant.homeworkQuizzesStatus.ERROR,
                timestamp: 14
              }, {
                status: constant.homeworkQuizzesStatus.SUCCESS,
                timestamp: 15
              }]
            }, {
              startTime: 16,
              status: constant.homeworkQuizzesStatus.ACTIVE
            }
          ]
        };

        done(null, data);
      });

      var userId = 1;

      var result = {
        userDetailUrl: 'users/' + userId + '/detail',
        logicPuzzle: {
          correctNumber: 6,
          itemNumber: 10,
          startTime: 75,
          endTime: 98
        },
        homework: {
          correctNumber: 2,
          quizzes: [
            {startTime: 10, commitTimes: {commitTime: [11, 12]}},
            {startTime: 13, commitTimes: {commitTime: [14, 15]}},
            {startTime: 16, commitTimes: {commitTime: []}}]
        }
      };

      controller.answer({
        query: {
          userId: 1
        }
      }, {
        send: function (data) {
          expect(data).toEqual(result);
          done();
        }
      });
      
    });
  });
});