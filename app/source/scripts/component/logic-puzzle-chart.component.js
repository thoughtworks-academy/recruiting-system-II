'use strict';

var React = require('react');
var Reflux = require('reflux');
var LogicPuzzleStore = require('../store/logic-puzzle-store');

var LogicPuzzleChart = React.createClass({
  mixins: [Reflux.connect(LogicPuzzleStore)],

  getInitialState: function () {
    return {
      item: {
        chartPath: ''
      }
    };
  },

  render: function () {
    return (
        <div className="left-chart">
          <img src={this.state.item.chartPath} alt="逻辑题图片"/>
        </div>
    );
  }
});

module.exports = LogicPuzzleChart;
