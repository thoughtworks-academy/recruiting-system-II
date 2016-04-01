'use strict';


var Navigation = require('../component/navigation/navigation.component.jsx');
var Account = require('../component/reuse/get-account.component.jsx');

require('../../less/list-group.less');
require('../../less/group-title.less');


function asyncRenderAction(action, callBack) {
  var element;

  if("error" === action) {
    element = <div>出错了</div>;
    callBack(element);
  } else {
    require.ensure([
      "../component/style-guide/list-group.component.jsx",
      "../component/style-guide/group-title.component.jsx"
    ], function(require) {
      var GroupTitle = require("../component/style-guide/group-title.component.jsx");
      var contentEnum = {
        index: <GroupTitle />
      };

      var ListGroup = require("../component/style-guide/list-group.component.jsx");
      element =
      <div>
        <div className="col-md-3">
          <ListGroup />
        </div>
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