'use strict';

var UserHomeworkQuizzes = require('../models/user-homework-quizzes');
var async = require('async');
var apiRequest = require('../services/api-request');
var constant = require('../mixin/constant');

function getSuccessCount(items) {
  var count = 0;
  items.homeworkItems.forEach(function (item) {
    if (item.status === constant.homeworkQuizzesStatus.SUCCESS) {
      count++;
    }
  });
  return count;
}

function getLockedCount(items) {
  var count = 0;
  items.homeworkItems.forEach(function (item) {
    if (item.status === constant.homeworkQuizzesStatus.LOCKED) {
      count++;
    }
  });
  return count;
}


function format(receivedHomeworkItems) {
  var data = [];
  receivedHomeworkItems.homeworkItems.forEach((receivedHomeworkItem)=> {
    data.push({
      status: receivedHomeworkItem.status
    });
  });

  return data;
}

function updateOneStatus(existedOne, receivedOne) {

  if (existedOne.locked = false) {
    existedOne.status = receivedOne.status;
  }
  return {
    id: existedOne.id,
    locked: existedOne.locked,
    status: existedOne.status
  };

}

function findItemById(homeworkItems, id) {

  for (var i = 0; i < homeworkItems.length; i++) {
    if (homeworkItems[i].id === id) {
      return homeworkItems[i];
    }
  }

  return null;
}

function isLockedNext(existed) {

  var successCount = getSuccessCount(existed);
  var lockedCount = getLockedCount(existed);
  return existed.length === successCount + lockedCount;
}

function lockNext(existed, newHomeworkItems) {
  var successCount = getSuccessCount(existed);
  if (successCount < existed.length) {
    existed[successCount].status = 1;
    newHomeworkItems[successCount].locked = false;
    newHomeworkItems[successCount].status = 1;
  }
}

function lockFirst(existed) {
  var successCount = getSuccessCount(existed);
  if (successCount < existed.homeworkItems.length) {
    existed.homeworkItems[successCount].status = 1;
  }
  existed.status = constant.httpCode.NOT_FOUND;

}

function updateAllStatus(existed, received, done) {

  var newHomeworkItems = [];
  if (received.status === constant.httpCode.NOT_FOUND) {

  }
  existed.homeworkItems.forEach((homeworkItem)=> {

    var result = findItemById(received, homeworkItem.id);

    if (result !== null) {
      newHomeworkItems.push(updateOneStatus(homeworkItem, result));
    } else {
      newHomeworkItems.push({
        id: homeworkItem.id,
        locked: homeworkItem.locked,
        status: homeworkItem.status
      });
    }
  });

  if (isLockedNext(existed)) {
    lockNext(existed, newHomeworkItems);
  }

  var combination = {
    newHomeworkItems: newHomeworkItems,
    homeworkItems: format(received)
  };

  done(null, combination);
}

function UserHomeworkQuizzesController() {

}

UserHomeworkQuizzesController.prototype.getList = function (req, res) {
  var userId = req.session.id;
  var homeworkQuizzesUrl = 'scoresheets';
  var items = {};

  async.waterfall([
    (done) => {
      UserHomeworkQuizzes.findOne({
        userId: userId
      }, function (err, data) {
        items = data;
        done(null, data);
      });
    }, function (data, done) {
      apiRequest.get(homeworkQuizzesUrl, done);
    }, (responds, done) => {

      if (responds.status === constant.httpCode.NOT_FOUND) {

        lockFirst(items);

        done(null, items);
      } else {
        updateAllStatus(items, responds, done);
      }

    }, function (data, done) {
      UserHomeworkQuizzes.update({userId: userId}, {homeworkItems: data.existed}, done);
      done(null, data);
    }

  ], function (err, data) {

    if (err) {
      res.send({status: 500, message: '获取列表失败'});
    } else {
      if (data.status === constant.httpCode.NOT_FOUND) {
        res.send({status: constant.httpCode.OK, homeworkQuizzes: format(data)});
      }
      res.send({status: constant.httpCode.OK, homeworkQuizzes: format(data)});
    }
  });

};

module.exports = UserHomeworkQuizzesController;

