'use strict';

var GroupTitle = React.createClass({

  getInitialState: function() {
    return ({
      titleName: '群组名称'
    })
  },
  render() {
    return (
      <div className="group-title">
        <h4>{this.state.titleName}</h4>
        <hr/>
      </div>
    );
  }
});

module.exports = GroupTitle;
