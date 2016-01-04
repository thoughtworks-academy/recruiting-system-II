var express = require('express');
var router = express.Router();
var request = require('superagent');

router.get('/', function (req, res) {
  var userId = req.session.user.id;
  var uri = 'user/' + userId + '/detail';

  request
      .get(apiServer + uri)
      .set('Content-Type', 'application/json')
      .end(function (err, result) {
        if (result.status === 200) {
          res.send({
            status: 200,
            data: result.body
          })
        } else {
          res.send({
            status: 400
          })
        }
      })
});

router.get('/emailPhone', function(req, res) {
  var userId = req.session.user.id;
  var uri = 'user/' + userId;

  request
    .get(apiServer + uri)
    .set('Content-Type', 'application/json')
    .end(function(err, result) {
      if (result.status === 200) {
        res.send({
          status: 200,
          data: result.body
        })
      } else {
        res.send({
          status: 400
        })
      }
    })
});

//router.post('/update', function (req, res) {
//  res.send({
//    status: 200
//  });
//
//});


var request = require('superagent');

module.exports = router;
