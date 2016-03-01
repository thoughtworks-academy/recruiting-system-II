'use strict';

var PasswordController = require('../../controllers/password-controller');
var apiRequest = require('../../services/api-request');
var emailServer = require('../../services/email');
var constant = require('../../mixin/constant');

describe('PasswordController', function () {

  describe('retrieve', ()=> {
    var controller;

    beforeEach(()=> {
      controller = new PasswordController();
    });

    it('should return status 200 when verify user is exist and send email success  ', (done)=> {

      spyOn(apiRequest, 'get').and.callFake(function (url, body, callback) {
        callback(null, {
          body: {
            status: constant.httpCode.OK,
            token: 'gdesagrjehnfjwaf'
          }
        });
      });

      spyOn(emailServer, 'sendEmail').and.callFake(function (url, body, callback) {
        callback(
            null
            , {
              status: constant.httpCode.OK
            });
      });

      controller.retrieve({
        query: {
          email: '224577147@qq.com'
        }
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: constant.httpCode.OK
          });
          done();
        }
      });

    });

    it('should return status 404 when verify user is not exist ', (done)=> {
      spyOn(apiRequest, 'get').and.callFake(function (url, body, callback) {
        callback(null, {
          body: {
            status: constant.httpCode.NOT_FOUND,
            token: 'gdesagrjehnfjwaf'
          }
        });
      });

      spyOn(emailServer, 'sendEmail').and.callFake(function (url, body, callback) {
        callback(
            true, {
              status: constant.httpCode.NOT_FOUND
            });
      });

      controller.retrieve({
        query: {
          email: '224577147@qq.com'
        }
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: constant.httpCode.NOT_FOUND
          });
          done();
        }
      });

    });

    it('should return status 404 and when verify user is exist but send email fail', (done)=> {

      spyOn(apiRequest, 'get').and.callFake(function (url, body, callback) {
        callback(null, {
          body: {
            status: constant.httpCode.OK,
            token: 'gdesagrjehnfjwaf'
          }
        });
      });

      spyOn(emailServer, 'sendEmail').and.callFake(function (url, body, callback) {
        callback(
            true
            , {
              status: constant.httpCode.NOT_FOUND
            });
      });

      controller.retrieve({
        query: {
          email: '224577147@qq.com'
        }
      }, {
        send: function (data) {
          expect(data).toEqual({
            status: constant.httpCode.NOT_FOUND
          });
          done();
        }
      });
    });

  });
});