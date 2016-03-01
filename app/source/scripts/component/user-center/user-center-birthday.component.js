'use strict';

var React = require('react');
var Reflux = require('reflux');
var Calendar = require('react-input-calendar');

var UserCenterBirthday = React.createClass({

  render: function () {

    return (
        <div>
          <Calendar
              format="DD/MM/YYYY"
          />
        </div>

    );
  }
});

module.exports = UserCenterBirthday;