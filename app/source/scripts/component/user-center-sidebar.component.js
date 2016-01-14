'use strict';

var React = require('react');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var UserDetailActions = require('../actions/user-detail-actions');

var UserCenterSide = React.createClass({

  handleClick: function (mark) {
    this.props.onChangeState(mark);
    if(mark === 'userDetail') {
      UserDetailActions.loadUserDetail();
    }
  },

  render() {
    var tags = [
      {mark: 'userDetail', value: '个人信息'},
      {mark: 'password', value: '修改密码'}
    ];

    var itemHtml = tags.map((item, index) => {
      var classStr = 'list-group-item ' + (item.mark === this.props.currentState ? 'selected' : '');

      return (
          <a className={classStr} href="javascript:void(0)" key={index} onClick={this.handleClick.bind(null, item.mark)}>
            <div className="row">
              <div className="col-xs-9 h4 text-center">{item.value}</div>
              <div className="col-xs-3"></div>
            </div>
          </a>
      );
    });

    return (

        <div className="col-md-3 col-sm-3 col-xs-12">

          <div className="list-group">
            <div className="list-group-item active">
              <div className="row">
                <div className="col-xs-9 h4 text-center">个人中心</div>
                <div className="col-xs-3"><i className={'user-center-nav-icon h4 fa-lg fa fa-user-plus'}></i></div>
              </div>
            </div>
            {itemHtml}
          </div>
        </div>
    );
  }
});

module.exports = UserCenterSide;
