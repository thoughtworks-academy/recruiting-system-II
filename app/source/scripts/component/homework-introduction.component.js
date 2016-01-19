'use strict';

var React = require('react');
var markdown = require('markdown').markdown;
var HomeworkIntroductionStore = require('../store/homework-introduction-store');


var HomeworkIntroduction = React.createClass({
  mixins:[Reflux.connect(HomeworkIntroductionStore)],

  getInitialState: function() {
    var content = markdown.toHTML('###题目说明');

    return {
      describe: content
    };
  },

  componentDidMount:function() {
    document.getElementById('introduction').innerHTML = this.state.desc;
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