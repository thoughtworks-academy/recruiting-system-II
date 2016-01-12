'use strict';

var React = require('react');
var ReactDom = require('react-dom');
var validate = require('validate.js');
var constraint = require('../../../mixin/password-constraint');
var getError = require('../../../mixin/get-error');
var UserDetailActions = require('../actions/user-detail-actions');
var UserDetailStore = require('../store/user-detail-store');
var Reflux = require('reflux');


var ChangePassword = React.createClass({
  mixins: [Reflux.connect(UserDetailStore)],

  getInitialState: function() {
    return {
      oldPasswordError: '',
      newPasswordError: '',
      confirmPasswordError: '',
      success: false
    };
  },

  validate: function(evt) {
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

  checkInfo: function () {
    var oldPassword = ReactDom.findDOMNode(this.refs.oldPassword);
    var newPassword = ReactDom.findDOMNode(this.refs.newPassword);
    var confirmPassword = ReactDom.findDOMNode(this.refs.confirmPassword);
    var passwordInfo = [];

    passwordInfo.push(oldPassword, newPassword, confirmPassword);

    var pass = false;
    var stateObj = {};

    passwordInfo.forEach((item) => {
      var valObj = {};
      var value = item.value;
      var name = item.name;

      valObj[name] = value;
      var result = validate(valObj, constraint);
      var error = getError(result, name);

      if (error !== '') {
        pass = true;
      }
      stateObj[name + 'Error'] = error;
      this.setState(stateObj);
    });
    return pass;
  },

  savePassword:function(evt) {
    evt.preventDefault();

    var passwordData = {
      oldPassword:ReactDom.findDOMNode(this.refs.oldPassword).value,
      password:ReactDom.findDOMNode(this.refs.newPassword).value,
      confirmPassword:ReactDom.findDOMNode(this.refs.confirmPassword).value
    };

    if(this.checkInfo()) {
      return ;
    }else if(passwordData.password !== passwordData.confirmPassword) {
      return ;
    }

    UserDetailActions.changePassword(passwordData);
  },

  render: function () {
    var classString = (this.props.isChangePassword ? '' : ' hide');

    return (
        <div className={"col-md-9 col-sm-9 col-xs-12" + classString}>
          <div className="content">
            <div className={"success-prompt" + (this.state.success ? '' : ' hide')}>修改成功</div>
            <form className="form-horizontal form-top-height">
              <div id="change-password">
                <label htmlFor="oldPassword" className="col-sm-4 col-md-4 control-label">旧密码</label>
                <div className={"form-group has-" + (this.state.oldPasswordError === '' ? '' : 'error')}>
                  <div className="col-sm-4 col-md-4">
                    <input type="text" className="form-control" aria-describedby="helpBlock2"
                           name="oldPassword" id="oldPassword" ref="oldPassword"
                           placeholder="请输入旧密码"  onBlur={this.validate}/>
                  </div>
                  <div className={"error alert alert-danger" + (this.state.oldPasswordError === '' ? ' hide' : '')}
                       role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    {this.state.oldPasswordError}
                  </div>
                </div>

                <label htmlFor="newPassword" className="col-sm-4 col-md-4 control-label">新密码</label>
                <div className={"form-group has-" + (this.state.newPasswordError === '' ? '' : 'error')}>
                  <div className="col-sm-4 col-md-4">
                    <input type="password" className="form-control" aria-describedby="helpBlock2"
                           name="newPassword" id="newPassword" ref="newPassword"
                           placeholder="请输入新密码" onBlur={this.validate}/>
                  </div>
                  <div className={"error alert alert-danger" + (this.state.newPasswordError === '' ? ' hide' : '')}
                       role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    {this.state.newPasswordError}
                  </div>
                </div>

                <label htmlFor="confirmPassword" className="col-sm-4 col-md-4 control-label">确认密码</label>
                <div className={"form-group has-" + (this.state.confirmPasswordError === '' ? '' : 'error')}>
                  <div className="col-sm-4 col-md-4">
                    <input type="password" className="form-control"  aria-describedby="helpBlock2"
                           name="confirmPassword" id="confirmPassword" ref="confirmPassword"
                           placeholder="请再次确认新密码" onBlur={this.validate}/>
                  </div>
                  <div className={"error alert alert-danger" + (this.state.confirmPasswordError === '' ? ' hide' : '')}
                       role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    {this.state.confirmPasswordError}
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-offset-4 col-sm-4 col-md-offset-4 col-md-4">
                    <button type="submit" className="btn btn-default" onClick={this.savePassword}>保存</button>
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
