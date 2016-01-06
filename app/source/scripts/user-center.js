var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');

require('bootstrap');
require('../less/user-center.less');

var UserCenter = require('./component/user-center.component');

ReactDom.render(
    <UserCenter />,
    document.getElementById('account-info')
);
