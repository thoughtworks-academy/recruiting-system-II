'use strict';

var express = require('express');
var session = require('supertest-session');
var app = require('../../app');
var request = require('superagent');
var httpStatusCode = require('../../mixin/constant').httpCode;

var testSession = null;

describe('GET /LogicPuzzle', function(){

  it('can sign in', function(done){

    testSession = session(app);

    spyOn(request, 'post').and.callFake(function() {
      return {
        set: function () {
          return this;
        },
        send: function() {
          return this;
        },
        end: function(fn) {
          fn(null, {
            body:{userInfo:{uri: 'user/2'}, id: 2},
            status:httpStatusCode.OK
          });
        }
      };
    });

    testSession.get('/login')
        .set('Content-Type', 'application/json')
        .query({
          account: 'test2@qq.com',
          password: '12345678'
        })
        .expect(httpStatusCode.OK)
        .end(function(err, res) {
          if (err) {
            done.fail(err);
          } else {
            done();
          }
        });
  });

  it('can get logic puzzle', function (done) {

    testSession
        .get('/logic-puzzle')
        .set('Content-Type', 'application/json')
        .query({
          orderId: 1
        })
        .expect(httpStatusCode.OK)
        .end(function(err, res) {
          if (err) {
            done.fail(err);
          } else {
            done();
          }
        });
  });

});


