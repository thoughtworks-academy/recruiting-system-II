var React = require('react');
var Reflux = require('reflux');

var LogicPuzzleStore = require('../store/logic-puzzle-store');
var LogicPuzzleActions = require('../actions/logic-puzzle-actions');

var LogicPuzzleLeft = require('./logic-puzzle-left.component');
var LogicPuzzleSidebar = require('./logic-puzzle-sidebar.component');

var LogicPuzzle = React.createClass({
  mixins: [Reflux.connect(LogicPuzzleStore)],

  getInitialState: function () {
    return {
      item: {
        initializedBox: [],
        chartPath: '',
        description: []
      }
    };
  },

  componentDidMount: function () {
    LogicPuzzleActions.loadItem();
  },

  handleAnswerChange: function (val) {
    LogicPuzzleActions.changeAnswer(val);
  },

  render: function () {
    if(this.state.remainTime <= 0){
      //TODO:调用交卷方法
    }

    return (

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9 col-sm-8">
              <LogicPuzzleLeft item={this.state.item}
                               userAnswer={this.state.userAnswer}
                               onAnswerChange={this.handleAnswerChange}
                               itemsCount={this.state.itemsCount}
                               orderId={this.state.orderId}
                               isExample={this.state.isExample}/>

            </div>

            <div className="col-md-3 col-sm-4">
              <LogicPuzzleSidebar orderId={this.state.orderId}
                                  itemsCount={this.state.itemsCount}/>
            </div>
          </div>
        </div>
    )
  }
});

module.exports = LogicPuzzle;
