var React = global.React = require('react');
var validate = require('validate.js');
var containers = {
    phoneEmail: {
        presence: {message: '^请输入邮箱'},
        email: {message: '^请输入正确的形式'}
    },
    loginPassword: {
        presence: {message: '^请输入密码'},
        length: {
            minimum: 8,
            maximum: 16,
            message: '^密码错误'
        }
    }
};
function getError(validateInfo, field) {
    if(validateInfo && validateInfo[field] && validateInfo[field].length > 0) {
        return validateInfo[field][0];
    }
    return '';
}

var LoginForm = React.createClass({
    getInitialState: function () {
      return {
          phoneEmailError: '',
          loginPasswordError : ''
      }
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

    render: function () {

        var classString = "col-md-7 logon-form-container" + (this.props.isLoginState ? '' : ' hide');

        return (
            <div id="logon" className={classString}>
                <h4 className="welcome">欢迎登陆思沃学院</h4>
                <div className="lose" name="loginFailed">用户名或密码错误</div>
                <form action="">
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="请输入邮箱" name="phoneEmail" onBlur={this.validate}/>
                        <div
                            className={"lose" + (this.state.phoneEmailError === '' ? ' hide' : '')}>{this.state.phoneEmailError}
                        </div>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" placeholder="请输入密码" name="loginPassword" onBlur={this.validate}/>
                        <div
                            className={"lose" + (this.state.loginPasswordError === '' ? ' hide' : '')}>{this.state.loginPasswordError}
                        </div>
                    </div>
                    <button type="button" id="login-btn" className="btn btn-lg btn-block btn-primary">登陆</button>
                </form>
            </div>
        )
    }
});

module.exports = LoginForm;