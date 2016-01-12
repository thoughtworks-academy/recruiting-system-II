var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');

require('bootstrap');
require('../less/user-center.less');

var UserCenterApp = require('./component/user-center-app.component');
var Navigation = require('./component/navigation.component');

ReactDom.render(
    <UserCenterApp />,
    document.getElementById('account-info')
);

ReactDom.render(
    <Navigation />,
    document.getElementById('navigation')
);