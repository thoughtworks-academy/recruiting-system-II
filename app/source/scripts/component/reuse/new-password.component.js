'use strict';

var React = require('react');
var validate = require('validate.js');
var Reflux = require('reflux');
var getError = require('../../../../mixin/get-error');
var constraint = require('../../../../mixin/confirm-password-constraint');
var PasswordActions = require('../../actions/reuse/password-actions');
var PasswordStore = require('../../store/reuse/password-store');
var ChangePasswordStore = require('../../store/user-center/change-password-store');
var UserCenterStore = require('../../store/user-center/user-center-store');

var NewPassword = React.createClass({
  mixins: [Reflux.connect(PasswordStore), Reflux.connect(ChangePasswordStore), Reflux.connect(UserCenterStore)],

  getInitialState: function () {
    return {
      newPassword: '',
      newPasswordError: '',
      confirmPassword: '',
      confirmPasswordError: ''
    };
  },

  validate: function (evt) {
    var target = evt.target;
    var name = target.name;
    var valObj = {
      newPassword: this.state.newPassword,
      confirmPassword: this.state.confirmPassword
    };
    var result = validate(valObj, constraint);
    var error = getError(result, name);
    var stateObj = {};

    stateObj[name + 'Error'] = error;
    this.setState(stateObj);

    PasswordActions.getPasswordError(stateObj);

  },

  handleChange: function (evt) {
    var newState = evt.target.value;
    var stateName = evt.target.name;

    this.setState({[stateName]: newState});

    PasswordActions.changeNewPassword({[stateName]: newState});
  },

  render: function () {
    return (
        <div className="new-password ">
          <div className="col-sm-12 col-md-12">
            <label htmlFor="newPassword" className="col-sm-3 col-md-3 control-label">新密码</label>
            <div className={'form-group col-sm-6 col-md-6 has-' + (this.state.newPasswordError === '' ? '' : 'error')}>
              <input type="password" className="form-control" aria-describedby="helpBlock2"
                     name="newPassword" id="newPassword"
                     placeholder="请输入新密码" onBlur={this.validate}
                     onChange={this.handleChange} value={this.state.newPassword}/>
            </div>
            <span
                className={'col-sm-3 col-md-3 error alert alert-danger' + (this.state.newPasswordError === '' ? ' hide' : '')}
                aria-hidden="true" role="alert">
                  <i className="glyphicon glyphicon-exclamation-sign"/>
              {this.state.newPasswordError}
            </span>
          </div>
          <div className="col-sm-12 col-md-12">
            <label htmlFor="confirmPassword" className="col-sm-3 col-md-3 control-label">确认密码</label>
            <div className={'form-group col-sm-6 col-md-6 has-' + (this.state.confirmPasswordError === '' ? '' : 'error')}>
              <input type="password" className="form-control" aria-describedby="helpBlock2"
                     name="confirmPassword" id="confirmPassword"
                     placeholder="请再次确认新密码" onBlur={this.validate}
                     onChange={this.handleChange} value={this.state.confirmPassword}/>
            </div>
          <span
              className={'col-sm-3 col-md-3 error alert alert-danger' + (this.state.confirmPasswordError === '' ? ' hide' : '')}
              aria-hidden="true" role="alert">
            <i className="glyphicon glyphicon-exclamation-sign"/>
            {this.state.confirmPasswordError}
          </span>
          </div>

        </div>
    );
  }
});

module.exports = NewPassword;
