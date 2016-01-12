'use strict';

var React = require('react');

var UserCenterSide = React.createClass({
  showInfo:function () {
    this.props.onInfoStateChange();
  },

  changePassword:function() {
    this.props.onPasswordStateChange();
  },
  render() {
    return (
        <div className="col-md-3 col-sm-3 col-xs-12">
          <div className="sidebar">
            <ol>
              <li>
                <div><a ref="#" onClick={this.showInfo}>个人中心</a></div>
                <span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span>

              </li>
              <li>
                <div><a ref="#" onClick={this.changePassword}>修改密码</a></div>
                <span className="glyphicon glyphicon-check" aria-hidden="true"></span>
              </li>
            </ol>
          </div>
        </div>
    );
  }
});

module.exports = UserCenterSide;