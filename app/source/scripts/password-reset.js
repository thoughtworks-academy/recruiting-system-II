'use strict';

var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');

require('bootstrap');
require('../less/password-reset.less');

var PasswordResetForm = require('./component/password-retrieve/password-reset-form.component');

ReactDom.render(
    <PasswordResetForm/>,
    document.getElementById('password-reset-container')
);