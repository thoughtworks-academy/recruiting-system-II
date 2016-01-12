'use strict';

var React = require('react');
var validate = require('validate.js');
var constraint = require('../../../mixin/user-detail-constraint');

function getError(validateInfo, field) {
  if (validateInfo && validateInfo[field] && validateInfo[field].length > 0) {
    return validateInfo[field][0];
  }
  return "";
}

var ChangePassword = React.createClass({
  getInitialState: function() {
    return {
      oldPasswordError: '',
      newPasswordError: '',
      confirmPasswordError: ''
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

  render: function () {
    var classString = (this.props.isChangePassword ? '' : ' hide');

    return (
        <div className={"col-md-9 col-sm-9 col-xs-12" + classString}>
          <div className="content">
            <form className="form-horizontal form-top-height">
              <div id="change-password">

                <label htmlFor="oldPassword" className="col-sm-4 col-md-4 control-label">旧密码</label>
                <div className={"form-group has-" + (this.state.oldPasswordError === '' ? '' : 'error')}>
                  <div className="col-sm-4 col-md-4">
                    <input type="text" className="form-control" aria-describedby="helpBlock2"
                           name="oldPassword" id="oldPassword"
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
                    <input type="text" className="form-control" aria-describedby="helpBlock2"
                           name="newPassword" id="newPassword"
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
                    <input type="text" className="form-control"  aria-describedby="helpBlock2"
                           name="confirmPassword" id="confirmPassword"
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
                    <button type="submit" className="btn btn-default">保存</button>
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
