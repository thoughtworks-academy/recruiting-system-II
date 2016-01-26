'use strict';

var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');

require('bootstrap');
require('../less/user-center.less');

var UserCenterApp = require('./component/user-center-app.component');
var Navigation = require('./component/navigation.component');
var UserDetail = require('./component/user-center-detail.component');
var ChangePassword = require('./component/change-password.component');
var UserCenterSidebar = require('./component/user-center-sidebar.component');
var UserCenterGender = require('./component/user-center-gender.component');

ReactDom.render(
    <div>
      <header>
        <Navigation />
      </header>
      <UserCenterApp>
        <UserCenterSidebar/>
        <UserDetail>
          <UserCenterGender/>
        </UserDetail>
        <ChangePassword/>
      </UserCenterApp>
    </div>,
    document.getElementById('user-center')
);
