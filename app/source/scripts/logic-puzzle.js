'use strict';

var $ = global.jQuery = require('jquery');
var ReactDOM = require('react-dom');

require('../less/logic-puzzle.less');
require('bootstrap');

var LogicPuzzle = require('./component/logic-puzzle-app.js');
var LogicPuzzleLeft = require('./component/logic-puzzle-left.js');
var LogicPuzzleSidebar = require('./component/logic-puzzle-sidebar.js');

var Navigation = require('./component/navigation.component');
var LogicPuzzleActions = require('./actions/logic-puzzle-actions');

$('#submitModal').on('show.bs.modal', function () {
  $('.modal-content')
      .css('margin-top', '230px');
});

ReactDOM.render(
    <div>
      <Navigation />
      <LogicPuzzle>
        <div className="col-md-9 col-sm-8">
          <LogicPuzzleLeft />

        </div>
        <div className="col-md-3 col-sm-4">
          <LogicPuzzleSidebar />
        </div>
      </LogicPuzzle>
    </div>,
    document.getElementById('answer-react')
);
