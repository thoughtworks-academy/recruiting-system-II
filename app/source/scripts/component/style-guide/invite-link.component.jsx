'use strict';

var InviteLink = React.createClass({
  render() {
    return(
      <div className="invite-link">
        邀请链接:
        <label><input className="form-control" type="text" readOnly/></label>
        <button className="btn btn-sm btn-default">复制</button>
      </div>
    )
  }
});

module.exports = InviteLink;