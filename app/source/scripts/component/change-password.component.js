'use strict';

var React = require('react');

var ChangePassword = React.createClass({
  render: function () {
    var classString = (this.props.isChangePassword ? '' : ' hide');

    return (
        <div className={"col-md-9 col-sm-9 col-xs-12" + classString}>
          <div className="content">
            <form className="form-horizontal form-top-height">
              <div id="change-password">
                <label htmlFor="inputSchool" className="col-sm-4 col-md-4 control-label">旧密码</label>
                <div className={"form-group"}>
                  <div className="col-sm-4 col-md-4">
                    <input type="text" className="form-control" id="inputSchool" aria-describedby="helpBlock2"
                           placeholder="请输入旧密码"/>
                  </div>
                </div>

                <label htmlFor="inputSchool" className="col-sm-4 col-md-4 control-label">新密码</label>
                <div className={"form-group"}>
                  <div className="col-sm-4 col-md-4">
                    <input type="text" className="form-control" id="inputSchool" aria-describedby="helpBlock2"
                           placeholder="请输入新密码"/>
                  </div>
                </div>

                <label htmlFor="inputSchool" className="col-sm-4 col-md-4 control-label">确认密码</label>
                <div className={"form-group"}>
                  <div className="col-sm-4 col-md-4">
                    <input type="text" className="form-control" id="inputSchool" aria-describedby="helpBlock2"
                           placeholder="请再次确认新密码"/>
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
    )
  }
});

module.exports = ChangePassword;
