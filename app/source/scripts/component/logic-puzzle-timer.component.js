'use strict';

var React = require('react');
var Reflux = require('reflux');
var TimerStore = require('../store/timer-store');
var LogicPuzzleActions = require('../actions/logic-puzzle-actions');
var Modal = require('react-bootstrap/lib/Modal');
var constant = require('../../../mixin/constant');

var LogicPuzzleTimer = React.createClass({
  mixins: [Reflux.connect(TimerStore)],

  componentDidMount: function () {
    LogicPuzzleActions.getRemainTime();
    this.countDown();
  },

  countDown: function(){
    setInterval(() => {
      if(this.state.remainTime){
        var remainTime = this.state.remainTime - 1;

        if(remainTime <= 0){
          LogicPuzzleActions.submitPaper();
          LogicPuzzleActions.timeOver();
        }

        this.setState({
          remainTime: remainTime
        });

        if(remainTime % (constant.time.SECONDS_PER_MINUTE * 2) === 1){
          LogicPuzzleActions.getRemainTime();
        }
      }
    }, constant.time.MILLISECOND_PER_SECONDS);
  },

  render: function () {

    var minutes = this.state.remainTime > 0 ? Math.floor(this.state.remainTime / constant.time.SECONDS_PER_MINUTE) : 0;
    var seconds = this.state.remainTime > 0 ? this.state.remainTime % constant.time.MINUTE_PER_HOUR : 0;

    return (
      <p className="remain-time">
        您还有 {minutes} 分钟 {seconds} 秒
      </p>
    );
  }
});

module.exports = LogicPuzzleTimer;
