/*eslint no-magic-numbers: 0*/

'use strict';

var React = require('react');
var Reflux = require('reflux');
var HomeworkActions = require('../actions/homework-actions');
var HomeworkSidebarStore = require('../store/homework-sidebar-store');

var HomeworkSidebar = React.createClass({
  mixins: [Reflux.connect(HomeworkSidebarStore)],

  getInitialState: function () {
    var list = [];

    for (var i = 0; i < 5; i++) {
      list.push({homeworkStatus: 'lock'});
    }

    return {
      homeworkStatusList: list
    };
  },

  componentDidMount: function () {
    HomeworkActions.loadHomeworkStatus();
  },

  changeIcon: function (state) {
    var icon = 'home-icon h4 fa fa-lg fa-';
    var iconList = ['lock', '', 'clock-o', 'check-circle', 'times-circle'];
    var statusCode = ['lock', 'active', 'progress', 'success', 'error'];

    statusCode.forEach((item, index) => {
      if (state === item) {
        icon = icon + iconList[index];
      }
    });
    return icon;
  },
  handleClick: function (mark, evt) {
    var name = evt.target.offsetParent.className;

    if (name.includes('disabled') === false) {
      this.props.onChangeNumber(mark);
    }
  },

  render() {
    var tags = [];

    for (var i = 0; i < 5; i++) {
      var index = i + 1;

      tags.push({mark: index, value: '第' + index + '题', state: this.state.homeworkStatusList[i].homeworkStatus});
    }
    var itemHtml = tags.map((item, index) => {
      var classStr = 'list-group-item ' + (item.mark === this.props.currentHomeworkNumber ? 'selected' : '')
          + (item.state === 'lock' ? ' disabled' : '');

      return (
          <button className={classStr} disabled={item.state === 'lock' ? true : false} key={index}
                  onClick={this.handleClick.bind(null, item.mark)}>
            <div className="row">
              <div className="col-xs-9 h4 text-center ">{item.value}</div>
              <div className='col-xs-3'>
                <i className={this.changeIcon(item.state)}/></div>
            </div>
          </button>
      );
    });

    return (
        <div className="col-md-3 col-sm-3 col-xs-12">
          <div className="list-group">
            <div className="list-group-item active">
              <div className="row">
                <div className="col-xs-9 h3 text-center">编程题</div>
                <div className="col-xs-3"><i className='homework-nav-icon h3 fa fa-pencil-square-o'></i></div>
              </div>
            </div>
            {itemHtml}
          </div>
        </div>
    );
  }
});

module.exports = HomeworkSidebar;