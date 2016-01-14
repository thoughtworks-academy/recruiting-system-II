'use strict';

var React = global.React = require('react');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

var _xs = 12, _sm = 6, _md = 4, _lg = 4;

var DashboardIcon = React.createClass({
  render() {

    return (
      <Col xs={_xs} sm={_sm} md={_md} lg={_lg}>
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