'use strict';

var HomeworkController = require('../../controllers/homework-controller');
var userHomeworkQuizzes = require('../../models/user-homework-quizzes');
var homeworkQuizzes = require('../../models/homework-quizzes');
var constant = require('../../mixin/constant');

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

  describe('getProgressTasks', () => {
    var controller;

    beforeEach(() => {
      controller = new HomeworkController();

      spyOn(homeworkQuizzes, 'find').and.callFake(function (id, callback) {
        var data = [{
          id: 1,
          desc: '这是一道简单的题',
          templateRepo: 'www.github.com',
          evaluateScript: 'www.baidu.com',
          evaluateRepo: 'evaluateRepository'
        },{
          id: 2,
          desc: '这是一道简单的题',
          templateRepo: 'www.github.com',
          evaluateScript: 'www.baidu.com',
          evaluateRepo: 'evaluateRepository'
        },{
          id: 3,
          desc: '这是一道简单的题',
          templateRepo: 'www.github.com',
          evaluateScript: 'www.baidu.com',
          evaluateRepo: 'evaluateRepository'
        }];

        callback(null, data);
      });
    });

    it('should return progress tasks and statusCode: 200 when receive a request', (done) => {

      spyOn(userHomeworkQuizzes, 'findProgressTasks').and.callFake(function (done) {
        var data = [
          {userId: 1, quizId: 1, userAnswerRepo: 'www.github.com'},
          {userId: 2, quizId: 1, userAnswerRepo: 'www.github.com'}
        ];

        done(null, data);
      });

      controller.getProgressTasks({}, {
        send: function (data) {
          expect(data).toEqual({
            status: 200,
            userAnswers: [{
              userId: 1,
              quizId: 1,
              userAnswerRepo: 'www.github.com',
              evaluateScript: 'www.baidu.com',
              evaluateRepo: 'evaluateRepository'
            }, {
              userId: 2,
              quizId: 1,
              userAnswerRepo: 'www.github.com',
              evaluateScript: 'www.baidu.com',
              evaluateRepo: 'evaluateRepository'
            }]
          });
          done();
        }
      });
    });

    it('should return statusCode: 404 when no user progress need test', (done) => {

      spyOn(userHomeworkQuizzes, 'findProgressTasks').and.callFake(function (done) {
        var data = [];

        done(null, data);
      });

      controller.getProgressTasks({}, {
        send: function (data) {
          expect(data).toEqual({
            status: constant.httpCode.NOT_FOUND,
            userAnswers: []
          });
          done();
        }
      });
    });

    it('should return statusCode: 500 when mongoose was wrong', (done) => {

      spyOn(userHomeworkQuizzes, 'findProgressTasks').and.callFake(function (done) {

        done(new Error('err'));
      });

      controller.getProgressTasks({}, {
        send: function (data) {
          expect(data).toEqual({
            status: constant.httpCode.INTERNAL_SERVER_ERROR,
            message: 'err'
          });
          done();
        },
        status: function(code){
          expect(code).toEqual(constant.httpCode.INTERNAL_SERVER_ERROR);
        }
      });
    });
  });
  
  describe('saveGithubUrl', ()=> {

    var controller;
    var lockedData;
    var activeData;
    var progressData;
    var successData;
    var errorData;


    beforeEach(()=> {
      controller = new HomeworkController();
      lockedData = {
        userId: 1,
        quizzes: [
          {
            id: 1,
            status: 0,
            userAnswerRepo: 'www.github.com'
          }
        ]
      };

      activeData = {
        userId: 1,
        quizzes: [
          {
            id: 1,
            status: 1,
            userAnswerRepo: 'www.github.com'
          }
        ]
      };

      progressData = {
        userId: 1,
        quizzes: [
          {
            id: 1,
            status: 2,
            userAnswerRepo: 'www.github.com'
          }
        ]
      };

      successData = {
        userId: 1,
        quizzes: [
          {
            id: 1,
            status: 3,
            userAnswerRepo: 'www.github.com'
          }
        ]
      };

      errorData = {
        userId: 1,
        quizzes: [
          {
            id: 1,
            status: 4,
            userAnswerRepo: 'www.github.com'
          }
        ]
      };

    });


    it('it should return false when the specific homework is locked ', (done)=> {

      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (userId, callback) {
        callback(null, lockedData);
      });

      userHomeworkQuizzes.checkData(1, 1, function (err, result) {
        expect(result).toEqual({
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: 0,
                userAnswerRepo: 'www.github.com'
              }]
          },
          isValidate: false
        });
        done();
      });

    });


    it('it should return true when the specific homework is active ', (done)=> {
      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (userId, callback) {
        callback(null, activeData);
      });

      userHomeworkQuizzes.checkData(1, 1, function (err, result) {
        expect(result).toEqual({
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: 1,
                userAnswerRepo: 'www.github.com'
              }]
          },
          isValidate: true
        });
        done();
      });
    });

    it('it should return  false when the specific homework is progress', (done)=> {
      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (userId, callback) {
        callback(null, progressData);
      });

      userHomeworkQuizzes.checkData(1, 1, function (err, result) {
        expect(result).toEqual({
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: 2,
                userAnswerRepo: 'www.github.com'
              }]
          },
          isValidate: false
        });
        done();
      });
    });

    it('it should return false when the specific homework is is success', (done)=> {

      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (userId, callback) {
        callback(null, successData);
      });

      userHomeworkQuizzes.checkData(1, 1, function (err, result) {
        expect(result).toEqual({
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: 3,
                userAnswerRepo: 'www.github.com'
              }]
          },
          isValidate: false
        });
        done();
      });

    });

    it('it should return true when the specific homework is error', (done)=> {

      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (userId, callback) {
        callback(null, errorData);
      });

      userHomeworkQuizzes.checkData(1, 1, function (err, result) {
        expect(result).toEqual({
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: 4,
                userAnswerRepo: 'www.github.com'
              }]
          },
          isValidate: true
        });
        done();
      });

    });

    it('it should return status 200 when change status to progress and  save userAnswerUrl success', (done)=> {

      spyOn(userHomeworkQuizzes, 'checkData').and.callFake(function (userId, orderId, callback) {

        var result = {
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: 1,
                userAnswerRepo: 'www.repo.com'
              }],
            save: (done) => {
              done(null, true);
            }
          },
          isValidate: true
        };

        callback(null, result);
      });

      controller.saveGithubUrl({
        session: {user: {id: 1}},
        body: {
          userAnswerRepo: 'www.repo.com',
          orderId: 1
        }
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: 200
          });
          done();
        }
      });
    });

    it('it should return status 403 when orderId is out of range ', (done)=> {
      spyOn(userHomeworkQuizzes, 'checkData').and.callFake(function (userId, orderId, callback) {

        var result = {
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: 1,
                userAnswerRepo: 'www.repo.com'
              }]
          },
          isValidate: false,
          save: (done) => {
            done(null, true);
          }
        };
        callback(null, result);
      });

      controller.saveGithubUrl({
        session: {user: {id: 1}},
        body: {
          userAnswerRepo: 'www.repo.com',
          orderId: 121
        }
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: 403
          });
          done();
        }
      });

    });

    it('it should return status 403  when do not save userAnswerUrl', (done)=> {
      spyOn(userHomeworkQuizzes, 'checkData').and.callFake(function (userId, orderId, callback) {

        var data = {
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: 1,
                userAnswerRepo: 'www.repo.com'
              }]
          },
          isValidate: false,
          save: (done) => {
            done(null, true);
          }
        };
        callback(null, data);
      });

      controller.saveGithubUrl({
        session: {user: {id: 1}},
        body: {
          userAnswerRepo: 'www.repo.com',
          orderId: 2
        }
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

});