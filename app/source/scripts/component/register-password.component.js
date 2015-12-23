var React = require('react');
var ReactDom = require('react-dom');

function passwordSafe(val) {
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
var RegisterPassword = React.createClass({
  getInitialState: function () {
    return {
      passwordSafeLevel: '',
      passwordSafeStyle: ''
    }
  },

  toggleState: function () {
    this.props.onStateChange();
  },

  checkPasswordSafe: function (event) {
    var value = event.target.value;
    var level = passwordSafe(value);

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
          <input className="form-control" type={(this.props.isShowToggle === false ? "password" : "text")}
                 placeholder="请输入8~16位密码" name="password" ref="password"
                 id="register-password" onBlur={this.props.onBlur} onChange={this.checkPasswordSafe}/>
          <div className={"lose" + (this.props.passwordError === '' ? ' hide' : '')}>{this.props.passwordError}
          </div>
          <ul className="passport-safely">
            <li className={this.state.passwordSafeLevel >= 1 ? this.state.passwordSafeStyle : ""}>弱</li>
            &nbsp;
            <li className={this.state.passwordSafeLevel >= 2 ? this.state.passwordSafeStyle : ""}>中</li>
            &nbsp;
            <li className={this.state.passwordSafeLevel == 3 ? this.state.passwordSafeStyle : ""}>强</li>
            &nbsp;
            <li className="toggle" onClick={this.toggleState} isShowToggle={this.props.isShowToggle}>
              {this.props.isShowToggle ? '隐藏密码' : '显示密码'}</li>
          </ul>
        </div>
    )
  }
});
module.exports = RegisterPassword;