'use strict';

var React = global.React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var request = require('superagent');
var validate = require('validate.js');
var RegisterPassword = require('./register-password.component');
var constraint = require('../../../mixin/register-constraint');
var page = require('page');
var constant = require('../../../mixin/constant');
var async = require('async');

var asyncContainersFunc = {
  email: function (value, done) {
    return request
        .get('/register/validate-email')
        .set('Content-Type', 'application/json')
        .query({
          email: value
        })
        .end((err, req) => {
          var error = '';
          if (req.body.status === constant.httpCode.OK) {
            error = '该邮箱已被注册';
          }
          done({emailError: error});
        });
  },

  mobilePhone: function (value, done) {
    return request
        .get('/register/validate-mobile-phone')
        .set('Content-Type', 'application/json')
        .query({
          mobilePhone: value
        })
        .end((err, req) => {
          var error = '';
          if (req.body.status === constant.httpCode.OK) {
            error = '该手机号已被注册';
          }
          done({mobilePhoneError: error});
        });
  }
};

function getError(validateInfo, field) {
  if (validateInfo && validateInfo[field] && validateInfo[field].length > 0) {
    return validateInfo[field][0];
  }
  return '';
}

function initialUserQuiz() {
  async.series({
    initialLogicPuzzle: (done) => {
      request.get('/user-initialization/initialLogicPuzzle').
        set('Content-Type', 'application/json')
        .end(function (err) {
          if (err) {
            done(err);
          }else {
            done(null, true);
          }
        });
    },
    initialHomeworkQuizzes: (done) => {
      request.get('/user-initialization/initialHomeworkQuizzes').
        set('Content-Type', 'application/json')
        .end(function (err) {
          if (err) {
            done(err);
          }else {
            done(null, true);
          }
        });
    }
  }, function (err, data) {
    if (data.initialLogicPuzzle && data.initialLogicPuzzle){
      page('user-center.html');
    }else {
      console.log(err);
    }
  });
}

var RegisterForm = React.createClass({

  getInitialState: function () {
    return {
      mobilePhoneError: '',
      emailError: '',
      passwordError: '',
      agree: false,
      isShowToggle: false,
      disabled: false,
      password: ''
    };
  },
  componentWillReceiveProps: function() {
    this.setState({
      mobilePhoneError: '',
      emailError: '',
      passwordError: '',
      agree: false,
      isShowToggle: false
    });
  },
  stateChange: function () {
    var newState = !this.state.isShowToggle;
    this.setState({isShowToggle: newState});
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

    if ('' === error && name !== 'password') {
      asyncContainersFunc[name](value, (stateObj) => {
        this.setState(stateObj);
      });
    }
  },

  changeAgreeState: function () {
    var newState = !this.state.agree;
    this.setState({agree: newState});
  },

  checkRegisterData: function (registerInfo) {
    var passCheck = true;

    if (this.state.agree === false) {
      $('#agree-check').modal('show');
      passCheck = false;
    }

    var stateObj = {};
    registerInfo.forEach((item, i) => {
      var valObj = {};

      var value = item.value;
      var name = item.name;

      valObj[name] = value;
      var result = validate(valObj, constraint);

      var error = getError(result, name);
      if (error !== '') {
        passCheck = false;
      }

      stateObj[name + 'Error'] = error;
      this.setState(stateObj);
    });

    return passCheck;
  },

  register: function () {
    if (this.state.mobilePhoneError !== '' || this.state.emailError !== '') {
      return false;
    }
    var registerData = [];
    var mobilePhone = ReactDOM.findDOMNode(this.refs.mobilePhone);
    var email = ReactDOM.findDOMNode(this.refs.email);
    var password = {
      name: 'password',
      value: this.state.password
    };

    registerData.push(mobilePhone, email, password);

    if (!this.checkRegisterData(registerData)) {
      return false;
    } else {
      this.setState({
        disabled: true
      });

      request.post('/register').set('Content-Type', 'application/json').send({
        mobilePhone: mobilePhone.value,
        email: email.value,
        password: password.value

      }).end((err, req) => {
        var info = req.body;

        if (info.status === constant.httpCode.OK) {
          initialUserQuiz();
        } else {
          var emailExist = info.data.isEmailExist ? '该邮箱已被注册' : '';
          var mobilePhoneExist = info.data.isMobilePhoneExist ? '该手机号已被注册' : '';
          this.setState({
            mobilePhoneError: mobilePhoneExist,
            emailError: emailExist
          });
          this.setState({
            disabled: false
          });
        }
      });
    }
  },

  inputPassword: function (password) {
    this.setState({
      password: password
    });
  },

  render: function () {

    var classString = 'col-md-7 logon-form-container' + (this.props.isLoginState ? ' hide' : '');

    return (
        <div id="register" className={classString}>
          <h4 className="welcome">欢迎注册思沃学院</h4>

          <form action="">
            <div className="form-group">
              <input className="form-control" type="text" placeholder="请输入手机号" name="mobilePhone" ref="mobilePhone"
                     onBlur={this.validate}/>

              <div
                  className={'lose' + (this.state.mobilePhoneError === '' ? ' hide' : '')}>{this.state.mobilePhoneError}</div>
            </div>

            <div className="form-group">
              <input className="form-control" type="text" placeholder="请输入邮箱" name="email" ref="email"
                     onBlur={this.validate}/>

              <div
                  className={'lose' + (this.state.emailError === '' ? ' hide' : '')}>{this.state.emailError}</div>
            </div>

            <div className="form-group">
              <RegisterPassword isShowToggle={this.state.isShowToggle} onStateChange={this.stateChange}
                                passwordError={this.state.passwordError} onBlur={this.validate}
                                onInputPassword={this.inputPassword}/>
            </div>

            <div className="checkbox">
              <label>
                <input type="checkbox" className="agree-check" onClick={this.changeAgreeState}/> 同意
              </label>
              <a id="agreement" data-toggle="modal" data-target="#agreementModal">协议</a>
            </div>


            <button type="button" id="register-btn" disabled={this.state.disabled}
                    className="btn btn-lg btn-block btn-primary" ref="register" onClick={this.register}>注册
            </button>
          </form>
        </div>
    );
  }
});

module.exports = RegisterForm;