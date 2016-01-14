'use strict';

var React = require('react');

var Programme = React.createClass({
  render() {
    return (
        <div className="col-md-9 col-sm-9 col-xs-12">
          <div className="content">
            <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="active"><a href="#topic-definition">题目说明</a></li>
              <li role="presentation"><a href="#topic-requirements">题目要求</a></li>
              <li role="presentation"><a href="#commit-address">提交地址</a></li>
              <li className="li-error-definition" role="presentation"><a href="#error-definition">出错说明</a></li>
            </ul>

            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="topic-definition">
                <p>题目说明</p>
              </div>
              <div role="tabpanel" className="tab-pane" id="topic-requirements">
                <p>题目要求</p>
              </div>
              <div role="tabpanel" className="tab-pane" id="commit-address">

                <div className="row last-time">
                  <div className="col-md-12 ">你还有2天10小时完成题目</div>
                </div>

                <div className="form-horizontal">
                  <div className="form-group">
                    <div className="col-sm-6 col-sm-offset-2 col-xs-6 col-xs-offset-1">
                      <input type="text" className="form-control" id="git-address" placeholder="github 地址"/>
                    </div>
                    <div className="col-sm-2  col-xs-3">
                      <a href="" className="btn btn-info">提交GIT地址</a>
                    </div>
                  </div>
                </div>
              </div>
              <div role="tabpanel" className="tab-pane" id="error-definition"></div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = Programme;