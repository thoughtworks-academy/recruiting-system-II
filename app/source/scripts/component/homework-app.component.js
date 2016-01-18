'use strict';

var React = require('react');
var HomeworkSidebar = require('./homework-sidebar.component');
var Homework = require('./homework.component');

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

  changeHomeworkNumber: function (state) {
    if (state !== this.state.currentHomeworkNumber) {
      this.setState({currentHomeworkNumber: state});
    }
  },

  render() {
    return (
        <div className="row">
          <HomeworkSidebar currentHomeworkNumber={this.state.currentHomeworkNumber}
                            onChangeNumber={this.changeHomeworkNumber}/>
          <Homework />
        </div>
    );
  }
});

module.exports = HomeworkApp;