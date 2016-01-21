'use strict';

var React = require('react');
var HomeworkAction = require('../actions/homework-actions');

var HomeworkApp = React.createClass({
  getInitialState: function() {
    HomeworkAction.changeOrderId(this.props.homeworkNumber);
    return {
      desc:''
    };
  },
  render() {

    return this.props.children;
  }
});

module.exports = HomeworkApp;