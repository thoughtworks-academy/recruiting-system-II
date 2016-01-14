'use strict';

var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');

require('bootstrap');
require('../less/register.less');
var RegisterApp = require('./component/register-app.component');

ReactDom.render(
    <RegisterApp />,
    document.getElementById('register-container')
);

var SIZE = 0.7;

$(function() {
  $('#agreementModal').on('show.bs.modal', function() {
    $('.modal .modal-body').css('overflow-y', 'auto').css('max-height', $(window).height() * SIZE);
  });
});
