'use strict';

var UserInitializationController = require('../../controllers/user-initialization-controller');
var logicPuzzle = require('../../models/logic-puzzle');
var apiRequest = require('../../services/api-request');

describe('UserInitializationController', function () {

  var controller;
  var paperEnrollment;
  var itemDetail;

  beforeEach(function () {
    controller = new UserInitializationController();

    paperEnrollment =
    {
      'id': 1,
      'sections': [
        {
          'id': 1,
          'quizzes': [
            {
              'definition': {
                'uri': 'blankQuizzes/1'
              },
              'id': 1,
              'items': {
                'uri': 'blankQuizzes/1/items'
              }
            },
            {
              'definition': {
                'uri': 'blankQuizzes/3'
              },
              'id': 3,
              'items': {
                'uri': 'blankQuizzes/3/items'
              }
            },
            {
              'definition': {
                'uri': 'blankQuizzes/4'
              },
              'id': 4,
              'items': {
                'uri': 'blankQuizzes/4/items'
              }
            }
          ],
          'desc': 'blankQuizzes'
        },
        {
          'id': 2,
          'quizzes': [
            {
              'definition': {
                'uri': 'blankQuizzes/2'
              },
              'id': 2,
              'items': {
                'uri': 'blankQuizzes/2/items'
              }
            },
            {
              'definition': {
                'uri': 'blankQuizzes/5'
              },
              'id': 5,
              'items': {
                'uri': 'blankQuizzes/5/items'
              }
            }
          ],
          'desc': 'blankQuizzes'
        },
        {
          'id': 3,
          'quizzes': [
            {
              'definition': {
                'uri': 'blankQuizzes/6'
              },
              'id': 6,
              'items': {
                'uri': 'blankQuizzes/6/items'
              }
            }
          ],
          'desc': 'homeworkQuizzes'
        }
      ]
    };

    itemDetail =
    {
      quizItems: [{
        question: '经过以上操作之后，现在7号盒子中的数字是多少?',
        description: '["","更改指令9：将该指令中的第2个盒子的编号加2","相乘：1号盒子中的数字*2号盒子中的数字，将结果放在7号盒子中。","判断：指令2中第1个盒子的编号比5号盒子中的数字大吗","更改指令2：将该指令中的第1个盒子的编号加2","判断：指令2中第2个盒子的编号比6号盒子中的数字大吗","更改指令2：将该指令中的第1个盒子的编号加1","判断：指令9中第1个盒子的编号比4号盒子中的数字大吗","将3号盒子中的数字放在2号盒子中","将1号盒子中的数字放在1号盒子中",""]',
        id: 16,
        chartPath: 'logic-puzzle/23.png',
        initializedBox: '[0,2,7,2,1,5,7,1,4,8]'
      },
      {
        question: '经过以上操作之后，现在4号盒子中的数字是多少?',
        description: '["","相乘：6号盒子中的数字*8号盒子中的数字，将结果放在6号盒子中。","更改指令6：将该指令中的第2个盒子的编号加1","判断：指令6中第2个盒子的编号比8号盒子中的数字大吗","更改指令6：将该指令中的第1个盒子的编号加1","判断：指令6中第2个盒子的编号比5号盒子中的数字大吗","将2号盒子中的数字放在3号盒子中","判断：指令1中第2个盒子的编号比4号盒子中的数字大吗","将1号盒子中的数字放在7号盒子中","更改指令6：将该指令中的第2个盒子的编号加1",""]',
        id: 42,
        chartPath: 'logic-puzzle/47.png',
        initializedBox: '[0,2,7,2,1,5,7,1,4,8]'
      },
      {
        question: '经过以上操作之后，现在1号盒子中的数字是多少?',
        description: '["","更改指令8：将该指令中的第1个盒子的编号加1","相乘：6号盒子中的数字*5号盒子中的数字，将结果放在1号盒子中。","判断：指令9中第2个盒子的编号比6号盒子中的数字大吗","更改指令9：将该指令中的第2个盒子编号加1","判断：指令2中第2个盒子的编号比7号盒子中的数字大吗","更改指令2：将该指令中的第2个盒子的编号加1","判断：指令2中第2个盒子的编号比5号盒子中的数字大吗","将7号盒子中的数字放在7号盒子中","将5号盒子中的数字放在5号盒子中",""]',
        id: 17,
        chartPath: 'logic-puzzle/24.png',
        initializedBox: '[0,2,7,2,1,5,7,1,4,8]'
      },
      {
        question: '经过以上操作之后，现在7号盒子中的数字是多少?',
        description: '["","更改指令2：将该指令中的第2个盒子的编号加1","将5号盒子中的数字放在4号盒子中","判断：指令4中第1个盒子的编号比6号盒子中的数字大吗","相乘：8号盒子中的数字*5号盒子中的数字，将结果放在7号盒子中。","判断：指令6中第1个盒子的编号比8号盒子中的数字大吗","将6号盒子中的数字放在4号盒子中","判断：指令2中第2个盒子的编号比2号盒子中的数字大吗","更改指令2：将该指令中的第1个盒子的编号加2","更改指令4：将该指令中的第1个盒子的编号加1",""]',
        id: 32,
        chartPath: 'logic-puzzle/38.png',
        initializedBox: '[0,2,7,2,1,5,7,1,4,8]'
      },
      {
        question: '经过以上操作之后，现在3号盒子中的数字是多少?',
        description: '["","将7号盒子中的数字放在2号盒子中","相乘：3号盒子中的数字*1号盒子中的数字，将结果放在3号盒子中。","判断：指令2中第1个盒子的编号比6号盒子中的数字大吗","更改指令2：将该指令中的第1个盒子的编号加1","判断：指令1中第2个盒子的编号比1号盒子中的数字大吗","判断：指令8中第1个盒子的编号比2号盒子中的数字大吗","更改指令1：将该指令中的第1个盒子的编号加1","将1号盒子中的数字放在3号盒子中","更改指令1：将该指令中的第2个盒子的编号加1",""]',
        id: 50,
        chartPath: 'logic-puzzle/9.png',
        initializedBox: '[0,2,7,2,1,5,7,1,4,8]'
      },
      {
        question: '经过以上操作之后，现在6号盒子中的数字是多少?',
        description: '["","将4号盒子中的数字放在4号盒子中","更改指令9：将该指令中的第2个盒子的编号加1","判断：指令9中第2个盒子的编号比2号盒子中的数字大吗","相乘：6号盒子中的数字*9号盒子中的数字，将结果放在6号盒子中。","判断：指令9中第1个盒子的编号比5号盒子中的数字大吗","判断：指令9中第2个盒子的编号比2号盒子中的数字大吗","更改指令9：将该指令中的第1个盒子的编号加1","更改指令1：将该指令中的第2个盒子的编号加1","将4号盒子中的数字放在2号盒子中",""]',
        id: 1,
        chartPath: 'logic-puzzle/1.png',
        initializedBox: '[0,2,7,2,1,5,7,1,4,8]'
      },
      {
        question: '经过以上操作之后，现在1号盒子中的数字是多少?',
        description: '["","将8号盒子中的数字放在7号盒子中","更改指令6：将该指令中的第2个盒子的编号加1","判断：指令1中第2个盒子的编号比8号盒子中的数字大吗","更改指令6：将该指令中的第1个盒子的编号加1","判断：指令6中第1个盒子的编号比4号盒子中的数字大吗","相乘：1号盒子中的数字*3号盒子中的数字，将结果放在1号盒子中。","判断：指令6中第1个盒子的编号比7号盒子中的数字大吗","更改指令6：将该指令中的第1个盒子的编号加2","将4号盒子中的数字放在7号盒子中",""]',
        id: 38,
        chartPath: 'logic-puzzle/43.png',
        initializedBox: '[0,2,7,2,1,5,7,1,4,8]'
      },
      {
        question: '经过以上操作之后，现在7号盒子中的数字是多少?',
        description: '["","相乘：6号盒子中的数字*3号盒子中的数字，将结果放在7号盒子中。","将2号盒子中的数字放在8号盒子中","判断：指令1中第2个盒子的编号比8号盒子中的数字大吗","更改指令1：将该指令中的第2个盒子的编加1","判断：指令7中第2个盒子的编号比6号盒子中的数字大吗","判断：指令7中第1个盒子的编号比7号盒子中的数字大吗","将7号盒子中的数字放在7号盒子中","更改指令2：将该指令中的第1个盒子的编号加2","更改指令1：将该指令中的第1个盒子的编号加1",""]',
        id: 3,
        chartPath: 'logic-puzzle/11.png',
        initializedBox: '[0,2,7,2,1,5,7,1,4,8]'
      },
      {
        question: '经过以上操作之后，现在3号盒子中的数字是多少?',
        description: '["","将9号盒子中的数字放在2号盒子中","更改指令4：将该指令中的第1个盒子的编号加1","判断：指令9中第1个盒子的编号比8号盒子中的数字大吗","相乘：2号盒子中的数字*3号盒子中的数字，将结果放在3号盒子中。","判断：指令4中第1个盒子的编号比6号盒子中的数字大吗","判断：指令1中第2个盒子的编号比5号盒子中的数字大吗","更改指令9：将该指令中的第1个盒子的编号加1","更改指令9：将该指令中的第1个盒子的编号加1","将4号盒子中的数字放在6号盒子中",""]',
        id: 12,
        chartPath: 'logic-puzzle/2.png',
        initializedBox: '[0,2,7,2,1,5,7,1,4,8]'
      },
      {
        question: '经过以上操作之后，现在4号盒子中的数字是多少?',
        description: '["","将3号盒子中的数字放在2号盒子中","相乘：3号盒子中的数字*4号盒子中的数字，将结果放在4号盒子中。","判断：指令2中第1个盒子的编号比4号盒子中的数字大吗","更改指令1：将该指令中的第2个盒子的编号加1","判断：指令1中第2个盒子的编号比6号盒子中的数字大吗","判断：指令8中第2个盒子的编号比3号盒子中的数字大吗","更改指令1：将该指令中的第1个盒子的编号加2","将8号盒子中的数字放在6号盒子中","更改指令8：将该指令中的第2个盒子的编号加2",""]',
        id: 49,
        chartPath: 'logic-puzzle/8.png',
        initializedBox: '[0,2,7,2,1,5,7,1,4,8]'
      }],
      exampleItems: [{
        question: '经过以上操作之后，现在4号盒子中的数字是多少?',
        answer: '5',
        description: '["","更改指令9：将该指令中的第1个盒子的编号加1","更改指令4：将该指令中的第2个盒子的编号加2","判断：指令4中第1个盒子的编号比4号盒子中的数字大吗","相乘：3号盒子中的数字*2号盒子中的数字，将结果放在4号盒子中。","判断：指令9中第2个盒子的编号比4号盒子中的数字大吗","将5号盒子中的数字放在4号盒子中","判断：指令4中第2个盒子的编号比8号盒子中的数字大吗","更改指令9：将该指令中的第2个盒子的编号加1","将4号盒子中的数字放在3号盒子中",""]',
        id: 9,
        chartPath: 'logic-puzzle/17.png',
        initializedBox: '[0,2,7,2,1,5,7,1,4,8]'
      },
      {
        question: '经过以上操作之后，现在5号盒子中的数字是多少?',
        answer: '1',
        description: '["","更改指令8：将该指令中的第2个盒子的编号加1","相乘：5号盒子中的数字*3号盒子中的数字，将结果放在5号盒子中。","判断：指令4中第2个盒子的编号比8号盒子中的数字大吗","将7号盒子中的数字放在4号盒子中","判断：指令4中第1个盒子的编号比2号盒子中的数字大吗","更改指令4：将该指令中的第2个盒子的编号加1","判断：指令8中第2个盒子的编号比7号盒子中的数字大吗","将4号盒子中的数字放在3号盒子中","更改指令8：将该指令中的第1个盒子的编号加2",""]',
        id: 27,
        chartPath: 'logic-puzzle/33.png',
        initializedBox: '[0,2,7,2,1,5,7,1,4,8]'
      }]
    };
  });

  //it('should_return_quiz_item_by_order_index', function (done) {
  //
  //  spyOn(userPuzzle, 'getUserPuzzle').and.callFake(function (orderId, userId) {
  //
  //    return {
  //      then: function (fn) {
  //        setTimeout(function () {
  //          fn({data: 123});
  //        }, 1000);
  //      }
  //    };
  //  });
  //
  //  controller.getUserPuzzle({
  //    query: {orderId: 1},
  //    session: {
  //      user: {id: 3}
  //    }
  //  }, {
  //    send: function (data) {
  //      expect(data).toEqual({
  //        data: 123
  //      });
  //      done();
  //    }
  //  });

  it('should initial user info in mongoDB when use is not exist', function (done) {
    spyOn(apiRequest, 'get').and.callFake(function (uri, done) {
      if (uri === 'papers/enrollment') {
        done(null, {body: paperEnrollment});
      } else {
        done(null, {body: itemDetail});
      }

    });

    controller.initialLogicPuzzle();
  });

});