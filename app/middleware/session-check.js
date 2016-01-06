var getJumpControl = require('../mixin/get-jump-control');
var userPuzzle = require('../models/user-puzzle');

function checkIsCommited (req){
  return userPuzzle.findOne({userId: req.session.user.id})
    .then((userPuzzle) => {
      if(userPuzzle){
        var now = Date.parse(new Date()) / 1000;
        var usedTime = now - userPuzzle.startTime;

        return userPuzzle.isCommited || parseInt(5400 - usedTime) <= 0;
      }else {
        return false;
      }
    });
}

function pathControl (req, res, next, jumpControl) {
  var arr = req.url.split('/');

  arr.forEach(function(item, i){
    arr[i] = item.split('?')[0];
  });

  var lastElement = arr[arr.length - 1];

  var redirectionAddress;
  var needRedirect = false;

  jumpControl.forEach((item) => {
    if (item.originPath.indexOf(lastElement) !== -1 && item.condition){
      redirectionAddress = item.targetPath;
      needRedirect = true;
    }
  });

  if (needRedirect) {
    res.redirect(redirectionAddress);
  }else {
    next();
  }
}

module.exports = function (req, res, next) {
  var env = process.env.NODE_ENV === "production" ? "production" : "development";

  if(env === 'development' && !req.session.user){
    req.session.user = {
      id: 1,
      userInfo: {
        uri: 'user/1'
      }
    };
  }

  var hasSession = false;

  if (req.session.user) {
    hasSession = true;
  }

  if(hasSession){
    checkIsCommited(req)
      .then((isCommited) => {
        var jumpControl = getJumpControl(hasSession, isCommited);
        pathControl(req, res, next, jumpControl);
      })
  }else{
    var jumpControl = getJumpControl(hasSession, false);
    pathControl(req, res, next, jumpControl);
  }
};