'use strict';

var HomeworkController = require('../../controllers/homework-controller');
var homework = require('../../models/user-homework-quizzes');
var homeworkQuizzes = require('../../models/homework-quizzes');

describe('HomeworkController', function () {
  describe ('getList', () => {
    var controller;

    beforeEach(function () {
      controller = new HomeworkController();
    });

    it('should return homeworkQuizzes when receive a request', function (done) {

      spyOn(homework, 'findOne').and.callFake(function (id, done) {

        var data = {
          userId: 1,
          quizzes: [
            {
              id: 1,
              locked: false,
              status: 1

            }, {
              id: 2,
              locked: true,
              status: 0
            }
          ],
          save: (done) => {
            done(null, null);
          }
        };

        done(null, data);
      });

      controller.getList({
        session: {
          user: {id: 1}
        }
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: 200,
            homeworkQuizzes: [
              {
                status: 1
              },
              {
                status: 0
              }
            ]
          });
          done();
        }
      });

    });


    it('should active the first homeworkQuiz when receive a request httpCode is 404', function (done) {

      spyOn(homework, 'findOne').and.callFake(function (id, done) {

        var data = {
          userId: 1,
          quizzes: [
            {
              id: 1,
              locked: true,
              status: 0

            }, {
              id: 2,
              locked: true,
              status: 0
            }
          ],
          save: (done) => {
            done(null, null);
          }
        };

        done(null, data);
      });

      controller.getList({
        session: {
          user: {id: 1}
        }
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: 200,
            homeworkQuizzes: [
              {
                status: 1
              },
              {
                status: 0
              }
            ]
          });
          done();
        }
      });
    });
  });

  describe('getHomworkQuiz', () => {
    var controller;

    beforeEach(function () {
      controller = new HomeworkController();

      spyOn(homework, 'findOne').and.callFake(function (id, done) {
        var data = {
          userId: 1,
          quizzes: [
            {
              id: 1,
              locked: true,
              status: 0
            },{
              id: 2,
              locked: true,
              status: 0
            },{
              id: 3,
              locked: true,
              status: 0
            }
          ]
        };

        done(null, data);
      });

      spyOn(homeworkQuizzes, 'findOne').and.callFake(function (id, done) {
        var data = {
          id: 1,
          desc: '这是一道简单的题',
          templateRepos: 'www.github.com'
        };

        done(null, data);
      });
    });

    it('should return quiz and statusCode: 200 when receive a request', (done) => {

      controller.getHomeworkQuiz({
        session: {user: {id: 1}},
        query: {orderId: 1}
      },{
        send: function (data) {
          expect(data).toEqual({
            status: 200,
            quiz: {
              desc: '这是一道简单的题',
              templateRepos: 'www.github.com'
            }
          });
          done();
        }
      });
    });

    it('should return statusCode: 403 when request quiz is locked', (done) => {

      controller.getHomeworkQuiz({
        session: {user: {id: 1}},
        query: {orderId: 3}
      },{
        send: function (data) {
          expect(data).toEqual({
            status: 403
          });
          done();
        }
      });
    });
  });
});