'use strict';

var userHomeworkQuizzes = require('../../models/user-homework-quizzes');

describe('UserHomeworkQuizzes', () => {
  describe('findProgressTasks', () => {

    it('should return progress tasks when receive a request', function (done) {
      spyOn(userHomeworkQuizzes, 'find').and.callFake((conditions, field, callback) => {
        var data = [{
          userId : 1,
          quizzes : [{
            id : 1,
            status : 3
          },
            {
              id : 2,
              status : 2,
              userAnswerRepo: 'www.github.com'
            },
            {
              id : 3,
              status : 0
            }]
        },{
          userId : 1,
          quizzes : [{
            id : 1,
            status : 2,
            userAnswerRepo: 'www.github.com'
          },
            {
              id : 2,
              status : 0
            },
            {
              id : 3,
              status : 0
            }]
        }];

        callback(null, data);
      });

      userHomeworkQuizzes.findProgressTasks(function (err, result) {
        expect(result).toEqual([{
          userId: 1,
          quizId: 2,
          userAnswerRepo: 'www.github.com'
        }, {
          userId: 1,
          quizId: 1,
          userAnswerRepo: 'www.github.com'
        }]);
        done();
      });
    });

    it('should return empty when databases was none', (done) => {
      spyOn(userHomeworkQuizzes, 'find').and.callFake((conditions, field, callback) => {
        var data = [];

        callback(null, data);
      });

      userHomeworkQuizzes.findProgressTasks(function (err, result) {
        expect(result).toEqual([]);
        done();
      });
    });

    it('should return err when mongoose was wrong', (done) => {
      spyOn(userHomeworkQuizzes, 'find').and.callFake((conditions, field, callback) => {
        callback(new Error());
      });

      userHomeworkQuizzes.findProgressTasks(function (err, result) {
        expect(err).toEqual(new Error());
        done();
      });
    });
  });
});