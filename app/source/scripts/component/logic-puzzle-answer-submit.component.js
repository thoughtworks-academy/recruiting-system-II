var React = require('react');
var LogicPuzzleActions = require('../actions/logic-puzzle-actions');

var LogicPuzzleAnswerSubmit = React.createClass({

  submitAnswer: function() {
    LogicPuzzleActions.submitAnswer();
  },


  render: function () {
    return (
        <div className="answer-submit">
          <div className="row">
            <div className="col-md-4 col-sm-4 col-xs-4 result-text">
              <label htmlFor="result">结果为:</label>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4">
              <input type="text" className="form-control" id="result"/>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4">
              <button type="text" className="btn btn-danger" onClick={this.submitAnswer}>提交</button>
            </div>
          </div>
        </div>
    )
  }
});

module.exports = LogicPuzzleAnswerSubmit;
