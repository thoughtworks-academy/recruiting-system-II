var React = require('react');

var UserCenterGender = React.createClass({
  genderChange:function(evt) {
    this.props.onStateChange(evt);
  },

  genderValidate: function () {
    this.props.onValidate();
  },

  render: function() {
    return (
        <div>
          <div className="col-sm-4 col-md-4" onClick={this.genderValidate}>
            <input type="radio" name="M" className="gender" onChange={this.genderChange}
                   checked={this.props.gender === "M" ? "checked" : ""} id="man"/>
            <label htmlFor="man">男</label>
            <input type="radio" name="F" className="gender" onChange={this.genderChange}
                   checked={this.props.gender === "F" ? "checked" : ""} id="female"/>
            <label htmlFor="female">女</label>

          </div>
          <div className={"error alert alert-danger" + (this.props.genderError === true ? '' : ' hide')} role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            请选择性别
          </div>
        </div>
    )
  }
});

module.exports = UserCenterGender;