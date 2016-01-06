var React = global.React = require('react');

var Alertcontent = React.createClass({

  render() {
    return (
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4">
            <div style={{visibility:this.props.disabled}} className="alert alert-success" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
              <span className="sr-only">Error:</span>
              {this.props.words}
            </div>
          </div>
        </div>
    );
  }
});

module.exports = Alertcontent;


