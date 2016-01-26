'use strict';

var ReactDom = require('react-dom');
var DashBoard = require('./component/dashBoard.component');
var Navigation = require('./component/navigation.component');
require('../less/dashboard.less');
var Row = require('react-bootstrap/lib/Row');
var Alertcontent = require('./component/alert-content.component');
var DashboardIcon = require('./component/dashboard-icon.component');

ReactDom.render(
    <div>
      <header>
        <Navigation/>
      </header>
      <DashBoard>
        <Alertcontent />
        <Row>
          <DashboardIcon name="userCenter"/>
          <DashboardIcon name="logic"/>
          <DashboardIcon name="homework"/>
        </Row>
      </DashBoard>
    </div>,
    document.getElementById('dashboard-container')
);
