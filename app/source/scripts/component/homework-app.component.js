'use strict';

var React = require('react');
var HomeworkSidebar = require('./homework-sidebar.component');
var Homework = require('./homework.component');

var HomeworkApp = React.createClass({
  getInitialState: function () {
    return {
      currentTopicNumber: 1
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