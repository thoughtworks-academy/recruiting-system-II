/*eslint no-magic-numbers: 0*/

'use strict';

var React = require('react');

var ProgrammeSidebar = React.createClass({

  changeIcon:function(state) {
    var icon = 'h4 fa fa-';
    var iconList = ['lock', '', 'clock-o', 'check-circle', 'times-circle'];
    var stateCode = [0,1,2,3,4];

    stateCode.forEach((item, index) => {
      if(state === item) {
        icon =  icon + iconList[index];
      }
    });
    return icon;
  },

  handleClick: function (mark, evt) {
    var name = evt.target.offsetParent.className;

    if(name.indexOf('disabled') === -1) {
      this.props.onChangeState(mark);
    }
  },

  render() {
    var tags = [
      {mark: 'one', value: '第一题', state: 3},
      {mark: 'two', value: '第二题', state: 4},
      {mark: 'three', value: '第三题', state: 2},
      {mark: 'four', value: '第四题', state: 1},
      {mark: 'five', value: '第五题', state: 0}
    ];

    var itemHtml = tags.map((item, index) => {
      var classStr = 'list-group-item ' + (item.mark === this.props.currentTopicNumber ? 'selected' : '')
                                        + (item.state === 0 ? ' disabled' : '');

      return (
          <a className={classStr} href="javascript:void(0)" key={index}
             onClick={this.handleClick.bind(null, item.mark)}>
            <div className="row">
              <div className="col-xs-9 h5 text-center">{item.value}</div>
              <div className="col-xs-3"><i className={this.changeIcon(item.state)}/></div>
            </div>
          </a>
      );
    });

    return (
        <div className="col-md-3 col-sm-3 col-xs-12">
          <div className="list-group">
            <div className="list-group-item active">
              <div className="row">
                <div className="col-xs-9 h4 text-center">编程题</div>
                <div className="col-xs-3"><i className={'programme-nav-icon h4 fa fa-pencil-square-o'}/></div>
              </div>
            </div>
            {itemHtml}
          </div>
        </div>
    );
  }
});

module.exports = ProgrammeSidebar;