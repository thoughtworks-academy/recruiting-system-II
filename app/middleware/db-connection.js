var mongoose = require('mongoose');
var connected = false;

module.exports = function(app) {
  app.use(function(req, res, next) {
    if(connected) {
      next();
    } else {
      mongoose.connect("mongodb://localhost/twars");
      var db = mongoose.connection;
      db.once('open', function() {
        console.log("connection opend!");
        connected = true;
        next();
      })
    }

  });
};
