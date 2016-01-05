var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');

require('bootstrap');
require('../less/account.less');

var UserDetail = require('./component/user-detail.component');

ReactDom.render(
    <UserDetail />,
    document.getElementById('account-info')
);
