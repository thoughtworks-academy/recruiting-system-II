var React = require('react');

var LogicPuzzleBoxes = require('./logic-puzzle-boxes.component');
var LogicPuzzleChart = require('./logic-puzzle-chart.component');
var LogicPuzzleDescription = require('./logic-puzzle-description.component');
var LogicPuzzleAnswerSubmit = require('./logic-puzzle-answer-submit.component');

var LogicPuzzleLeft = React.createClass({

  render: function () {
    return (
        <div id="logic-puzzle">
          <LogicPuzzleBoxes boxes={this.props.item.initializedBox}/>
          <LogicPuzzleChart chartPath={this.props.item.chartPath}/>
          <LogicPuzzleDescription description={this.props.item.descriptionZh}/>
          <LogicPuzzleAnswerSubmit />

        </div>
    )
  }
});

module.exports = LogicPuzzleLeft;
