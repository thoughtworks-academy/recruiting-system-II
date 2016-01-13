'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var RegisterForm = require('./register-form.component');
var LoginForm = require('./login-form.component');
var LoginInfo = require('./login-info.component');
var RegisterAgreement = require('./register-agreement.component');

var RegisterApp = React.createClass({

  getInitialState: function () {
    return {
      isLoginState: false
    };
  },
  stateChange: function () {
    var newState = !this.state.isLoginState;
    this.setState({isLoginState: newState});
  },

  render() {
    return (
        <div className="row">
          <RegisterForm isLoginState={this.state.isLoginState}/>
          <LoginForm isLoginState={this.state.isLoginState}/>
          <LoginInfo isLoginState={this.state.isLoginState} onStateChange={this.stateChange}/>
          <RegisterAgreement />
        </div>
    );
  }
});

module.exports = RegisterApp;
