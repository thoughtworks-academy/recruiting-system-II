var React = require('react');
var ReactDom = require('react-dom');

function passwordSafe(val) {
  if (val == '') return 0;
  var safeRegex = [
    new RegExp('(?=.{6,}).*', 'g'),
    new RegExp('^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g'),
    new RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g')
  ];

  var safeLevels = [1, 2, 3];

  var result = 1;
  safeRegex.forEach(function(reg, i){
    result = reg.test(val) ? safeLevels[i] : result;
  });

  return result;
}

function getPosition(level) {
  var levelNumber = [1, 2, 3];

  for(var position = 0; position < levelNumber.length; position ++) {
    if(level < levelNumber[position] + 1) {
      return position;
    }
  }
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
    var levelGrade = ['danger', 'general', 'safe'];
    var position = getPosition(level);

    this.setState({passwordSafeStyle: levelGrade[position]});
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