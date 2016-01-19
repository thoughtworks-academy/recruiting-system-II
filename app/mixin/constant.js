'use strict';

var constant = {
  httpCode: {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
  },
  time: {
    MINUTE_PER_HOUR: 60,
    SECONDS_PER_MINUTE: 60,
    MILLISECOND_PER_SECONDS: 1000
  },
  homeworkQuizzesStatus:{
    LOCKED:0,
    ACTIVE:1,
    PROGRESS:2,
    SUCCESS:3,
    ERROR:4
  }
};

module.exports = constant;