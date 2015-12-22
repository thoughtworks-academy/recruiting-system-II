var React = global.React = require('react');
var $ = require('jquery');
var request = require('superagent');
var validate = require("validate.js");
var RegisterToggle = require('./register-toggle.component');


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
    email: {
        presence: {message: "^请输入邮箱"},
        email: {message: "^请输入正确邮箱"}
    },
    mobilePhone: {
        presence: {message: '^请输入手机号'},
        format: {
            pattern: /^1[3|4|5|8][0-9]\d{8}$/,
            message: '^请输入合法手机号'
        }
    },
    password: {
        presence: {message: "^请输入密码"},
        length: {
            minimum: 8,
            maximum: 16,
            message: "^请输入合法密码"
        }
    }
};

var asyncContainersFunc = {
    email: function() {},
    mobilePhone: function (value, done) {
        return request
            .get('/register/validate-mobile-phone')
            .set('Content-Type', 'application/json')
            .query({
                mobilePhone: value
            })
            .end((err, req) => {
                var error = "";
                if (req.body.status === 200) {
                    error = '该手机号已被注册';
                }
                done({mobilePhoneError: error});
            });
    },
    password: function() {}
};

function getError(validateInfo, field) {
    if (validateInfo && validateInfo[field] && validateInfo[field].length > 0) {
        return validateInfo[field][0];
    }
    return ""
}

var RegisterForm = React.createClass({

        getInitialState: function () {
            return {
                mobilePhoneError: '',
                emailError: '',
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

            if('' === error) {
                asyncContainersFunc[name](value, (stateObj) => {
                    this.setState(stateObj);
                })
            }
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

            var classString = "col-md-7 logon-form-container" + (this.props.isLoginState ? ' hide' : '');

            return (
                <div id="register" className={classString}>
                    <h4 className="welcome">欢迎注册思沃学院</h4>

                    <form action="">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="请输入手机号" name="mobilePhone"
                                   onBlur={this.validate} />

                            <div
                                className={"lose" + (this.state.mobilePhoneError === '' ? ' hide' : '')}>{this.state.mobilePhoneError}</div>
                        </div>

                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="请输入邮箱" name="email"
                                   onBlur={this.validate}/>
                            <div
                                className={"lose" + (this.state.emailError === '' ? ' hide' : '')}>{this.state.emailError}</div>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type={(this.state.isShowToggle === false ? "password" : "text")} placeholder="请输入8~16位密码" name="password"
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

                        <div className="checkbox">
                            <label>
                                <input type="checkbox" className="agree-check"/> 同意
                            </label>
                            <a id="agreement" data-toggle="modal" data-target="#agreementModal">协议</a>
                        </div>


                        <button type="button" id="register-btn" className="btn btn-lg btn-block btn-primary">注册</button>
                    </form>
                </div>
            )
        }
    })
    ;

module.exports = RegisterForm;