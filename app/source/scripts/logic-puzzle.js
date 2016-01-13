/* jshint browser: true */

'use strict';

var $ = global.jQuery = require('jquery');
var ReactDOM = require('react-dom');

require('../less/logic-puzzle.less');
require('bootstrap');

var LogicPuzzle = require('./component/logic-puzzle-app.js');
var Navigation = require('./component/navigation.component');

$('#submitModal').on('show.bs.modal', function () {
  $('.modal-content')
      .css('margin-top', '230px');
});

ReactDOM.render(
    <LogicPuzzle />,
    document.getElementById('answer-react')
);

ReactDOM.render(
    <Navigation />,
    document.getElementById('navigation')
);