'use strict';


var Navigation = require('../component/navigation/navigation.component.jsx');
var Account = require('../component/reuse/get-account.component.jsx');

function asyncRenderAction(action, callBack) {
  var element;

  if("error" === action) {
    element = <div>出错了</div>;
    callBack(element);
  } else {
    require.ensure([
      "../component/group/group-sidebar.component.jsx",
      "../component/group/group-index.component.jsx"
    ], function(require) {
      var GroupIndex = require("../component/group/group-index.component.jsx");
      var contentEnum = {
        index: <GroupIndex />
      };

      var GroupSidebar = require("../component/group/group-sidebar.component.jsx");
      element =
      <div>
        <GroupSidebar />
        <div className="col-md-9">
          <div id="content">{contentEnum[action]}</div>
        </div>
      </div>;
      callBack(element);

    })
  }
}

function render(action, next) {

  asyncRenderAction(action, function(innerElement) {
    var content =
    <div>
      <header>
        <Navigation>
          <Account />
        </Navigation>
      </header>
      {innerElement}
    </div>;
    ReactDom.render(
        content,
        document.getElementById('group')
    );
    next();
  });
}

module.exports = {
  render: function (ctx, next) {
    var action = ctx.params.action || "error";
    render(action, next);
  }
};