'use strict';

var React = require('react');
var markdown = require('markdown').markdown;


var HomeworkIntroduction = React.createClass({
  getInitialState: function() {
    var content = markdown.toHTML('###题目说明');

    return {
      describe: content
    };
  },

  componentDidMount:function() {
    document.getElementById('introduction').innerHTML = this.state.describe;
  },

  render() {
    return (
        <div id="introduction">
          题目说明
        </div>
    );
  }
});

module.exports = HomeworkIntroduction;