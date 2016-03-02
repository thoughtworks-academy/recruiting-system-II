'use strict';
var TIME = require('./constant').time;

function timeTurner() {
}

timeTurner.timeToStamp = function (time) {
  return (new Date(time)).getTime() / TIME.MILLISECOND_PER_SECONDS;
};

timeTurner.stampToTime = function (stamp) {
  return new Date(parseInt(stamp) * TIME.MILLISECOND_PER_SECONDS).toLocaleDateString().replace(/:\d{1,2}$/, ' ');
};
module.exports = timeTurner;