var UserPuzzleController = require('../../controllers/user-puzzle');
var userPuzzle = require('../../models/user-puzzle');

describe("UserPuzzleController", function() {

  var controller;

  beforeEach(function() {
    controller = new UserPuzzleController();


  });

  it("should_return_quiz_item_by_order_index", function(done) {

    spyOn(userPuzzle, 'getUserPuzzle').and.callFake(function(orderId, userId) {

      return {
        then: function(fn) {
          setTimeout(function() {
            fn({data: 123});
          }, 1000);
        }
      }
    });

    controller.getUserPuzzle({
      query: {orderId: 1},
      session: {
        user: {id: 3}
      }
    }, {
      send: function(data) {
        expect(data).toEqual({
          data: 123
        });
        done();
      }
    });


  })
});