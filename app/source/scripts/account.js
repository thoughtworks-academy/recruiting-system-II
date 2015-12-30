var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');

require('bootstrap');
require('../less/account.less');
var Account = require('./component/account.component');

ReactDom.render(
    <Account />,
    document.getElementById('account-info')
);