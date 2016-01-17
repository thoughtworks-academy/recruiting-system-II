'use strict';

var React = require('react');

var SubmissionIntroduction = React.createClass({
  render() {
    return (
        <div>
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
    );
  }
});

module.exports = SubmissionIntroduction;