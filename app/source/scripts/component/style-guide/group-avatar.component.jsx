'use strict';

var GroupAvatar = React.createClass({

  getInitialState: function() {
    return ({
      groupList: [
        {
          groupName: '前端学习群',
          groupAvatar: require("../../../images/1.pic_hd.jpg")
        },
        {
          groupName: '数据库学习群',
          groupAvatar: ''
        }
      ]
    })
  },

  render () {
    var groupList = this.state.groupList.map((item, index) => {
      return(
        <div className="col-md-3 col-sm-4 col-xs-6 text-center" key={index}>
          <div className="avatar"><a href="#">
            {item.groupAvatar !== '' ?
              <img src={item.groupAvatar} />:
              <span><i className="fa fa-group" /></span>
            }
          </a></div>
          <div><a href="#">
            {item.groupName}
          </a></div>
        </div>
      );
    });
    return (
        <div>
          {groupList}
          <div className="col-md-3 col-sm-4 col-xs-6 text-center">
            <div className="avatar"><a href="#">
              <span><i className="fa fa-plus text-success" /></span>
            </a></div>
            <div><a href="#">
              添加群组
            </a></div>
          </div>
        </div>
    );
  }
});

module.exports = GroupAvatar;