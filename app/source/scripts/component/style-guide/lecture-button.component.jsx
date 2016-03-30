'use strict';

var LectureButton = React.createClass({
  render: function() {
    return (
      <div className="dashboard-icon col-md-12 col-sm-12 col-xs-12">
        <div className="icon col-md-12 col-sm-12 col-xs-12">
          <div className="icon-img" >
            <span className="fa fa-code"></span>
          </div>
          <p className="icon-name">编程题</p>
          <div className="icon-bottom col-md-12 col-sm-12 col-xs-12">
            <div className="col-md-4 col-sm-4 col-xs-3 text-left text-danger">
              未发布
            </div>
            <div className="published-option col-md-8 col-sm-8 col-xs-9 text-right">
              <a href="#" className="published">发布</a>
              <a href="#" className="edit">编辑</a>
              <a href="#" className="delete">删除</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = LectureButton;