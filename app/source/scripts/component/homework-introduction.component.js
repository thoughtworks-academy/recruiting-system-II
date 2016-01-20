'use strict';

var Reflux = require('reflux');
var React = require('react');
var markdown = require('markdown').markdown;
var HomeworkIntroductionStore = require('../store/homework-introduction-store');


var HomeworkIntroduction = React.createClass({
  mixins:[Reflux.connect(HomeworkIntroductionStore)],

  getInitialState: function() {
    var content = markdown.toHTML(this.state.desc);
    return {
      desc: ''
    };
  },

  componentDidMount:function() {
    document.getElementById('introduction').innerHTML = this.state.describe;

  },

  render() {
    console.log(this);
    return (
        <div>
          <div id="introduction"></div>
          <div id="templateRepo"></div>
        </div>
    );
  }
});


module.exports = HomeworkIntroduction;