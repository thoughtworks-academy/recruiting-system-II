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
      {mark: 'userDetail', value: '个人中心'},
      {mark: 'password', value: '修改密码'}
    ];

    return (
        <div className="col-md-3 col-sm-3 col-xs-12">
          <div className="sidebar">
            <ul>
              <Nav bsStyle="pills" stacked activeKey={this.props.currentState}>
                <NavItem eventKey={'userDetail'} href="#" onClick={this.changeState}>个人中心
                  <span className={"glyphicon glyphicon-check"} aria-hidden="true"></span></NavItem>

                <NavItem eventKey={'password'} href="#" onClick={this.changeState}>修改密码
                  <span className={"glyphicon glyphicon-check"} aria-hidden="true"></span></NavItem>
              </Nav>
            </ul>
          </div>
        </div>

    );
  }
});

module.exports = UserCenterSide;