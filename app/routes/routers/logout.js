'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  req.session.destroy(function(err) {
    if(err){
      res.send(err);
    }else {
      res.redirect('/register.html');
    }
  })
});

module.exports = router;
