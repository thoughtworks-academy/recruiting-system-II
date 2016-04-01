'use strict';

var GroupAvatar = React.createClass({

  getInitialState: function() {
    return {
      groupName: this.props.groupName || '前端学习群',
      groupAvatar: this.props.groupAvatar || ''

    }
  },

  render () {
      return(
        <div className="col-md-3 col-sm-4 col-xs-6 text-center" >
          <div className="avatar"><a href="#">
            {this.state.groupAvatar !== '' ?
              <img src={require(this.state.groupAvatar)} />:
              <span><i className="fa fa-group" /></span>
            }
          </a></div>
          <div><a href="#">
            {this.state.groupName}
          </a></div>
        </div>
      );
    }
});

module.exports = GroupAvatar;