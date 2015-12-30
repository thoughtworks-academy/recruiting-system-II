var React = global.React = require('react');
var ReactDom = require('react-dom');

var Account = React.createClass({
  render() {
    return (
        <div id="account-info">
          <div className="form-group">
            <label htmlFor="inputSchool" className="col-sm-4 col-md-4 control-label">学校:</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputSchool" placeholder="学校" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputName" className="col-sm-4 col-md-4 control-label">姓名:</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputName" placeholder="姓名" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputPhone" className="col-sm-4 col-md-4 control-label">手机号:</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputPhone" placeholder="手机号" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputEmail" className="col-sm-4 col-md-4 control-label">邮箱:</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputEmail" placeholder="邮箱" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputGender" className="col-sm-4 col-md-4 control-label">性别:</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputGender" placeholder="性别" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputMajor" className="col-sm-4 col-md-4 control-label">专业:</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputMajor" placeholder="专业" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputGrade" className="col-sm-4 col-md-4 control-label">年级:</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputGrade" placeholder="年级" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputBirth" className="col-sm-4 col-md-4 control-label">出生日期:</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputBirth" placeholder="出生日期" />
            </div>
          </div>
        </div>
    )
  }
});

module.exports = Account;