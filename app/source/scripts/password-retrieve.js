'use strict';

var ReactDom = require('react-dom');
require('bootstrap/dist/css/bootstrap.min.css');
require('../less/password-retrieve.less');

var PasswordRetrieveForm = require('./component/password-retrieve/password-retrieve-form.component');

ReactDom.render(
    <PasswordRetrieveForm/>,
    document.getElementById('password-retrieve-container')
);