'use strict';

var ProgrammeController = require('../../controllers/programme-controller');
var programme = require('../../models/user-homework-quizzes');
var apiRequest = require('../../services/api-request');

describe('ProgrammeController', function () {

  var controller;

  beforeEach(function () {
    controller = new ProgrammeController();
  });

  it('should return homeworkQuizzes when receive a request', function (done) {

    spyOn(programme, 'findOne').and.callFake(function (id, done) {

      var data = {
        userId: 1,
        homeworkItems: [
          {
            id: 1,
            locked: true,
            status: 0
          }, {
            id: 2,
            locked: true,
            status: 0
          }
        ]
      };

      done(null, data);
    });

    spyOn(apiRequest, 'get').and.callFake(function (uri, done) {

      var data = {
        status: 200,
        homeworkItems: [{
          id: 1,
          status: 2
        }, {
          id: 2,
          status: 2
        }, {
          id: 3,
          status: 4
        }]
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
              status: 2
            },
            {
              status: 2
            },
            {
              status: 4
            }
          ]
        });
        done();
      }
    });

  });


  it('should active the first homeworkQuiz when receive a request httpCode is 404', function (done) {

    spyOn(programme, 'findOne').and.callFake(function (id, done) {

      var data = {
        userId: 1,
        homeworkItems: [
          {
            id: 1,
            locked: true,
            status: 0
          }, {
            id: 2,
            locked: true,
            status: 0
          }
        ]
      };

      done(null, data);
    });

    spyOn(apiRequest, 'get').and.callFake(function (uri, done) {

      var data = {
        status: 404,
        homeworkQuizzes: null
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