var ReactDom = require('react-dom');
var DashBoard = require('./component/dashBoard.component');
require('../less/dashboard.less');
var $ = global.jQuery = require('jquery');
require('bootstrap');

ReactDom.render(
    <DashBoard />,
    document.getElementById('dashboard-container')
);
