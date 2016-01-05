var React = global.React = require('react');
var ReactDom = require('react-dom');
var Input = require('react-bootstrap/lib/Input');
var UserDetailActions = require('../actions/user-detail-actions');
var UserDetailStore = require('../store/user-detail-store');
var Reflux = require('reflux');
var validate = require("validate.js");
var constraint = require('../../../mixin/user-detail-constraint');

function getError(validateInfo, field) {
  if (validateInfo && validateInfo[field] && validateInfo[field].length > 0) {
    return validateInfo[field][0];
  }
  return ""
}

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
      degree: '',
      schoolError: '',
      nameError: '',
      majorError: '',
      genderError: false
    }
  },

  componentDidMount: function () {
    UserDetailActions.loadUserDetail();
  },

  handleChange: function (evt) {
    var newState = evt.target.value;
    var stateName = evt.target.name;

    this.setState({[stateName]: newState});

  },
  genderChange: function (evt) {
    var newState = '';
    var choose = evt.target.name;

    if (choose === '男') {
      newState = '男';
    } else {
      newState = '女';
    }
    this.setState({gender: newState});
  },

  validate: function (event) {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    var valObj = {};

    valObj[name] = value;

    var result = validate(valObj, constraint);
    var error = getError(result, name);
    var stateObj = {};

    stateObj[name + 'Error'] = error;
    this.setState(stateObj);
  },

  genderValidate: function () {
    if(this.state.genderError === true) {
      this.setState({genderError: false})
    }
  },
  update: function (evt) {
    evt.preventDefault();

    if (this.state.gender === '') {
      this.setState({genderError: true})
    } else {
      this.setState({genderError: false});
    }

    var userData = {
      school: this.state.school,
      name: this.state.name,
      mobilePhone: this.state.mobilePhone,
      email: this.state.email,
      gender: this.state.gender,
      major: this.state.major,
      degree: this.state.degree
    };

    if (this.state.schoolError !== '' || this.state.nameError !== '' || this.state.majorError !== '') {
      return;
    }
    UserDetailActions.updateUserDetail(userData);
  },

  render: function () {

    return (
        <div id="account-info">
          <div className="form-group">
            <label htmlFor="inputSchool" className="col-sm-4 col-md-4 control-label">学校</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputSchool" placeholder="学校"
                     onChange={this.handleChange} name="school" value={this.state.school} onBlur={this.validate}/>
            </div>
            <div className={"error" + (this.state.schoolError === '' ? ' hide' : '')}>{this.state.schoolError}</div>
          </div>

          <div className="form-group">
            <label htmlFor="inputName" className="col-sm-4 col-md-4 control-label">姓名</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputName" placeholder="姓名"
                     onChange={this.handleChange} name="name" value={this.state.name} onBlur={this.validate}/>
            </div>
            <div className={"error" + (this.state.nameError === '' ? ' hide' : '')}>{this.state.nameError}</div>
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
            <div className="col-sm-4 col-md-4" onClick={this.genderValidate}>

              <input type="radio" name="男" className="gender" onChange={this.genderChange}
                     checked={this.state.gender === "男" ? "checked" : ""}/>男

              <input type="radio" name="女" className="gender" onChange={this.genderChange}
                     checked={this.state.gender === "女" ? "checked" : ""}/>女
            </div>
            <div className={"error" + (this.state.genderError === true ? '' : ' hide')}>请选择性别</div>
          </div>

          <div className="form-group">
            <label htmlFor="inputMajor" className="col-sm-4 col-md-4 control-label">专业</label>
            <div className="col-sm-4 col-md-4">
              <input type="text" className="form-control" id="inputMajor" placeholder="专业"
                     onChange={this.handleChange} name="major" value={this.state.major} onBlur={this.validate}/>
            </div>
            <div className={"error" + (this.state.majorError === '' ? ' hide' : '')}>{this.state.majorError}</div>

          </div>

          <div className="form-group">
            <label htmlFor="inputDegree" className="col-sm-4 col-md-4 control-label">学历学位</label>
            <div className="col-sm-4 col-md-4 degree">
              <Input type="select" placeholder="学历学位" name="degree" value={this.state.degree}
                     onChange={this.handleChange}>
                <option value="专科">专科及以下</option>
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