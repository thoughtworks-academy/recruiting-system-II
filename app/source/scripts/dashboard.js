var ReactDom = require('react-dom');
var DashBoard = require('./component/dashBoard.component');
require('../less/dashboard.less');



ReactDom.render(
    <DashBoard />,
    document.getElementById('dashboard-container')
);
