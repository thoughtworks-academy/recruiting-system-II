'use strict';

var React = require('react');
var HomeworkSidebar = require('./homework-sidebar.component');
var Homework = require('./homework.component');

var HomeworkApp = React.createClass({
  getInitialState: function () {
    var topicNumber;
    var getNumber = location.href.split('#');

    if(getNumber.length === 1) {
      topicNumber = 1;
    }else {
      topicNumber = parseInt(getNumber[1]);
    }
    return {
      currentTopicNumber: topicNumber
    };
  },

  changeTopicNumber: function (state) {
    if (state !== this.state.currentTopicNumber) {
      this.setState({currentTopicNumber: state});
    }
  },

  render() {
    return (
        <div className="row">
          <HomeworkSidebar currentTopicNumber={this.state.currentTopicNumber}
                            onChangeState={this.changeTopicNumber}/>
          <Homework />
        </div>
    );
  }
});

module.exports = HomeworkApp;