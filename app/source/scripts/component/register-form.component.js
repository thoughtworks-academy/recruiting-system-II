var React = global.React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var request = require('superagent');
var validate = require("validate.js");
var RegisterPassword = require('./register-password.component');

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
    }
};

var asyncContainersFunc = {
    email: function(value, done) {
        return request
            .get('/register/validate-email')
            .set('Content-Type', 'application/json')
            .query({
                email: value
            })
            .end((err, req) => {
                var error = '';
                if (req.body.status === 200) {
                    error = '该邮箱已被注册';
                }
                done ({emailError: error})
            })
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
                if (req.body.status === 200) {
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
    return ""
}

var RegisterForm = React.createClass({

        getInitialState: function () {
            return {
                mobilePhoneError: '',
                emailError: ''
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

            if('' === error) {
                asyncContainersFunc[name](value, (stateObj) => {
                    this.setState(stateObj);
                })
            }
        },

        register: function(){
            var registerInfo = [];

            registerInfo.push(
                ReactDOM.findDOMNode(this.refs.mobilePhone),
                ReactDOM.findDOMNode(this.refs.email),
                ReactDOM.findDOMNode(this.refs.password)
            );

            var last = 2;

            var callback = function(){
                console.log(this.state);
            };

            registerInfo.forEach((item, i) => {
                var value = item.value;
                var name = item.name;
                var valObj = {};
                valObj[name] = value;

                var result = validate(valObj, containers);
                var error = getError(result, name);
                var stateObj = {};
                stateObj[name + 'Error'] = error;

                this.setState(stateObj);
            });
        },

        render: function () {

            var classString = "col-md-7 logon-form-container" + (this.props.isLoginState ? ' hide' : '');

            return (
                <div id="register" className={classString}>
                    <h4 className="welcome">欢迎注册思沃学院</h4>

                    <form action="">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="请输入手机号" name="mobilePhone" ref="mobilePhone"
                                   onBlur={this.validate} />

                            <div
                                className={"lose" + (this.state.mobilePhoneError === '' ? ' hide' : '')}>{this.state.mobilePhoneError}</div>
                        </div>

                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="请输入邮箱" name="email" ref="email"
                                   onBlur={this.validate}/>
                            <div
                                className={"lose" + (this.state.emailError === '' ? ' hide' : '')}>{this.state.emailError}</div>
                        </div>

                        <div className="form-group">
                            <RegisterPassword />
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