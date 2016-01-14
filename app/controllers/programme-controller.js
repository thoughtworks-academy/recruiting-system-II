'use strict';

var programme = require('../models/programme');
var async = require('async');

function ProgrammeController() {

}

ProgrammeController.prototype.getList = function (req, res) {
  var userId = req.session.id;

  var homeworkQuizzesUrl = 'scoresheets';
  async.waterfall([

    function (done) {

      var items = {
        userId: userId,
        homeworkQuizzes: 1,
        homeworkItems: [
          {
            id: 1,
            states: 0
          }
        ]

      };

      done(null, items);
    }, function (data, done) {
      apiRequest.get(scoresheets, done);

    }, function (responds, done) {

    }

  ], function (err) {
    //TODO:
  });
};


ProgrammeController.prototype.updateStatus = function (existStatus, receiceStatus) {
  //TODO:
};


module.exports = ProgrammeController;