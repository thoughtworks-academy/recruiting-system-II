var React = require('react');
var Reflux = require('reflux');
var LogicPuzzleStore = require('../store/logic-puzzle-store');
var LogicPuzzleActions = require('../actions/logic-puzzle-actions');
var _newOrderId;

var LogicPuzzleSidebar = React.createClass({
  mixins: [Reflux.connect(LogicPuzzleStore)],


  previous: function () {
    if(this.state.orderId > 0 ){
      _newOrderId = this.state.orderId - 1;
    }
    LogicPuzzleActions.submitAnswer(_newOrderId);
  },

  next: function () {
    if(this.state.orderId < this.state.itemsCount - 1 ){
      _newOrderId = this.state.orderId + 1;
    }
    LogicPuzzleActions.submitAnswer(_newOrderId);
  },
  //
  //componentDidMount: function () {
  //},

  render: function () {

    var isFirst = this.state.orderId === 0;
    var isLast = this.state.orderId === (this.state.itemsCount - 1);

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
              您还有 {this.state.minutes} 分钟 {this.state.seconds} 秒
            </p>

            <p className="finish-rate">
              当前第{this.state.orderId + 1}题共{this.state.itemsCount}题
            </p>
          </div>

          <div className="select">
            <button type="button" className="btn btn-warning" name="button"
                    disabled={isFirst ? 'disabled' : ''} onClick={this.previous}>上一题
            </button>
            <button type="button" className="btn btn-warning" name="button"
                    disabled={isLast ? 'disabled' : ''} onClick={this.next}>下一题
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
