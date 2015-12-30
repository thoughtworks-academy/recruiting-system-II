var React = require('react');

var LogicPuzzleActions = require('../actions/logic-puzzle-actions');

var LogicPuzzleSidebar = React.createClass({

  puzzle: {
    puzzleId: 0,
    userPuzzleIndex: 0,
    userAnswer: 0
  },

  previous: function () {
    this.puzzle.userAnswer = document.getElementById('result').value;
    //LogicPuzzleActions.saveUserAnswer(this.puzzle);
    LogicPuzzleActions.lastPuzzle();
  },

  next: function () {
    this.puzzle.userAnswer = document.getElementById('result').value;
    //LogicPuzzleActions.saveUserAnswer(this.puzzle);
    LogicPuzzleActions.nextPuzzle(this.props.itemsCount);
  },

  render: function () {
    return (

        <div className="sidebar">
          <div className="description">
            <h2>逻辑题</h2>

            <p>
              请仔细阅读内容，并在规定的时间段内答完题目
            </p>
          </div>

          <div className="tip">
            <p className="remain-time">
              您还有90分钟
            </p>

            <p className="finish-rate">
              当前第{this.props.orderId +1}题共{this.props.itemsCount}题
            </p>
          </div>

          <div className="select">
            <button type="button" className="btn btn-warning" name="button"
                    disabled={this.props.isFirstOne ? 'disabled' : ''} onClick={this.previous}>上一题
            </button>
            <button type="button" className="btn btn-warning" name="button"
                    disabled={this.props.isLastOne ? 'disabled' : ''} onClick={this.next}>下一题
            </button>
          </div>
          <hr/>
          <div className="confirm">
            <a href="javascript:void(0)" className="btn btn-lg btn-danger btn-block" data-toggle="modal"
               data-target="#submitModal">交卷</a>
          </div>

        </div>

    )
  }
});

module.exports = LogicPuzzleSidebar;
