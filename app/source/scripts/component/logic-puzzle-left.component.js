var React = require('react');

var LogicPuzzleBoxes = require('./logic-puzzle-boxes.component');
var LogicPuzzleChart = require('./logic-puzzle-chart.component');
var LogicPuzzleDescription = require('./logic-puzzle-description.component');
var LogicPuzzleAnswerSubmit = require('./logic-puzzle-answer-submit.component');

var LogicPuzzleLeft = React.createClass({

  render: function () {
    return (
        <div id="logic-puzzle">
          <LogicPuzzleBoxes boxes={this.props.boxes}/>
          <LogicPuzzleChart chartPath={this.props.chartPath}/>
          <LogicPuzzleDescription description={this.props.description}/>
          <LogicPuzzleAnswerSubmit />

        </div>
    )
  }
});

module.exports = LogicPuzzleLeft;
