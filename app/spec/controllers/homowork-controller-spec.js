'use strict';

var HomeworkController = require('../../controllers/homework-controller');
var userHomeworkQuizzes = require('../../models/user-homework-quizzes');
var homeworkQuizzes = require('../../models/homework-quizzes');

describe('HomeworkController', function () {
  describe('getList', () => {
    var controller;

    beforeEach(function () {
      controller = new HomeworkController();
    });

    it('should return homeworkQuizzes when receive a request', function (done) {

      spyOn(userHomeworkQuizzes, 'unlockNext').and.callFake(function (id, done) {
        done(null, null);
      });

      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (id, done) {

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

    it('should active the first homeworkQuiz when all homeworkQuizzes is locked ', function (done) {

      spyOn(userHomeworkQuizzes, 'unlockNext').and.callFake(function (id, done) {
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
          ]
        };
        done(null, data);
      });

      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (id, done) {

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
  });

  describe('getHomworkQuiz', () => {
    var controller;

    beforeEach(function () {
      controller = new HomeworkController();

      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (id, done) {
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
            }, {
              id: 3,
              locked: true,
              status: 0
            }
          ]
        };

        done(null, data);
      });

      spyOn(userHomeworkQuizzes, 'unlockNext').and.callFake(function (id, done) {
        done(null, null);
      });

      spyOn(homeworkQuizzes, 'findOne').and.callFake(function (id, callback) {
        var data = {
          id: 1,
          desc: '这是一道简单的题',
          templateRepo: 'www.github.com'
        };

        callback(null, data);
      });
    });

    it('should return quiz and statusCode: 200 when receive a request', (done) => {

      controller.getQuiz({
        session: {user: {id: 1}},
        query: {orderId: 1}
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: 200,
            quiz: {
              desc: '这是一道简单的题',
              templateRepo: 'www.github.com'
            }
          });
          done();
        }
      });
    });

    it('should return statusCode: 403 when request quiz is locked', (done) => {

      controller.getQuiz({
        session: {user: {id: 1}},
        query: {orderId: 3}
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: 403
          });
          done();
        }
      });
    });
  });

  describe('saveGithubUrl', ()=> {

    var controller;
    beforeEach(()=> {
      controller = new HomeworkController();
    });

    it('it should return status 403 when which number in quiz is orderId\'status is locked ', (done)=> {

      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (id, callback) {
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
            }, {
              id: 3,
              locked: true,
              status: 0
            }
          ]
        };

        callback(null, data);
      });

      controller.saveGithubUrl({
        session: {user: {id: 1}},
        query: {orderId: 1},
        userAnswerRepo: 'www.github.com'
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: 403
          });
          done();
        }
      });
    });

    it('it should return status 200 when save a userAnswerURL is success ', (done)=> {

      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (id, callback) {
        var data = {
          userId: 1,
          quizzes: [
            {
              id: 1,
              locked: false,
              status: 1,
              userAnswerRepo: '1'
            }, {
              id: 2,
              locked: true,
              status: 0,
              userAnswerRepo: '2'

            }, {
              id: 3,
              locked: true,
              status: 0,
              userAnswerRepo: '3'
            }
          ]
        };

        callback(null, data);
      });

      controller.saveGithubUrl({
        session: {user: {id: 1}},
        query: {orderId: 1},
        body: {userAnswerRepo: 'www.github.com'}
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: 200
          });
          done();
        }
      });
    });

  });
});