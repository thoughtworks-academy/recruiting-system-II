'use strict';

var React = require('react');
var ProgrammeSidebar = require('./programme-sidebar.component');
var Programme = require('./programme.component');

var ProgrammeApp = React.createClass({
  getInitialState: function () {
    return {
      currentTopicNumber: 'one'
    };
  },

  changeState: function (state) {
    if (state !== this.state.currentTopicNumber) {
      this.setState({currentTopicNumber: state});
    }
  },

  render() {
    return (
        <div className="row">
          <ProgrammeSidebar currentTopicNumber={this.state.currentTopicNumber}
                            onChangeState={this.changeState}/>
          <Programme />
        </div>
    );
  }
});

module.exports = ProgrammeApp;