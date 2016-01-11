var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');

require('bootstrap');
require('../less/user-center.less');

var UserCenter = require('./component/user-center.component');
var Navigation = require('./component/navigation.component');

ReactDom.render(
    <UserCenter />,
    document.getElementById('account-info')
);

ReactDom.render(
    <Navigation />,
    document.getElementById('navigation')
);