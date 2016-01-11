'use strict';

var React = require('react');

var UserCenterGender = React.createClass({
  genderChange:function(evt) {
    this.props.onGenderChange(evt);
  },

  genderValidate: function () {
    this.props.onValidate();
  },

  render: function() {
    var tags = [
      {mark: 'M', genderName: 'male', label: '男'},
      {mark: 'F', genderName: 'female', label: '女'}
    ];
    return (
        <div>
          <div className="col-sm-4 col-md-4">
            {tags.map((item, index) => {
              return (
                  <div key={index}>
                    <input type="radio" name={item.mark} className="gender" onChange={this.genderChange}
                           checked={this.props.gender === item.mark ? "checked" : ""} id={item.genderName} onClick={this.genderValidate}/>
                    <label htmlFor={item.genderName}>{item.label}</label>
                  </div>
              );
            })}

          </div>
          <div className={"error alert alert-danger" + (this.props.genderError === true ? '' : ' hide')} role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            请选择性别
          </div>
        </div>
    );
  }
});

module.exports = UserCenterGender;