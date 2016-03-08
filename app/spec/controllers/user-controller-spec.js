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
        })
      });


      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (id, done) {

        var data = {
          quizzes: [
            {
              startTime: 876,
              status: constant.homeworkQuizzesStatus.SUCCESS,
              homeworkSubmitPostHistory: [{
                status: constant.homeworkQuizzesStatus.ERROR,
                timestamp: 865
              }, {
                status: constant.homeworkQuizzesStatus.SUCCESS,
                timestamp: 865
              }]

            }, {
              startTime: 876,
              status: constant.homeworkQuizzesStatus.SUCCESS,
              homeworkSubmitPostHistory: [{
                status: constant.homeworkQuizzesStatus.ERROR,
                timestamp: 865
              }, {
                status: constant.homeworkQuizzesStatus.SUCCESS,
                timestamp: 865
              }]
            }, {
              startTime: 876,
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
            {startTime: 876, commitTimes: {commitTime: [865, 865]}},
            {startTime: 876, commitTimes: {commitTime: [865, 865]}},
            {startTime: 876, commitTimes: {commitTime: []}}]
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