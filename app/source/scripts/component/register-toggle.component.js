var React = require('react');
var registerToggle = React.createClass({

   toggleState: function() {
      this.props.onStateChange();
   },

   render: function () {
      return (
          <li className="toggle" onClick={this.toggleState}>
             {this.props.isShowToggle ? '隐藏密码' : '显示密码'}</li>
      )
   }
});

module.exports = registerToggle;