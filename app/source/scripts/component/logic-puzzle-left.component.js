var React = require('react');

var LogicPuzzleBoxes = require('./logic-puzzle-boxes.component');
//var LogicPuzzleExample = require('./logic-puzzle-example.component')
var LogicPuzzleChart = require('./logic-puzzle-chart.component');
var LogicPuzzleDescription = require('./logic-puzzle-description.component');
var LogicPuzzleAnswerSubmit = require('./logic-puzzle-answer-submit.component');

var LogicPuzzleLeft = React.createClass({

  handleAnswerChange: function(val) {
    this.props.onAnswerChange(val);
  },

  render: function () {
    return (
        <div id="logic-puzzle">
          <LogicPuzzleBoxes boxes={this.props.item.initializedBox}/>
          <LogicPuzzleChart chartPath={this.props.item.chartPath}/>
          <LogicPuzzleDescription description={this.props.item.description}/>
          <LogicPuzzleAnswerSubmit onAnswerChange={this.handleAnswerChange}
                                   userAnswer={this.props.userAnswer}
                                   itemsCount={this.props.itemsCount}
                                   orderId={this.props.orderId}/>
        </div>
    )
  }
});

module.exports = LogicPuzzleLeft;
