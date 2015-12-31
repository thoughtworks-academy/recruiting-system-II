var filterRoute = require('../mixin/filter-route');

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

  if (req.session.user) {
    next();
  } else {
    var arr = req.url.split('/');

    arr.forEach(function(item, i){
      arr[i] = item.split('?')[0];
    });

    var lastElement = arr[arr.length - 1];

    if (lastElement.indexOf("html") !== -1 && filterRoute.blackList.indexOf(lastElement) !== -1){
      res.redirect('/');
    }else{
      next();
    }
  }
};