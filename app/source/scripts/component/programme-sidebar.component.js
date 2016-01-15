/*eslint no-magic-numbers: 0*/

'use strict';

var React = require('react');
var Reflux = require('reflux');
var ProgrammeActions = require('../actions/programme-actions');
var ProgrammeStore = require('../store/programme-store');

var ProgrammeSidebar = React.createClass({
  mixins: [Reflux.connect(ProgrammeStore)],

  getInitialState: function () {
    var list = [];

    for(var i = 0 ;i < 5; i ++) {
      list.push({topicStatus: 0});
    }

    return {
      topicStateList: list
    };
  },

  componentDidMount: function () {
    ProgrammeActions.loadTopicState();
  },

  changeIcon: function (state) {
    var icon = 'h4 fa fa-';
    var iconList = ['lock', '', 'clock-o', 'check-circle', 'times-circle'];
    var stateCode = [0, 1, 2, 3, 4];

    stateCode.forEach((item, index) => {
      if (state === item) {
        icon = icon + iconList[index];
      }
    });
    return icon;
  },

  handleClick: function (mark, evt) {
    var name = evt.target.offsetParent.className;

    if (name.includes('disabled') === false) {
      this.props.onChangeState(mark);
    }
  },

  render() {
    var tags = [];

    for (var i = 0; i < 5; i++) {
      var index = i + 1;

      tags.push({mark: index, value: '第' + index + '题', state: this.state.topicStateList[i].topicStatus});
    }
    var itemHtml = tags.map((item, index) => {
      var classStr = 'list-group-item ' + (item.mark === this.props.currentTopicNumber ? 'selected' : '')
          + (item.state === 0 ? ' disabled' : '');
      return (
          <button className={classStr} disabled={item.state === 0 ? true : false} href="javascript:void(0)" key={index}
                  onClick={this.handleClick.bind(null, item.mark)}>
            <div className="row">
              <div className="col-xs-9 h5 text-center">{item.value}</div>
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
                <div className="col-xs-9 h4 text-center">编程题</div>
                <div className="col-xs-3"><i className='programme-nav-icon h4 fa fa-pencil-square-o'></i></div>
              </div>
            </div>
            {itemHtml}
          </div>
        </div>
    );
  }
});

module.exports = ProgrammeSidebar;