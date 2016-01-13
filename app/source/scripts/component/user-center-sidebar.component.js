'use strict';

var React = require('react');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');

var UserCenterSide = React.createClass({
  changeState: function (evt) {
    var name = evt.target.innerText === '个人中心' ? 'userDetail' : 'password';

    this.props.onChangeState(name);
  },

  render() {
    var tags = [
      {mark: 'userDetail', value: '个人中心', icon: 'fa fa-user-secret'},
      {mark: 'password', value: '修改密码', icon: 'fa fa-user-plus'}
    ];

    return (
        <div className="col-md-3 col-sm-3 col-xs-12">
          <div className="sidebar">
            <ul>
              <Nav bsStyle="pills" stacked activeKey={this.props.currentState}>
                {tags.map((item, index) => {
                  return (
                      <NavItem eventKey={item.mark} href="#" onClick={this.changeState} key={index}>{item.value}
                        <i className={item.icon}></i></NavItem>
                  );
                })}
              </Nav>
            </ul>
          </div>
        </div>
    );
  }
});

module.exports = UserCenterSide;
