'use strict';

var $ = global.jQuery = require('jquery');
var ReactDOM = require('react-dom');

require('../less/logic-puzzle.less');
require('bootstrap');

var LogicPuzzle = require('./component/logic-puzzle/logic-puzzle-app');
var LogicPuzzleLeft = require('./component/logic-puzzle/logic-puzzle-left.component');
var LogicPuzzleSidebar = require('./component/logic-puzzle/logic-puzzle-sidebar.component');
var LogicPuzzleBoxes = require('./component/logic-puzzle/logic-puzzle-boxes.component');
var LogicPuzzleChart = require('./component/logic-puzzle/logic-puzzle-chart.component');
var LogicPuzzleDescription = require('./component/logic-puzzle/logic-puzzle-description.component');
var LogicPuzzleAnswerSubmit = require('./component/logic-puzzle/logic-puzzle-answer-submit.component');
var LogicPuzzleTimer = require('./component/logic-puzzle/logic-puzzle-timer.component');
var LogicPuzzleActions = require('./actions/logic-puzzle-actions');
var Navigation = require('./component/navigation.component');

$('#submitModal').on('show.bs.modal', function () {
  $('.modal-content')
      .css('margin-top', '230px');
});

function handleTimeOver(){
  LogicPuzzleActions.timeOver();
}

ReactDOM.render(
    <div>
      <header>
        <Navigation />
      </header>
      <LogicPuzzle>
        <div className="col-md-9 col-sm-8">
          <LogicPuzzleLeft>
            <LogicPuzzleBoxes/>
            <LogicPuzzleChart/>
            <LogicPuzzleDescription/>
            <LogicPuzzleAnswerSubmit/>
          </LogicPuzzleLeft>
        </div>
        <div className="col-md-3 col-sm-4">
          <LogicPuzzleSidebar>
            <LogicPuzzleTimer onTimeOver={handleTimeOver}/>
          </LogicPuzzleSidebar>
        </div>
      </LogicPuzzle>
    </div>,
    document.getElementById('answer-react')
);
