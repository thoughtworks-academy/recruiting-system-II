'use strict';

var React = require('react');
var UserInfo = require('./user-center.component');
var ChangePassword = require('./change-password.component');
var UserCenterSidebar = require('./user-center-sidebar.component');

var UserCenterApp = React.createClass({
  getInitialState:function() {
    return {
      isChangePassword: false
    };
  },

  stateChange:function() {
    var newState = !this.state.isChangePassword;

    this.setState({isChangePassword: newState});
  },

  render() {
    return (
        <div className="row">
          <UserCenterSidebar isChangePassword={this.state.isChangePassword} onStateChange={this.stateChange}/>
          <UserInfo isChangePassword={this.state.isChangePassword}/>
          <ChangePassword isChangePassword={this.state.isChangePassword}/>
        </div>
    );
  }
});

module.exports = UserCenterApp;