'use strict';

var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');

require('bootstrap');
require('../less/password-retrieve.less');

var PasswordRetrieveForm = require('./component/password-retrieve/password-retrieve-form.component');

ReactDom.render(
    <PasswordRetrieveForm/>,
    document.getElementById('password-retrieve-container')
);