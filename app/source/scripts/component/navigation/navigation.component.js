'use strict';

var Navigation = React.createClass({
  render: function () {
    return (
        <nav>
          <div className="brand">
            <a href="/"><strong>思沃特训营</strong></a>
          </div>
          <div className="header-right">
            <a href="dashboard.html">控制台</a>
            <a href="/logout">退出</a>
          </div>
        </nav>
    );
  }
});

module.exports = Navigation;