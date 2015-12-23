var express = require('express');
var router = express.Router();
var request = require('superagent');
var _logicPuzzleList = [
  'quizItems/1',
  'quizItems/5',
  'quizItems/8',
  'quizItems/14',
  'quizItems/26',
  'quizItems/33',
  'quizItems/36',
  'quizItems/41',
  'quizItems/47',
  'quizItems/49'
];

router.get('/', function(req, resp) {
  if(req.query.orderIndex >= 1 &&  req.query.orderIndex <= 10) {
    request
        .get(apiServer + _logicPuzzleList[req.query.orderIndex-1])
        .set('Content-Type', 'application/json')
        .end(function (err, res) {
          resp.send({
            id: 1,
            initializedBox: JSON.parse(res.body.initializedBox),
            questionZh: res.body.questionZh,
            descriptionZh: JSON.parse(res.body.descriptionZh),
            chartPath: res.body.chartPath
          });
        });
  }else {
    resp.send({isOutRange: true });
  }
});



module.exports = router;
