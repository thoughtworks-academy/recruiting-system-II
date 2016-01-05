var React = global.React = require('react');
var request = require('superagent');
var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Image = require('react-bootstrap/lib/Image');
var Button = require('react-bootstrap/lib/Button');
var Thumbnail = require('react-bootstrap/lib/Thumbnail');

var Dashboard = React.createClass({


  render() {
    return (
        <div className="app-list">
          <Row>
            <Col xs={12} sm={6} md={4} lg={4}>
              <a href="account.html" className="icon-view">
                <div className="icon-wrapper">
                  <div className="icon-img">
                    <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                  </div>
                  <div className="icon-name">
                    个人中心
                  </div>
                </div>

              </a>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <a href="logic-puzzle.html" className="icon-view">
                <div className="icon-wrapper">
                  <div className="icon-img">
                    <span className="glyphicon glyphicon-education" aria-hidden="true"></span>
                  </div>
                  <div className="icon-name">
                    逻辑题
                  </div>
                </div>

              </a>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <a href="dojo.html" className="icon-view">
                <div className="icon-wrapper">
                  <div className="icon-img">
                    <span className="glyphicon glyphicon-road" aria-hidden="true"></span>
                  </div>
                  <div className="icon-name">
                    编程题
                  </div>
                </div>

              </a>
            </Col>
          </Row>
        </div>

    );
  }
});

module.exports = Dashboard;