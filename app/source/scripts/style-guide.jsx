'use strict';

var GroupTitle = require('./component/style-guide/group-title.component.jsx');
var ListGroup = require('./component/style-guide/list-group.component.jsx');
var GroupEvent = require('./component/style-guide/group-event.component.jsx');
require('../less/group-title.less');
require('../less/list-group.less');
require('../less/group-event.less');

ReactDom.render(
  <div>
    <GroupTitle />
    <ListGroup />
    <GroupEvent />
  </div>,
  document.getElementById('style-guide')
);