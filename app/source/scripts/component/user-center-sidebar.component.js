'use strict';

var React = require('react');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');

var UserCenterSide = React.createClass({

  handleClick: function (mark) {
    this.props.onChangeState(mark);
  },

  render() {
    var tags = [
      {mark: 'userDetail', value: '个人中心', icon: 'fa-user-plus'},
      {mark: 'password', value: '修改密码', icon: 'fa-user-secret'}
    ];

    var itemHtml = tags.map((item, index) => {
      var classStr = 'list-group-item ' + (item.mark === this.props.currentState ? 'active' : '');

      return (
          <a className={classStr} key={index} onClick={this.handleClick.bind(null, item.mark)}>
            <div className="row">
              <div className="col-xs-9 h4 text-center">{item.value}</div>
              <div className="col-xs-3"><i className={'user-center-nav-icon h4 fa-lg fa ' + item.icon}></i></div>
            </div>
          </a>
      );
    });

    return (
        <div className="col-md-3 col-sm-3 col-xs-12">
          <div className="list-group">
            {itemHtml}
          </div>
        </div>
    );
  }
});

module.exports = UserCenterSide;
