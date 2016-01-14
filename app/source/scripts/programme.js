'use strict';

var $ = global.jQuery = require('jquery');
require('bootstrap');

require('../less/programme.less');
var ReactDom = require('react-dom');
var Navigation = require('./component/navigation.component');
var ProgrammeApp = require('./component/programme-app.component');

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

ReactDom.render(
    <ProgrammeApp />,
    document.getElementById('programme')
);