'use strict';

var React = require('react');

var UserCenterSide = React.createClass({
  changeState: function (evt) {
    var name = evt.target.name;

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
            <ol>
              {tags.map((item, index) => {
                return (
                    <div key={index}>
                      <li>
                        <div>
                          <a ref="#" onClick={this.changeState} name={item.mark}
                             className={this.props.currentState === item.mark ? 'selected' : ''}>{item.value}</a>
                        </div>
                        <span className={"glyphicon glyphicon-check"} aria-hidden="true"></span>
                      </li>
                    </div>
                );
              })}
            </ol>
          </div>
        </div>
    );
  }
});

module.exports = UserCenterSide;