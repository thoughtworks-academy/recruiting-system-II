'use strict';

function timeTurner() {
}

timeTurner.timeToStamp = function(time) {
  return (new Date(time)).getTime()/1000;
};

timeTurner.stampToTime = function (stamp) {
  return new Date(parseInt(stamp) *1000).toLocaleDateString().replace(/:\d{1,2}$/,' ');
};
module.exports = timeTurner;