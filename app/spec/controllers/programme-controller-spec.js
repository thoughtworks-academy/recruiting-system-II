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
        yy: '12',
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


    spyOn(controller, 'updateAllStatus').and.callFake(function (done) {
      var data =
          [
            {
              topicStatus: 3
            },
            {
              topicStatus: 4
            },
            {
              topicStatus: 3
            },
            {
              topicStatus: 4
            }
          ];

      done(null, data);
    });


    controller.getList({
      session: {
        user: {id: 3}
      }
    }, {
      send: function (data) {
        expect(data).toEqual({
          status: 200,
          homeworkQuizzes: [
            {
              topicStatus: 3
            },
            {
              topicStatus: 4
            },
            {
              topicStatus: 3
            },
            {
              topicStatus: 4
            }
          ]
        });
        done();
      }
    });

  });

});