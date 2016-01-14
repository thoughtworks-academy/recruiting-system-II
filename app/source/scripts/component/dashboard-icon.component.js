'use strict';

var React = global.React = require('react');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var DashboardIcon = React.createClass({
  render() {

    return (
      <Col xs={12} sm={6} md={4} lg={4}>
        <a href={this.props.info.href} className="icon-view"
           onMouseOver={this.props.onShowPrompt}
           onMouseOut={this.props.onHidePrompt}>

          <div className={'icon-wrapper-'+this.props.info.isEnabled} name={this.props.info.name}>
            <div className="icon-img" name={this.props.info.name}>
              <span className={'glyphicon '+this.props.info.glyphicon} aria-hidden="true"/>
            </div>
            <div className="icon-name">
              {this.props.info.title}
            </div>
          </div>
        </a>
      </Col>
      );
  }
});

module.exports = DashboardIcon;