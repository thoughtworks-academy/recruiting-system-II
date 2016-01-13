'use strict';

var React = require('react');
var UserInfo = require('./user-center.component');
var ChangePassword = require('./change-password.component');
var UserCenterSidebar = require('./user-center-sidebar.component');

var UserCenterApp = React.createClass({
  getInitialState:function() {
    return {
      currentState: 'userDetail'
    };
  },

  changeState:function(state) {
    this.setState({currentState: state});
  },

  render() {
    return (
        <div className="row">
          <UserCenterSidebar currentState={this.state.currentState} onChangeState={this.changeState}/>
          <UserInfo currentState={this.state.currentState}/>
          <ChangePassword currentState={this.state.currentState}/>
        </div>
    );
  }
});

module.exports = UserCenterApp;