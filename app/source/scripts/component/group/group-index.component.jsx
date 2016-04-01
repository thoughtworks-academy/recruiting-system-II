'use strict';

var GroupTitle = require("../component/style-guide/group-title.component.jsx");
var GroupEvent = require("../component/style-guide/group-event.component.jsx");
var GroupAvatar = require("../component/style-guide/group-avatar.component.jsx");

var GroupIndex = React.createClass({

  getInitialState: function (){
    return {
      announcement: '公告'
    }
  },

  render() {
    return (
        <div>
          <div className="col-md-9">
            <GroupTitle titleName="群组公告" />
            <textarea value={this.state.announcement} readOnly />
            <GroupTitle titleName="群组事件" />
            <GroupEvent />
          </div>
          <div className="col-md-3">
            <GroupAvatar groupName="前端学习群" groupAvatar="../../../images/1.pic_hd.jpg"/>
          </div>
        </div>
    );
  }

});

module.exports = GroupIndex;