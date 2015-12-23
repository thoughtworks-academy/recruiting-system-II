var React = require('react');
var ReactDom = require('react-dom');
var RegisterToggle = require('./register-toggle.component');
var validate = require("validate.js");

function passwordSafe(val){
  if (val == '') return 0;
  var strongRegex = new RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g');
  var mediumRegex = new RegExp('^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g');
  var enoughRegex = new RegExp('(?=.{6,}).*', 'g');

  if (enoughRegex.test(val) == false) {
    return 1;
  } else if (strongRegex.test(val)) {
    return 3;
  } else if (mediumRegex.test(val)) {
    return 2;
  } else {
    return 1;
  }
  return false;
}

 var containers = {
   password: {
     presence: {message: '^请输入密码'},
     length: {
       minimum: 8,
       maximum: 16,
       message: '^请输入合法密码'
     }
   }
 };

function getError(validateInfo, field) {
  if (validateInfo && validateInfo[field] && validateInfo[field].length > 0) {
    return validateInfo[field][0];
  }
  return ""
}

var RegisterPassword = React.createClass({
  getInitialState:function() {
    return {
      passwordError: '',
      passwordSafeLevel: '',
      passwordSafeStyle: '',
      isShowToggle: false
    }
  },

  stateChange: function() {
    var newState = !this.state.isShowToggle;
    this.setState({isShowToggle: newState});
  },

  validate: function (event) {
    var target = event.target;
    var value = target.value;
    var name = target.name;
    var valObj = {};
    valObj[name] = value;

    var result = validate(valObj, containers);
    var error = getError(result, name);
    var stateObj = {};
    stateObj[name + 'Error'] = error;

    this.setState(stateObj);

  },

  checkPasswordSafe: function(event){
    var level = passwordSafe(event.target.value);
    switch (level) {
      case 1:
        this.setState({passwordSafeStyle: 'danger'});
        break;
      case 2:
        this.setState({passwordSafeStyle: 'general'});
        break;
      case 3:
        this.setState({passwordSafeStyle: 'safe'});
        break;
      case 0:
        break;
    }
    this.setState({passwordSafeLevel: level});
  },

  render: function () {
    return (
        <div>
          <input className="form-control" type={(this.state.isShowToggle === false ? "password" : "text")} placeholder="请输入8~16位密码" name="password" ref="password"
                 id="register-password" onBlur={this.validate} onChange={this.checkPasswordSafe}/>
          <div
              className={"lose" + (this.state.passwordError === '' ? ' hide' : '')}>{this.state.passwordError}
          </div>
          <ul className="passport-safely">
            <li className={this.state.passwordSafeLevel >= 1 ? this.state.passwordSafeStyle : ""}>弱</li>&nbsp;
            <li className={this.state.passwordSafeLevel >= 2 ? this.state.passwordSafeStyle : ""}>中</li>&nbsp;
            <li className={this.state.passwordSafeLevel == 3 ? this.state.passwordSafeStyle : ""}>强</li>&nbsp;
            <RegisterToggle isShowToggle={this.state.isShowToggle} onStateChange={this.stateChange}/>
          </ul>
        </div>
    )
  }
});
module.exports = RegisterPassword;