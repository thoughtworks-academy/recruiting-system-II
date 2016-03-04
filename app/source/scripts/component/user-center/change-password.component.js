'use strict';

var React = require('react');
var validate = require('validate.js');
var constraint = require('../../../../mixin/password-constraint');
var getError = require('../../../../mixin/get-error');
var ChangePasswordActions = require('../../actions/user-center/change-password-actions');
var ChangePasswordStore = require('../../store/user-center/change-password-store');
var UserCenterStore = require('../../store/user-center/user-center-store');
var PasswordStore = require('../../store/reuse/password-store');
var Reflux = require('reflux');
var _  = require('lodash');

var ChangePassword = React.createClass({
  mixins: [Reflux.connect(ChangePasswordStore),Reflux.connect(UserCenterStore),Reflux.connect(PasswordStore)],

  getInitialState: function () {
    return {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      oldPasswordError: '',
      newPasswordError: '',
      confirmPasswordError: '',
      success: false,
      isRespond: false,
      currentState: 'userDetail'
    };
  },

  validate: function (evt) {
    var target = evt.target;
    var name = target.name;
    var value = target.value;
    var valObj = {};

    valObj[name] = value;
    var result = validate(valObj, constraint);
    var error = getError(result, name);
    var stateObj = {};

    stateObj[name + 'Error'] = error;
    this.setState(stateObj);
  },

  handleChange: function (evt) {
    var newState = evt.target.value;
    var stateName = evt.target.name;

    this.setState({[stateName]: newState});
  },

  checkInfo: function () {
    var oldPassword = {oldPassword: this.state.oldPassword};
    var result = validate(oldPassword, constraint);

    if(result === undefined && this.state.newPasswordError === '' && this.state.confirmPasswordError === '') {
      return true;
    }
    return false;
  },

  savePassword: function (evt) {
    evt.preventDefault();

    var passwordData = {
      oldPassword: this.state.oldPassword,
      password: this.state.newPassword,
      confirmPassword: this.state.confirmPassword
    };

    if (!this.checkInfo()) {
      return;
    }
    ChangePasswordActions.changePassword(passwordData);
  },

  render: function () {
    var classString = (this.state.currentState === 'password' ? '' : ' hide');

    return (
        <div className={'col-md-9 col-sm-9 col-xs-12' + classString}>
          <div className="content">
            <form className="form-horizontal form-top-height">
              <div className={this.state.success ? '' : 'hide'}>
                <div className={"success-prompt alert alert-success"}>
                  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
                  修改成功
                </div>
              </div>

              <div id="change-password">
                <label htmlFor="oldPassword" className="col-sm-4 col-md-4 control-label">旧密码</label>
                <div className={'form-group has-' + (this.state.oldPasswordError === '' ? '' : 'error')}>
                  <div className="col-sm-4 col-md-4">
                    <input type="password" className="form-control" aria-describedby="helpBlock2"
                           name="oldPassword" id="oldPassword" onChange={this.handleChange}
                           placeholder="请输入旧密码" onBlur={this.validate} value={this.state.oldPassword}/>
                  </div>
                  <div className={'error alert alert-danger' + (this.state.oldPasswordError === '' ? ' hide' : '')}
                       role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
                    {this.state.oldPasswordError}
                  </div>
                </div>

                {this.props.children}

                <div className="form-group">
                  <div className="col-sm-offset-4 col-sm-4 col-md-offset-4 col-md-4">
                    <button type="submit" className="btn btn-default" onClick={this.savePassword}
                            disabled={this.state.isRespond}>保存
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
    );
  }
});

module.exports = ChangePassword;
