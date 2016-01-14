'use strict';

var React = require('react');

var ProgrammeSidebar = React.createClass({

  handleClick: function (mark) {
    this.props.onChangeState(mark);
  },

  render() {
    var tags = [
      {mark: 'one', value: '第一题'},
      {mark: 'two', value: '第二题'},
      {mark: 'three', value: '第三题'},
      {mark: 'four', value: '第四题'},
      {mark: 'five', value: '第五题'}
    ];

    var itemHtml = tags.map((item, index) => {
      var classStr = 'list-group-item ' + (item.mark === this.props.currentTopicNumber ? 'selected' : '');

      return (
          <a className={classStr} href="javascript:void(0)" key={index} onClick={this.handleClick.bind(null, item.mark)}>
            <div className="row">
              <div className="col-xs-9 h5 text-center">{item.value}</div>
              <div className="col-xs-3"><i className={'h4 fa fa-lock'}></i></div>
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
                <div className="col-xs-3"><i className={'programme-nav-icon h4 fa fa-pencil-square-o'}></i></div>
              </div>
            </div>
            {itemHtml}
          </div>
        </div>
    );
  }
});

module.exports = ProgrammeSidebar;