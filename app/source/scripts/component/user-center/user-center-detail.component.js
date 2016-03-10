'use strict';

var React = global.React = require('react');
var Input = require('react-bootstrap/lib/Input');
var UserCenterActions = require('../../actions/user-center/user-center-actions');
var UserCenterStore = require('../../store/user-center/user-center-store');
var Reflux = require('reflux');
var validate = require('validate.js');
var constraint = require('../../../../mixin/user-detail-constraint');
var getError = require('../../../../mixin/get-error');
var registerConstraint = require('../../../../mixin/register-constraint');
var RegisterActions = require('../../actions/register-page/register-actions');
var _ = require('lodash');


var UserDetail = React.createClass({
  mixins: [Reflux.connect(UserCenterStore)],

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
      degreeError: '',
      mobilePhoneError: '',
      emailError:'',
      currentState: 'userDetail',
      birthday: '',
      isThirdParty: false
    };
  },

  componentDidMount: function () {
    UserCenterActions.loadUserDetail();
  },

  handleChange: function (evt) {
    var newState = evt.target.value;
    var stateName = evt.target.name;

    this.setState({[stateName]: newState});
  },

  validate: function (event) {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    var valObj = {};

    valObj[name] = value;
    var result = validate(valObj, constraint);
    var extraResult = validate(valObj, registerConstraint);

    result = _.assign(result, extraResult);
    var error = getError(result, name);
    var stateObj = {};

    stateObj[name + 'Error'] = error;
    this.setState(stateObj);
  },

  checkInfo: function () {
    var school = {school: this.state.school};
    var name = {name: this.state.name};
    var major = {major: this.state.major};
    var degree = {degree: this.state.degree};
    var birthday = {birthday: this.state.birthday};
    var mobilePhone = {mobilePhone: this.state.mobilePhone};
    var email= {email: this.state.email};

    var userInfo = [];

    userInfo.push(school, name, major, degree, birthday, mobilePhone, email);
    var pass = false;
    var stateObj = {};

    userInfo.forEach((item) => {
      var result = validate(item, constraint);
      var extraResult = validate(item, registerConstraint);
      result = _.assign(result, extraResult);

      var error = getError(result, Object.keys(item));

      if (error !== '') {
        pass = true;
      }
      stateObj[Object.keys(item) + 'Error'] = error;
      this.setState(stateObj);
    });
    return pass;
  },

  update: function (evt) {
    evt.preventDefault();
    UserCenterActions.checkBirthday(this.state.birthday);
    UserCenterActions.checkGender(this.state.gender);

    var userData = {
      school: this.state.school,
      name: this.state.name,
      gender: this.state.gender,
      major: this.state.major,
      degree: this.state.degree,
      birthday: this.state.birthday
    };
    var extraData = {
      mobilePhone: this.state.mobilePhone,
      email: this.state.email
    };

    if (this.checkInfo()) {
      return;
    } else if (this.state.gender === '') {
      return;
    }
    if(this.state.isThirdParty === false) {
      UserCenterActions.updateUserDetail(userData);
    }else {
      RegisterActions.thirdPartyRegister(userData, extraData);
    }
  },

  render: function () {
    var classString = (this.state.currentState === 'userDetail' ? '' : '  hide');

    return (
        <div className={'col-md-9 col-sm-9 col-xs-12' + classString}>
          <div className='content'>
            <form className='form-horizontal form-top-height'>
              <div id='account-info'>
                <label htmlFor='inputSchool' className='col-sm-4 col-md-4 control-label'>学校</label>
                <div className={'form-group has-' + (this.state.schoolError === '' ? '' : 'error')}>
                  <div className='col-sm-4 col-md-4'>
                    <input type='text' className='form-control' id='inputSchool' aria-describedby='helpBlock2'
                           placeholder='学校'
                           onChange={this.handleChange} ref='school' name='school' value={this.state.school}
                           onBlur={this.validate}/>
                  </div>
                  <div className={'error alert alert-danger' + (this.state.schoolError === '' ? ' hide' : '')}
                       role='alert'>
                    <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
                    {this.state.schoolError}
                  </div>
                </div>

                <label htmlFor='inputName' className='col-sm-4 col-md-4 control-label'>姓名</label>
                <div className={'form-group has-' + (this.state.nameError === '' ? '' : 'error')}>
                  <div className='col-sm-4 col-md-4'>
                    <input type='text' className='form-control' id='inputName' aria-describedby='helpBlock2'
                           placeholder='姓名'
                           onChange={this.handleChange} name='name' ref='name' value={this.state.name}
                           onBlur={this.validate}/>
                  </div>
                  <div className={'error alert alert-danger' + (this.state.nameError === '' ? ' hide' : '')}
                       role='alert'>
                    <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
                    {this.state.nameError}
                  </div>
                </div>

                <label htmlFor='inputMobilePhone' className='col-sm-4 col-md-4 control-label'>手机</label>
                <div className={'form-group has-' + (this.state.mobilePhoneError === '' ? '' : 'error')}>
                <div className='col-sm-4 col-md-4'>
                    <input type='text' className='form-control' id='inputMobilePhone' placeholder='手机'
                           disabled={this.state.isThirdParty === true ? false : true} onBlur={this.validate}
                           name="mobilePhone" value={this.state.mobilePhone} onChange={this.handleChange}/>
                  </div>
                  <div className={'error alert alert-danger' + (this.state.mobilePhoneError === '' ? ' hide' : '')}
                       role='alert'>
                    <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
                    {this.state.mobilePhoneError}
                  </div>
                </div>

                <label htmlFor='inputEmail' className='col-sm-4 col-md-4 control-label'>邮箱</label>
                <div className={'form-group has-' + (this.state.emailError === '' ? '' : 'error')}>
                <div className='col-sm-4 col-md-4'>
                    <input type='text' className='form-control' id='inputEmail' placeholder='邮箱'
                           disabled={this.state.isThirdParty === true ? false : true} onBlur={this.validate}
                           value={this.state.email} name="email" onChange={this.handleChange}/>
                  </div>
                  <div className={'error alert alert-danger' + (this.state.emailError === '' ? ' hide' : '')}
                       role='alert'>
                    <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
                    {this.state.emailError}
                  </div>
                </div>

                <label htmlFor='inputGender' className='col-sm-4 col-md-4 control-label'>性别</label>
                <div className='form-group'>
                  {this.props.children[0]}
                </div>

                <label htmlFor='inputBirthday' className='col-sm-4 col-md-4 control-label'>生日</label>
                <div className='form-group'>
                  {this.props.children[1]}
                </div>

                <label htmlFor='inputMajor' className='col-sm-4 col-md-4 control-label'>专业</label>
                <div className={'form-group has-' + (this.state.majorError === '' ? '' : 'error')}>
                  <div className='col-sm-4 col-md-4'>
                    <input type='text' className='form-control' id='inputMajor' aria-describedby='helpBlock2'
                           placeholder='专业'
                           onChange={this.handleChange} name='major' ref='major' value={this.state.major}
                           onBlur={this.validate}/>
                  </div>
                  <div className={'error alert alert-danger' + (this.state.majorError === '' ? ' hide' : '')}
                       role='alert'>
                    <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
                    {this.state.majorError}
                  </div>
                </div>

                <label htmlFor='inputDegree' className='col-sm-4 col-md-4 control-label'>学历学位</label>
                <div className='form-group'>
                  <div className='col-sm-4 col-md-4' onBlur={this.validate}>
                    <select ref='degree' placeholder='学历学位' name='degree' value={this.state.degree}
                            onChange={this.handleChange}
                            className={'form-control' + (this.state.degreeError === '' ? '' : ' select')}>
                      <option value=''>请选择</option>
                      <option value='专科'>专科及以下</option>
                      <option value='本科'>本科</option>
                      <option value='硕士'>硕士</option>
                      <option value='博士'>博士</option>
                    </select>
                  </div>

                  <div className={'error alert alert-danger' + (this.state.degreeError === '' ? ' hide' : '')}
                       role='alert'>
                    <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
                    请选择学历
                  </div>
                </div>

                <div className='form-group'>
                  <div className='col-sm-offset-4 col-sm-4 col-md-offset-4 col-md-4'>
                    <button type='submit' className='btn btn-default' onClick={this.update}>保存</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
    );

  }
});

module.exports = UserDetail;