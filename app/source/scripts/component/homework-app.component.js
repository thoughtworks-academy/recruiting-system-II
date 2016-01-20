'use strict';

var React = require('react');

var HomeworkApp = React.createClass({

  render() {
    return this.props.children;
  }
});

module.exports = HomeworkApp;