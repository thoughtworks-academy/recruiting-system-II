'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var markdown = require('markdown').markdown;


var HomeworkIntroduction = React.createClass({
  getInitialState: function() {
    var content = markdown.toHTML('###题目说明');

    return {
      describe: content
    };
  },
  componentDidMount:function() {
  },

  render() {
    console.log(this.state.describe);
    return (
        <div>
          题目说明
        </div>
    );
  }
});

module.exports = HomeworkIntroduction;