'use strict';

var HomeworkController = require('../../controllers/homework-controller');
var homework = require('../../models/user-homework-quizzes');

describe('HomeworkController', function () {

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