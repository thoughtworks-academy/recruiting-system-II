var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');

require('bootstrap');
var request = require('superagent');
var RegisterApp = require('./component/register-app.component');

ReactDom.render(
    <RegisterApp />,
    document.getElementById('register-container')
);

$(function() {

  $('#agreementModal').on('show.bs.modal', function() {
    $('.modal .modal-body').css('overflow-y', 'auto').css('max-height', $(window).height() * 0.7);
  });


  function jumpToStart() {
    location.href = 'start.html'
  }

  function register() {
    $('#registration').modal('show');
    var mobilePhone = $('[name=mobilePhone]').val();
    var email = $('[name=email]').val();
    var password = $('[name=password]').val();

    request.post('/register')
      .set('Content-Type', 'application/json')
      .send({
        mobilePhone: mobilePhone,
        email: email,
        password: password
      })
      .end(function(err, req) {
        var data = JSON.parse(req.text);

        $('#register-info').text(data.message);
        if (data.status === 200) {
          window.setTimeout(jumpToStart, 5000);
        } else {}
      });
  }

  var checkbox = $('.agree-check');
  var isChecked = false;

  function checkRegisterData (){

    if (!checkbox.prop('checked')) {
      $('#agree-check').modal('show');
    } else {
      isChecked = true;
    }
  }

  $('#register-btn').on('click', function() {
    checkRegisterData();
    if (isChecked) {
      register();
    }
  });
  $('[name=loginFailed]').hide();

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
