'use strict';

var React = global.React = require('react');
var Reflux = require('reflux');

var DashbordActions = require('../actions/dashbord-actions');
var DashbordStore = require('../store/dashbord-store');

var Dashboard = React.createClass({

  mixins: [Reflux.connect(DashbordStore)],

  componentDidMount: function () {
    DashbordActions.getStatus();
  },

  render() {

    return (

      <div className="app-list">
        {this.props.children}
      </div>

    );
  }
});

module.exports = Dashboard;