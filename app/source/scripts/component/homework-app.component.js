'use strict';

var React = require('react');
var HomeworkAction = require('../actions/homework-actions');

var HomeworkApp = React.createClass({
  getInitialState: function() {
    HomeworkAction.changeOrderId(1);
    return {
      desc:''
    };
  },
  render() {

    return this.props.children;
  }
});

module.exports = HomeworkApp;