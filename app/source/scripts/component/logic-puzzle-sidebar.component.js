'use strict';

var React = require('react');
var Reflux = require('reflux');
var LogicPuzzleStore = require('../store/logic-puzzle-store');
var LogicPuzzleActions = require('../actions/logic-puzzle-actions');
var LogicPuzzleTimer = require('./logic-puzzle-timer.component');
var Modal = require('react-bootstrap/lib/Modal');
var _newOrderId;
var constant = require('../../../mixin/constant');
var able = false;

var LogicPuzzleSidebar = React.createClass({
  mixins: [Reflux.connect(LogicPuzzleStore)],

  submitPaper: function () {
    LogicPuzzleActions.submitPaper();
  },

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

  render: function () {

    var isFirst = this.state.orderId === 0;
    var isLast = this.state.orderId === (this.state.itemsCount - 1);
    if(isLast){
      able=true;
    }
    return (

        <div className="sidebar">
          <div className="description">
            <h2>逻辑题</h2>

            <p>
              请仔细阅读内容，并在规定的时间段内答完题目
            </p>
          </div>

          <div className="tip">

            <LogicPuzzleTimer onTimeOver={this.props.onTimeOver}/>

            <p className="finish-rate">
              当前第{this.state.orderId + 1}题共{this.state.itemsCount}题
            </p>
          </div>

          <div className="select">
            <button type="button" className="btn btn-warning" name="button"
                    disabled={isFirst ? 'disabled' : ''} onClick={isFirst? '' : this.previous}>上一题
            </button>
            <button type="button" className="btn btn-warning" name="button"
                    disabled={isLast ? 'disabled' : ''} onClick={isLast ? '' : this.next}>下一题
            </button>
          </div>
          <hr/>
          <div className="confirm">
            <a href="#" className="btn btn-lg btn-danger btn-block" data-toggle="modal"
               data-target={able ? '#submitModal': ''} disabled={able ? '' : 'disabled'}>交卷</a>
          </div>
          <div className="hint">
            <span>{able ? '检查完毕后可以交卷': '只有在查看完所有题后才可以交卷'}</span>
          </div>

          <div className="modal fade bs-example-modal-sm" id="submitModal" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-sm" role="document" aria-hidden="true">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                      aria-hidden="true">&times;</span></button>
                  <h3 className="modal-title" id="submitModalLabel">注意!</h3>
                </div>
                <div className="modal-body">
                  <b>您确定要交卷么?一旦提交将无法继续修改!</b>

                  <div className="modal-footer">
                    <a className="btn btn-danger submit" onClick={this.submitPaper}>确认提交</a>
                    <a className="btn btn-default" data-dismiss="modal">关闭</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


    );
  }
});

module.exports = LogicPuzzleSidebar;
