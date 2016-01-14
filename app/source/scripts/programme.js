/* jshint browser: true */

'use strict';

var $ = global.jQuery = require('jquery');
require('bootstrap');

require('../less/programme.less');
var ReactDom = require('react-dom');
var Navigation = require('./component/navigation.component');

$(function () {
  $('.nav a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
});

ReactDom.render(
    <Navigation />,
    document.getElementById('navigation')
);