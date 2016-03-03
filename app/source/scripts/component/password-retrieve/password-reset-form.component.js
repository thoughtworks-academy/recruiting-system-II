'use strict';

var React = global.React = require('react');
var ReactDOM = require('react-dom');
var validate = require('validate.js');
var passwordResetActions = require('../../actions/password-retrieve/password-reset-actions');
var passwordResetStore = require('../../store/password-retrieve/password-reset-store');
var Reflux = require('reflux');
var constraint = require('../../../../mixin/password-retrieve-constraint');
var page = require('page');
var constant = require('../../../../mixin/constant');

function getError(validateInfo, field) {
  if (validateInfo && validateInfo[field] && validateInfo[field].length > 0) {
    return validateInfo[field][0];
  }
  return '';
}

var passwordResetForm = React.createClass({
  mixins: [Reflux.connect(passwordResetStore)],

  getInitialState: function () {
    return {
      showMessage: false,
      resetFailed: '',
      newPasswordError: '',
      confirmPasswordError: '',
      clickable: false,
      newPassword: '',
      confirmPassword: ''
    };
  },

  handleChange: function (event) {
    var value = event.target.value;
    var name = event.target.name;
    passwordResetActions.changeValue(name, value);
  },

  validate: function (event) {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    var valObj = {};
    var result;
    var error;
    var stateObj = {};
    if(name === 'confirmPassword'){
      valObj.newPassword = this.state.newPassword;
    }
    valObj[name] = value;
    result = validate(valObj, constraint);
    error = getError(result, name);
    stateObj[name + 'Error'] = error;
    this.setState(stateObj);
  },

  reset: function () {
    if (!this.state.newPassword || !this.state.confirmPassword || this.state.newPasswordError || this.state.confirmPasswordError) {

      var valObj = {};
      var stateObj = {};

      valObj.newPassword = ReactDOM.findDOMNode(this.refs.newPassword).value;
      valObj.confirmPassword = ReactDOM.findDOMNode(this.refs.confirmPassword).value;
      stateObj.newPasswordError = getError(validate(valObj, constraint), 'newPassword');
      stateObj.confirmPasswordError = getError(validate(valObj, constraint), 'confirmPassword');

      this.setState(stateObj);

    } else {

      this.setState({
        clickable: true
      });

      var newPassword = ReactDOM.findDOMNode(this.refs.newPassword).value;
      var currentUrl = window.location.href;
      var token = currentUrl.split('=')[1];

      passwordResetActions.reset(newPassword,token);
    }
  },

  render: function () {

    var retrieveClassName = 'password-reset-form-container ' + (this.state.showMessage ? 'hide' : '');
    var messageClassName = 'message-container ' + (this.state.showMessage ? '' : 'hide');

    return (
        <div>
          <div id="retrieve" className={retrieveClassName}>
            <h4 className="welcome">重置密码</h4>
            <div className={'lose' + (this.state.resetFailed === 'wrongUrl' ? '' : ' hide')} name="resetFailed">
              你的链接有误!
            </div>
            <div className={'lose' + (this.state.resetFailed === 'timeOut' ? '' : ' hide')} name="resetFailed">
              你的链接已过期!
            </div>
            <form action="">
              <div className="form-group">
                <input className="form-control" type="password" placeholder="请输入新密码" name="newPassword"
                       onBlur={this.validate}
                       ref="newPassword" autoComplete="off" onChange={this.handleChange} value={this.state.newPassword}/>
                <div
                    className={'lose' + (this.state.newPasswordError === '' ? ' hide' : '')}>{this.state.newPasswordError}
                </div>
                <input id="confirmPassword" className="form-control" type="password" placeholder="请确认新密码" name="confirmPassword"
                       onBlur={this.validate}
                       ref="confirmPassword" autoComplete="off" onChange={this.handleChange} value={this.state.confirmPassword}/>
                <div
                    className={'lose' + (this.state.confirmPasswordError === '' ? ' hide' : '')}>{this.state.confirmPasswordError}
                </div>
              </div>
              <button type="button" id="reset-btn" className="btn btn-lg btn-block btn-primary col-md-offset-4"
                      onClick={this.reset}
                      disabled={this.state.clickable}>确认
                <i className={'fa fa-spinner fa-spin loading' + (this.state.clickable ? '' : ' hide')}/>
              </button>
            </form>
          </div>
          <div id="message" className={messageClassName}>
            <p>您的密码已经成功重置!再别忘了!<strong>你可长点儿心吧!</strong></p>
          </div>
        </div>
    );
  }
});

module.exports = passwordResetForm;