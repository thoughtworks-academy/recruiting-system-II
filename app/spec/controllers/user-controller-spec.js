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
          body: [{
            correctNumber: 6,
            itemNumber: 10,
            startTime: 75,
            endTime: 98
          }]
        });
      });

      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (id, done) {

        var data = {
          quizzes: [
            {
              startTime: 10,
              status: constant.homeworkQuizzesStatus.SUCCESS,
              uri: 'homework/1',
              homeworkSubmitPostHistory: [{
                status: constant.homeworkQuizzesStatus.ERROR,
                commitTime: 1000,
                branch: 'master',
                resultURL: 'job/task/1',
                homeworkURL: 'https:www.github.com/1'
              }, {
                status: constant.homeworkQuizzesStatus.SUCCESS,
                commitTime: 1001,
                branch: 'master',
                resultURL: 'job/task/2',
                homeworkURL: 'https:www.github.com/2'
              }]
            }, {
              startTime: 13,
              status: constant.homeworkQuizzesStatus.SUCCESS,
              uri: 'homework/2',
              homeworkSubmitPostHistory: [{
                status: constant.homeworkQuizzesStatus.ERROR,
                commitTime: 2000,
                branch: 'master',
                resultURL: 'job/task/3',
                homeworkURL: 'https:www.github.com/3'
              }, {
                status: constant.homeworkQuizzesStatus.SUCCESS,
                commitTime: 2001,
                branch: 'master',
                resultURL: 'job/task/4',
                homeworkURL: 'https:www.github.com/4'
              }]
            }, {
              startTime: 16,
              uri: 'homework/3',
              status: constant.homeworkQuizzesStatus.ACTIVE
            }
          ]
        };

        done(null, data);
      });

      var userId = 1;

      var result = {
        userDetailURL: 'users/' + userId + '/detail',
        logicPuzzle: {
          correctNumber: 6,
          itemNumber: 10,
          startTime: 75,
          endTime: 98,
          accuracy: '60.00%'
        },
        homework: {
          quizzes: [
            {
              startTime: 10,
              homeworkDesc: 'homework/1',
              elapsedTime: 991,
              commitHistory: [{
                githubURL: 'https:www.github.com/1',
                branch: 'master',
                commitTime: 1000,
                resultURL: 'job/task/1'
              }, {
                githubURL: 'https:www.github.com/2',
                branch: 'master',
                commitTime: 1001,
                resultURL: 'job/task/2'
              }]
            }, {
              startTime: 13,
              homeworkDesc: 'homework/2',
              elapsedTime: 1988,
              commitHistory: [{
                githubURL: 'https:www.github.com/3',
                branch: 'master',
                commitTime: 2000,
                resultURL: 'job/task/3'
              }, {
                githubURL: 'https:www.github.com/4',
                branch: 'master',
                commitTime: 2001,
                resultURL: 'job/task/4'
              }]
            }, {
              startTime: 16,
              homeworkDesc: 'homework/3',
              elapsedTime: 0,
              commitHistory: []
            }],
          elapsedTime: 123,
          completion: '66.67%',
          correctNumber: 2
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