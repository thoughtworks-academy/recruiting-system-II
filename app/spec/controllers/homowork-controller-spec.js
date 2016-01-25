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
              status: constant.homeworkQuizzesStatus.ACTIVE

            }, {
              id: 2,
              status: constant.homeworkQuizzesStatus.LOCKED
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
            status: constant.httpCode.OK,
            homeworkQuizzes: [
              {
                status: constant.homeworkQuizzesStatus.ACTIVE
              },
              {
                status: constant.homeworkQuizzesStatus.LOCKED
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
              status: constant.homeworkQuizzesStatus.ACTIVE

            }, {
              id: 2,
              status: constant.homeworkQuizzesStatus.LOCKED
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
              status: constant.homeworkQuizzesStatus.ACTIVE

            }, {
              id: 2,
              status: constant.homeworkQuizzesStatus.LOCKED
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
            status: constant.httpCode.OK,
            homeworkQuizzes: [
              {
                status: constant.homeworkQuizzesStatus.ACTIVE
              },
              {
                status: constant.homeworkQuizzesStatus.LOCKED
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
              status: constant.homeworkQuizzesStatus.ACTIVE
            }, {
              id: 2,
              status: constant.homeworkQuizzesStatus.LOCKED
            }, {
              id: 3,
              status: constant.homeworkQuizzesStatus.LOCKED
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
            status: constant.httpCode.OK,
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
            status: constant.httpCode.FORBIDDEN
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
        }, {
          id: 2,
          desc: '这是一道简单的题',
          templateRepo: 'www.github.com',
          evaluateScript: 'www.baidu.com',
          evaluateRepo: 'evaluateRepository'
        }, {
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
            status: constant.httpCode.OK,
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
        status: function (code) {
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
            status: constant.homeworkQuizzesStatus.LOCKED,
            userAnswerRepo: 'www.github.com'
          }
        ]
      };

      activeData = {
        userId: 1,
        quizzes: [
          {
            id: 1,
            status: constant.homeworkQuizzesStatus.ACTIVE,
            userAnswerRepo: 'www.github.com'
          }
        ]
      };

      progressData = {
        userId: 1,
        quizzes: [
          {
            id: 1,
            status: constant.homeworkQuizzesStatus.PROGRESS,
            userAnswerRepo: 'www.github.com'
          }
        ]
      };

      successData = {
        userId: 1,
        quizzes: [
          {
            id: 1,
            status: constant.homeworkQuizzesStatus.SUCCESS,
            userAnswerRepo: 'www.github.com'
          }
        ]
      };

      errorData = {
        userId: 1,
        quizzes: [
          {
            id: 1,
            status: constant.homeworkQuizzesStatus.ERROR,
            userAnswerRepo: 'www.github.com'
          }
        ]
      };

    });


    it('it should return false when the specific homework is locked ', (done)=> {

      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (userId, callback) {
        callback(null, lockedData);
      });

      userHomeworkQuizzes.checkDataForSubmit(1, 1, function (err, result) {
        expect(result).toEqual({
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: constant.homeworkQuizzesStatus.LOCKED,
                userAnswerRepo: 'www.github.com'
              }]
          },
          status: constant.httpCode.FORBIDDEN,
          isValidate: false
        });
        done();
      });

    });


    it('it should return true when the specific homework is active ', (done)=> {
      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (userId, callback) {
        callback(null, activeData);
      });

      userHomeworkQuizzes.checkDataForSubmit(1, 1, function (err, result) {
        expect(result).toEqual({
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: constant.homeworkQuizzesStatus.ACTIVE,
                userAnswerRepo: 'www.github.com'
              }]
          },
          status: constant.httpCode.OK,
          isValidate: true
        });
        done();
      });
    });

    it('it should return  false when the specific homework is progress', (done)=> {
      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (userId, callback) {
        callback(null, progressData);
      });

      userHomeworkQuizzes.checkDataForSubmit(1, 1, function (err, result) {
        expect(result).toEqual({
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: constant.homeworkQuizzesStatus.PROGRESS,
                userAnswerRepo: 'www.github.com'
              }]
          },
          status: constant.httpCode.FORBIDDEN,
          isValidate: false
        });
        done();
      });
    });

    it('it should return false when the specific homework is is success', (done)=> {

      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (userId, callback) {
        callback(null, successData);
      });

      userHomeworkQuizzes.checkDataForSubmit(1, 1, function (err, result) {
        expect(result).toEqual({
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: constant.homeworkQuizzesStatus.SUCCESS,
                userAnswerRepo: 'www.github.com'
              }]
          },
          status: constant.httpCode.FORBIDDEN,
          isValidate: false
        });
        done();
      });

    });

    it('it should return true when the specific homework is error', (done)=> {

      spyOn(userHomeworkQuizzes, 'findOne').and.callFake(function (userId, callback) {
        callback(null, errorData);
      });

      userHomeworkQuizzes.checkDataForSubmit(1, 1, function (err, result) {
        expect(result).toEqual({
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: constant.homeworkQuizzesStatus.ERROR,
                userAnswerRepo: 'www.github.com'
              }]
          },
          status: constant.httpCode.OK,
          isValidate: true
        });
        done();
      });

    });

    it('it should return status 200 when change status to progress and  save userAnswerUrl success', (done)=> {

      spyOn(userHomeworkQuizzes, 'checkDataForSubmit').and.callFake(function (userId, orderId, callback) {

        var result = {
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: constant.homeworkQuizzesStatus.ACTIVE,
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
          orderId: 1,
          branch: 'dev'
        }
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: constant.httpCode.OK
          });
          done();
        }
      });
    });

    it('it should return status 403 when orderId is out of range ', (done)=> {
      spyOn(userHomeworkQuizzes, 'checkDataForSubmit').and.callFake(function (userId, orderId, callback) {

        var result = {
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: constant.homeworkQuizzesStatus.ACTIVE,
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
            status: constant.httpCode.FORBIDDEN
          });
          done();
        }
      });

    });

    it('it should return status 403  when do not save userAnswerUrl', (done)=> {
      spyOn(userHomeworkQuizzes, 'checkDataForSubmit').and.callFake(function (userId, orderId, callback) {

        var data = {
          data: {
            userId: 1,
            quizzes: [
              {
                id: 1,
                status: constant.homeworkQuizzesStatus.ACTIVE,
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
            status: constant.httpCode.FORBIDDEN
          });
          done();
        }
      });
    });
  });

  describe('updateResult', ()=> {
    var controller;

    beforeEach(()=> {
      controller = new HomeworkController();
    });

    it('should return 200 when save the result success', (done)=> {

      spyOn(userHomeworkQuizzes, 'checkDataForUpdate').and.callFake(function (userId, orderId, callback) {
        var result = {
          data: {
            userId: 2,
            quizzes: [
              {
                id: 1,
                status: constant.homeworkQuizzesStatus.ACTIVE,
                userAnswerRepo: 'www.repo.com'
              }],
            save: (done) => {
              done(null, true);
            }
          },
          isValidate: true,
          status: constant.httpCode.OK

        };
        callback(null, result);
      });

      controller.updateResult({
        body: {
          userId: 2,
          orderId: 1,
          status: 5,
          resultPath: 'error'
        }
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: constant.httpCode.OK
          });
          done();
        }
      });

    });

    it('should return 404 when the userId is not existed', (done)=> {

      spyOn(userHomeworkQuizzes, 'checkDataForUpdate').and.callFake(function (userId, orderId, callback) {
        var result = {
          data: {
            userId: 12,
            quizzes: [
              {
                id: 1,
                status: constant.homeworkQuizzesStatus.ACTIVE,
                userAnswerRepo: 'www.repo.com'
              }]
          },
          isValidate: false,
          status: constant.httpCode.NOT_FOUND,
          save: (done) => {
            done(null, true);
          }
        };
        callback(null, result);
      });

      controller.updateResult({
        body: {
          userId: 12,
          orderId: 1,
          status: 5,
          resultPath: 'error'
        }
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: constant.httpCode.NOT_FOUND
          });
          done();
        }
      });
    });

    it('should return 404 when the specific homework\'s  orderId is illegal', (done)=> {
      spyOn(userHomeworkQuizzes, 'checkDataForUpdate').and.callFake(function (userId, orderId, callback) {
        var result = {
          data: {
            userId: 2,
            quizzes: [
              {
                id: 1,
                status: constant.homeworkQuizzesStatus.ACTIVE,
                userAnswerRepo: 'www.repo.com'
              }]
          },
          isValidate: false,
          status: constant.httpCode.NOT_FOUND,
          save: (done) => {
            done(null, true);
          }
        };
        callback(null, result);
      });

      controller.updateResult({
        body: {
          userId: 2,
          orderId: 112,
          status: 5,
          resultPath: 'error'
        }
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: constant.httpCode.NOT_FOUND
          });
          done();
        }
      });
    });

    it('should return 400 and the real status when specific homework\'s status is  success', (done)=> {

      spyOn(userHomeworkQuizzes, 'checkDataForUpdate').and.callFake(function (userId, orderId, callback) {
        var result = {
          data: {
            userId: 2,
            quizzes: [
              {
                id: 1,
                status: constant.homeworkQuizzesStatus.SUCCESS,
                userAnswerRepo: 'www.repo.com'
              }]
          },
          isValidate: false,
          homeworkStatus: constant.homeworkQuizzesStatus.SUCCESS,
          status: constant.httpCode.BAD_REQUEST,
          save: (done) => {
            done(null, true);
          }
        };
        callback(null, result);
      });

      controller.updateResult({
        body: {
          userId: 2,
          orderId: 112,
          status: 5,
          resultPath: 'error'
        }
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: constant.httpCode.BAD_REQUEST,
            homeworkStatus: constant.homeworkQuizzesStatus.SUCCESS
          });
          done();
        }
      });
    });

    it('should return 400 and the real status when specific homework\'s status is  active', (done)=> {

      spyOn(userHomeworkQuizzes, 'checkDataForUpdate').and.callFake(function (userId, orderId, callback) {
        var result = {
          data: {
            userId: 2,
            quizzes: [
              {
                id: 1,
                status: constant.homeworkQuizzesStatus.ACTIVE,
                userAnswerRepo: 'www.repo.com'
              }]
          },
          isValidate: false,
          homeworkStatus: constant.homeworkQuizzesStatus.ACTIVE,
          status: constant.httpCode.BAD_REQUEST,
          save: (done) => {
            done(null, true);
            done(null, true);
          }
        };
        callback(null, result);
      });

      controller.updateResult({
        body: {
          userId: 2,
          orderId: 2,
          status: 5,
          resultPath: 'error'
        }
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: constant.httpCode.BAD_REQUEST,
            homeworkStatus: constant.homeworkQuizzesStatus.ACTIVE
          });
          done();
        }
      });
    });

  });
});