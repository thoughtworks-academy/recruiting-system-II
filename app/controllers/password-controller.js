'use strict';

var async = require('async');
var apiRequest = require('../services/api-request');
var emailServer = require('../services/email');
var constant = require('../mixin/constant');
var yamlConfig = require('node-yaml-config');
var domainName = yamlConfig.load('./config/config.yml').domainName;
var port = yamlConfig.load('./config/config.yml').port;

function PasswordController() {

}

PasswordController.prototype.retrieve = (req, res)=> {

  var retrieveUrl = 'password/retrieve';
  var email = req.query.email;
  var query = {
    field: 'email',
    value: email
  };

  async.waterfall([
    (done) => {
      apiRequest.get(retrieveUrl, query, done);
    },
    (resq, done)=> {
      if (resq.body.status === constant.httpCode.OK) {
        var token = resq.body.token;
        var linkAddress = domainName + port + '/password/retrieve?token=' + token;

        emailServer.sendEmail(email, linkAddress, (err, status)=> {
          if (err) {
            done(true, null);
          } else {
            done(null, null);
          }
        });
      } else {
        done(true, null);
      }
    }
  ], (err, data)=> {
    if (err) {
      res.send({status: constant.httpCode.NOT_FOUND});
    } else {
      res.send({status: constant.httpCode.OK});
    }
  });

};


PasswordController.prototype.reset = (req, res)=> {


};


module.exports = PasswordController;