/* jshint browser: true */

'use strict';

var ReactDom = require('react-dom');
var DashBoard = require('./component/dashBoard.component');
var Navigation = require('./component/navigation.component');
require('../less/dashboard.less');

ReactDom.render(
    <DashBoard />,
    document.getElementById('dashboard-container')
);

ReactDom.render(
    <Navigation />,
    document.getElementById('navigation')
);
