'use strict';


var ReactDom = require('react-dom');
require('bootstrap/dist/css/bootstrap.min.css');
require('../less/password-reset.less');

var PasswordResetForm = require('./component/password-retrieve/password-reset-form.component');
var NewPassword = require('./component/reuse/new-password.component');

ReactDom.render(
    <PasswordResetForm>
      <NewPassword/>
    </PasswordResetForm>,
    document.getElementById('password-reset-container')
);