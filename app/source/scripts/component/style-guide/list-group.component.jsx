'use strict';

var ListGroup = React.createClass({

  render() {
    return (
      <div>
        <div className="list-group">
          <div className="list-group-item active">
            <div className="row">
              <div className="h4 text-center">个人中心</div>
            </div>
          </div>
          <a className="list-group-item select" href="javascript:void(0)">
            <div className="row">
              <div className="h4 text-center">群组首页</div>
            </div>
          </a>
          <a className="list-group-item" href="javascript:void(0)">
            <div className="row">
              <div className="h4 text-center">群组试卷</div>
            </div>
          </a>
          <a className="list-group-item" href="javascript:void(0)">
            <div className="row">
              <div className="h4 text-center">群组成员</div>
            </div>
          </a>
          <a className="list-group-item" href="javascript:void(0)">
            <div className="row">
              <div className="h4 text-center">群组管理</div>
            </div>
          </a>
        </div>
      </div>
    );
  }
});
module.exports = ListGroup;