var React = global.React = require('react');
var ReactDom = require('react-dom');
var Input = require('react-bootstrap/lib/Input');
var UserDetailActions = require('../actions/user-detail-actions');
var UserDetailStore = require('../store/user-detail-store');
var Reflux = require('reflux');

var UserDetail = React.createClass({
  mixins: [Reflux.connect(UserDetailStore)],

  getInitialState: function () {
    return {
      school: '',
      name: '',
      mobilePhone: '',
      email: '',
      gender: '',
      major: '',
      degree: ''
    }
  },

  componentDidMount: function () {
    UserDetailActions.loadUserDetail();
  },

  render: function () {

    return (
        <div id="account-info">
          <div className="form-group">
            <label htmlFor="inputSchool" className="col-sm-4 col-md-4 control-label">学校</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputSchool" placeholder="学校"
                     onChange={this.handleChange} ref="school" value={this.state.school}/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputName" className="col-sm-4 col-md-4 control-label">姓名</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputName" placeholder="姓名"
                     onChange={this.handleChange} ref="name" value={this.state.name}/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputMobilePhone" className="col-sm-4 col-md-4 control-label">手机</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputMobilePhone" placeholder="手机"
                     disabled="disabled" value={this.state.mobilePhone}/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputEmail" className="col-sm-4 col-md-4 control-label">邮箱</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputEmail" placeholder="邮箱" disabled="disabled"
                     value={this.state.email}/>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputGender" className="col-sm-4 col-md-4 control-label">性别</label>
            <div className="col-sm-4 col-md-4">

              <input type="radio" name="options" className="gender"
                     checked={this.state.gender === "男" ? "checked" : ""}/>男

              <input type="radio" name="options" className="gender"
                     checked={this.state.gender === "女" ? "checked" : ""}/>女
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputMajor" className="col-sm-4 col-md-4 control-label">专业</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputMajor" placeholder="专业"
                     onChange={this.handleChange} ref="major" value={this.state.major}/>
            </div>
            <div></div>
          </div>

          <div className="form-group">
            <label htmlFor="inputDegree" className="col-sm-4 col-md-4 control-label">学历学位</label>
            <div className="col-sm-4 col-md-4 degree">
              <Input type="select" placeholder="学历学位" ref="degree" value={this.state.degree}>
                <option value="本科">本科</option>
                <option value="硕士">硕士</option>
                <option value="博士">博士</option>
              </Input>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-4 col-sm-4 col-md-offset-4 col-md-4">
              <button type="submit" className="btn btn-default" onClick={this.update}>保存</button>
            </div>
          </div>
        </div>
    )
  }
});

module.exports = UserDetail;