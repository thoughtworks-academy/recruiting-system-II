var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var userId = req.session.user.id;

  res.send({
    id:userId,
    school: 'sw',
    name:'ly'
  });

//request.get('/userInfo')
//    .set('Content-Type', 'application/json')
//    .query({
//      id: userId
//    })
//    .end(function (err, res) {
//        if(res.body.status === 200) {
//          res.send({
//            status: 200,
//            data:{
//             id: userId
//             }
//           })
//        }
//    })
});

var request = require('superagent');

module.exports = router;
