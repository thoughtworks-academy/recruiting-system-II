'use strict';

var GroupAvatar = React.createClass({
  render () {
    return (
        <div>
          <div className="col-md-3 col-sm-4 col-xs-6 text-center">
            <div className="avatar">
              <img src={require("../../../images/1.pic_hd.jpg")} />
            </div>
            <div>很长的群组名称</div>
          </div>
          <div className="col-md-3 col-sm-4 col-xs-6 text-center">
            <div className="avatar">
              <span><i className="fa fa-plus text-success" /></span>
            </div>
            <div>群组名称 (要有字符数量限制)</div>
          </div>
        </div>
    );
  }
});

module.exports = GroupAvatar;