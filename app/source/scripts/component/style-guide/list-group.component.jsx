'use strict';

var ListGroup = React.createClass({

  getInitialState: function() {
    return ({
      title: '个人中心',
      list: ['群组首页','群组试卷','群组成员','群组管理'],
      clickNumber: 1
    })
  },

  render() {

    var listContent = this.state.list.map((item, index) => {
      var classStr = "list-group-item " + (this.state.clickNumber === index + 1 ? 'select': '');
      return (
        <a className={classStr} href="javascript:void(0)" key={index}>
          <div className="row">
            <div className="h4 text-center">{item}</div>
          </div>
        </a>
      )
    });

    return (
      <div>
        <div className="list-group">
          <div className="list-group-item active">
            <div className="row">
              <div className="h4 text-center">{this.state.title}</div>
            </div>
          </div>
          {listContent}
        </div>
      </div>
    );
  }
});
module.exports = ListGroup;