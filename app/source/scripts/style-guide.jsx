'use strict';

var GroupTitle = require('./component/style-guide/group-title.component.jsx');
var ListGroup = require('./component/style-guide/list-group.component.jsx');

require('../less/group-title.less');
require('../less/list-group.less');

ReactDom.render(
  <div>
    <GroupTitle></GroupTitle>
    <ListGroup></ListGroup>
  </div>,
  document.getElementById('style-guide')
);