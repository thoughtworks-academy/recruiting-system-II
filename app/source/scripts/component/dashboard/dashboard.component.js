'use strict';

var React = global.React = require('react');
var Reflux = require('reflux');

var DashboardActions = require('../../actions/dashboard-actions');
var DashboardStore = require('../../store/dashboard-store');

var Dashboard = React.createClass({

  mixins: [Reflux.connect(DashboardStore)],

  componentDidMount: function () {
    DashboardActions.getStatus();
  },

  render() {

    return (

      <div className="app-list container-fluid">
        {this.props.children}
      </div>

    );
  }
});

module.exports = Dashboard;