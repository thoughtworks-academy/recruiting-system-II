'use strict';

var MarkedPaper = React.createClass({
  render: function() {
    return (
        <div className="paper-button col-xs-12">
          <h3 className="col-xs-9">
            name
          </h3>
          <div className="col-xs-3">
            <i className="fa fa-star fa-2x"></i>
          </div>
          <div className="col-md-9 col-sm-5 ">
            <div>未发布：
              <a href="#">点击发布</a>
            </div>
            <div>章节个数：10</div>
            <div>已发布个数：0</div>
          </div>
          <div className="button-buttom">
            <a href="#" className="text-warning"><b>编辑</b></a>
            <a href="#" className="text-info"><b>导出成绩</b></a>
            <a href="#" className="text-success"><b>开始答题</b></a>
          </div>
        </div>
    )
  }
});

module.exports = MarkedPaper;