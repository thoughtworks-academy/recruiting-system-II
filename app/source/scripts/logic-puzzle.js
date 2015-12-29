var $ = global.jQuery = require('jquery');
var ReactDOM = require('react-dom');
var React = require('react');
require('../less/logic-puzzle.less');
require("bootstrap");

var LogicPuzzle = require('./component/logic-puzzle-app.js');

$('#submitModal').on('show.bs.modal', function () {
  $('.modal-content').css('margin-top', '230px');
});

ReactDOM.render(<LogicPuzzle />, document.getElementById('answer-react'));
