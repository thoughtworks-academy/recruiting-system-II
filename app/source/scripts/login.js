var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');
require("bootstrap");
var request = require("superagent");

$(function () {
  $('[name=loginFailed]').hide();

  function jumpToStart() {
    location.href = "start.html"
  }

  $("#login-btn").on('click', function (evt) {
    var phoneEmail = $('[name=phoneEmail]').val();
    var loginPassword = $('[name=loginPassword]').val();

    request.get('/login')
        .set('Content-Type', "application/json")
        .query({
          account: phoneEmail,
          password: loginPassword
        })
        .end(function (err, req) {
          var data = JSON.parse(req.text);
          if (data.status === 200) {
            jumpToStart();
          } else {
            $('[name=loginFailed]').show();
            evt.preventDefault();
          }
        })
  });
});
