'use strict';

var React = require('react');
var Reflux = require('reflux');
var Calendar = require('react-input-calendar');

var UserCenterBirthday = React.createClass({

  render: function () {
    var data = new Date();
    var today = (data.getMonth() + 1) + '/' + data.getDate() + '/' + data.getFullYear();

    return (
        <div>
          <Calendar
              format="DD/MM/YYYY"
              maxDate={today}
          />
        </div>

    );
  }
});

module.exports = UserCenterBirthday;