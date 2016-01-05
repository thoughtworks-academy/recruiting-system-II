var getJumpControl = require('../mixin/get-jump-control');

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

  var jumpControl = getJumpControl(hasSession);

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
};