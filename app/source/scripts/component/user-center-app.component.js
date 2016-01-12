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

  infoStateChange:function() {
    this.setState({isChangePassword: false});
  },

  passwordStateChange:function() {
    this.setState({isChangePassword: true});
  },

  render() {
    return (
        <div className="row">
          <UserCenterSidebar isChangePassword={this.state.isChangePassword}
                             onPasswordStateChange={this.passwordStateChange} onInfoStateChange={this.infoStateChange}/>
          <UserInfo isChangePassword={this.state.isChangePassword}/>
          <ChangePassword isChangePassword={this.state.isChangePassword}/>
        </div>
    );
  }
});

module.exports = UserCenterApp;