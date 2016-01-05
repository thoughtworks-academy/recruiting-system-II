var express = require('express');
var router = express.Router();
var Promise = this.Promise || require('promise');
var superAgent = require('superagent');
var agent = require('superagent-promise')(superAgent, Promise);
var _ = require('lodash');

router.get('/', function (req, res) {
  var userId = req.session.user.id;
  var result;

  agent.get(apiServer + 'user/' + userId + '/detail')
      .set('Content-Type', 'application/json')
      .end()
      .then(function (resp) {
        if (resp.status === 200) {
          result = _.assign(resp.body);
        } else {
          throw new Error;
        }
        return result;
      })
      .then(function () {
        return agent.get(apiServer + 'user/' + userId)
            .set('Content-Type', 'application/json')
            .end();
      })
      .then(function (resp) {
        if (resp.status === 200) {
          result = _.assign(result, resp.body);
        } else {
          throw new Error;
        }
        return result
      })
      .then(function (result) {
        res.send({
          status: 200,
          data: result
        })
      })
      .catch(function (e) {
        res.status(404);
        res.send({
          status: 404
        })
      })
});

module.exports = router;
