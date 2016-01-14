'use strict';

var UserInitializationController = require('../../controllers/user-initialization-controller');
var logicPuzzle = require('../../models/logic-puzzle');
var apiRequest = require('../../services/api-request');
var constant = require('../../mixin/constant');

describe('UserInitializationController', function () {

  var controller;
  var paperEnrollment;
  var itemDetail;
  var document;

  beforeEach(function () {
    controller = new UserInitializationController();

    paperEnrollment =
    {
      'id': 1,
      'sections': [{
        'id': 1,
        'quizzes': [{
          'id': 1,
          'items': {
            'uri': 'blankQuizzes/1/items'
          }
        }]
      }]
    };

    itemDetail =
    {
      quizItems: 'quizItems',
      exampleItems: 'exampleItems'
    };
  });

  it('should initial user info in mongoDB when use is not exist', function (done) {
    spyOn(apiRequest, 'get').and.callFake(function (uri, done) {
      if (uri === 'papers/enrollment') {
        done(null, {body: paperEnrollment});
      } else {
        done(null, {body: itemDetail});
      }
    });

    spyOn(logicPuzzle,'findOne').and.callFake(function(id,done){
      done(null,false);
    });

    spyOn(logicPuzzle,'create').and.callFake(function(doc,done){
      document = doc;
      done(null,'data');
    });


    controller.initialLogicPuzzle({
      session: {
        user: {id: 1}
      }
    },{
      send: function (data) {
        expect(data).toEqual({status: 200, message: '初始化成功!'});
        expect(document).toEqual({
          userId: 1,
          quizItems: 'quizItems',
          quizExamples: 'exampleItems',
          blankQuizId: 1,
          paperId: 1
        });
        done();
      }
    });

  });

  it("should throw Error when it's error", function (done) {
    spyOn(logicPuzzle,'findOne').and.callFake(function(id,done){
      var err = new Error('ops!');
      done(err,false);
    });


    controller.initialLogicPuzzle({
      session: {
        user: {id: 1}
      }
    },{
      send: function (data) {
        expect(data).toEqual({status: 500, message: '服务器错误'});
        done();
      },
      statusCode: function(code){
        expect(code).toEqual(constant.INTERNAL_SERVER_ERROR);
      }
    });

  });

});