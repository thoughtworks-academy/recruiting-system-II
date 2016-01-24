'use strict';

var React = require('react');


var LogicPuzzleLeft = React.createClass({

  handleAnswerChange: function(val) {
    this.props.onAnswerChange(val);
  },

  render: function () {
    return (
        <div id="logic-puzzle">
          {this.props.children}
        </div>
    );
  }
});

module.exports = LogicPuzzleLeft;
