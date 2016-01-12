'use strict';

var React = require('react');
var UserCenter = require('./user-center.component');

var UserCenterApp = React.createClass({
  render() {
    return (
        <div className="row">
          <UserCenter />
        </div>
    )
  }
});

module.exports = UserCenterApp;