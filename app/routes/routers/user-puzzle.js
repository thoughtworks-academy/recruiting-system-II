var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var Schema = mongoose.Schema;


var puzzleSchema = new Schema({
  userId: Number,
  puzzle: [{
    puzzleId: Number,
    puzzleAnswer: Number
  }]
  //author: String,
  //body: String,
  //comments: [{
  //  body: String,
  //  date: Date
  //}],
  //date: {
  //  type: Date,
  //  default: Date.now
  //},
  //hidden: Boolean,
  //meta: {
  //  votes: Number,
  //  favs: Number
  //}
});


var userPuzzle = mongoose.model('UserPuzzle', puzzleSchema);
var newUser = new userPuzzle({
  userId: 1,
  puzzle: [{
    puzzleId: 2,
    puzzleAnswer: 3
  }]

});



router.post('/', function (req, res) {

  console.log(req.body);
  console.log('11');

  db.once('open', function() {
    console.log('i am connect');
    newUser.save(function(err, doc) {
      if (err) {
        return console.error(err);
      }
    })
  });


  db.close(function(err) {
    if (err) {
      console.log(err);
    }
  });
});


module.exports = router;
