'use strict';

var React = global.React = require('react');
var ReactDOM = require('react-dom');
var validate = require('validate.js');
var passwordResetActions = require('../../actions/password-retrieve/password-reset-actions');
var passwordResetStore = require('../../store/password-retrieve/password-reset-store');
var Reflux = require('reflux');
var PasswordStore = require('../../store/reuse/password-store');
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
  mixins: [Reflux.connect(passwordResetStore), Reflux.connect(PasswordStore)],

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

  reset: function () {
    if (this.state.newPasswordError !== '' || this.state.confirmPasswordError !== '') {
      return ;
    } else {
      this.setState({
        clickable: true
      });
      var newPassword = this.state.newPassword;
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
                {this.props.children}
              </div>
              <button type="button" id="reset-btn" className="btn btn-lg btn-block btn-primary col-md-offset-4"
                      onClick={this.reset}
                      disabled={this.state.clickable}>确认
                <i className={'fa fa-spinner fa-spin loading' + (this.state.clickable ? '' : ' hide')}/>
              </button>
            </form>
          </div>
          <div id="message" className={messageClassName}>
            <p>您的密码已经成功重置!再别忘了!</p>
            <p><strong>你可长点儿心吧!</strong></p>
            <a href="register.html">回去登陆</a>
          </div>
        </div>
    );
  }
});

module.exports = passwordResetForm;