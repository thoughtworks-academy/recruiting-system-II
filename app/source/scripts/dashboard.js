'use strict';

var ReactDom = require('react-dom');
var DashBoard = require('./component/dashBoard.component');
var Navigation = require('./component/navigation.component');
require('../less/dashboard.less');

ReactDom.render(
    <div>
      <header>
        <Navigation/>
      </header>
      <DashBoard />
    </div>,
    document.getElementById('dashboard-container')
);
