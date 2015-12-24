var mongoose = require('mongoose');

module.exports = {
  open: function() {
    mongoose.connect('mongodb://localhost/twars');
  },
  db: mongoose.connection
};