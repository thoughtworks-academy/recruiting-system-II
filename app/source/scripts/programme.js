'use strict';

var $ = global.jQuery = require('jquery');
require('../less/programme.less');

require('bootstrap');

$(function () {
  $('.nav a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
});
