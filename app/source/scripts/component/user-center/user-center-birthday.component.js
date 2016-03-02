'use strict';

var React = require('react');
var Reflux = require('reflux');
var Calendar = require('react-input-calendar');
var UserCenterActions = require('../../actions/user-center/user-center-actions');
var UserCenterStore = require('../../store/user-center/user-center-store');
var validate = require('validate.js');
var constraint = require('../../../../mixin/user-detail-constraint');
var getError = require('../../../../mixin/get-error');


var UserCenterBirthday = React.createClass({
  mixins: [Reflux.connect(UserCenterStore)],

  getInitialState: function() {
    return {
      birthday: '',
      birthdayError:''
    };
  },

  changeBirthday: function (time) {
    if(time !== null) {
      this.setState({birthdayError: ''});
    }
    UserCenterActions.changeBirthday(time);
  },

  validate: function(evt) {
    var value = evt.target.value;
    var valObj = {birthday: value};
    var result = validate(valObj, constraint);
    var error = getError(result, 'birthday');

    this.setState({birthdayError: error});
  },

  render: function () {
    var data = new Date();
    var today = (data.getMonth() + 1) + '/' + data.getDate() + '/' + data.getFullYear();

    return (
        <div>
          <div className='col-sm-4 col-md-4'>

          <Calendar
              inputFieldClass={this.state.birthdayError === '' ? '' : 'calendar'}
              format="DD/MM/YYYY"
              onChange={this.changeBirthday}
              date={this.state.birthday}
              maxDate={today}
              onBlur={this.validate}
          />
            </div>
          <div className={'error alert alert-danger' + (this.state.birthdayError === '' ? ' hide' : '')}
               role='alert'>
            <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>
            {this.state.birthdayError}
          </div>
        </div>

    );
  }
});

module.exports = UserCenterBirthday;