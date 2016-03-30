'use strict';

var GroupTitle = require('./component/style-guide/group-title.component.jsx');
require('../less/group-title.less');

ReactDom.render(
  <div>
    <GroupTitle></GroupTitle>
  </div>,
  document.getElementById('style-guide')
);