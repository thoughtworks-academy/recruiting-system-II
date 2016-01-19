'use strict';

var React = require('react');
var HomeworkAction = require('../actions/homework-actions');

var HomeworkApp = React.createClass({
  getInitialState: function () {
    var homeworkNumber;
    var getNumber = location.hash.substr(1);

    if(getNumber === '') {
      homeworkNumber = 1;
    }else {
      homeworkNumber = parseInt(getNumber);
    }
    return {
      currentHomeworkNumber: homeworkNumber
    };
  },

  changeHomeworkNumber: function (orderId) {
    if (orderId !== this.state.currentHomeworkNumber) {
      this.setState({currentHomeworkNumber: orderId});
      history.pushState(null, '', '#' + orderId);
    }
  },

  render() {
    return this.props.children;
  }
});

module.exports = HomeworkApp;