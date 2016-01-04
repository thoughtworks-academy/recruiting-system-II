var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var userId = req.session.user.id;

  res.send({
    id:userId,
    school: 'sw'
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


router.post('/update', function(req, res) {
    res.send({
      status:200
    });

  //request.post('/userInfo/update')
  //       .set('Content-Type', "application/json")
  //       .send({
  //         id: req.session.user.id,
  //         data: req.body.userData
  //       })
  //       .end(function (err, res) {
  //         if(res.body.status === 200) {
  //           res.send({
  //             status: 200
  //           })
  //         }
  //       })
  //
});


var request = require('superagent');

module.exports = router;
