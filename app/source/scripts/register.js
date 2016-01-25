'use strict';

var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');

require('bootstrap');
require('../less/register.less');
var RegisterApp = require('./component/register-app.component');
var RegisterForm = require('./component/register-form.component');
var LoginForm = require('./component/login-form.component');
var LoginInfo = require('./component/login-info.component');
var RegisterAgreement = require('./component/register-agreement.component');
var RegisterPassword = require('./component/register-password.component');

ReactDom.render(
    <RegisterApp>
      <RegisterForm>
        <RegisterPassword/>
      </RegisterForm>
      <LoginForm/>
      <LoginInfo/>
      <RegisterAgreement/>
    </RegisterApp>,
    document.getElementById('register-container')
);

var SIZE = 0.7;

$(function() {
  $('#agreementModal').on('show.bs.modal', function() {
    $('.modal .modal-body').css('overflow-y', 'auto').css('max-height', $(window).height() * SIZE);
  });
});
