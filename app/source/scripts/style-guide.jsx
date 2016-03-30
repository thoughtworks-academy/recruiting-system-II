'use strict';

var GroupTitle = require('./component/style-guide/group-title.component.jsx');
var ListGroup = require('./component/style-guide/list-group.component.jsx');
var GroupEvent = require('./component/style-guide/group-event.component.jsx');
var DiscussFrame = require('./component/style-guide/discuss-frame.component.jsx');
var Arrows = require('./component/style-guide/arrows.component.jsx');
var AddPaper = require('./component/style-guide/add-paper.component.jsx');
var DiscussSubject = require('./component/style-guide/discuss-subject.component.jsx');
var DiscussList = require('./component/style-guide/discuss-list.component.jsx');
var MarkedPaper =require('./component/style-guide/marked-paper.component.jsx');

require('../less/group-title.less');
require('../less/list-group.less');
require('../less/group-event.less');
require('../less/discuss-frame.less');
require('../less/add-paper.less');
require('../less/discuss-subject.less');
require('../less/marked-paper.less');

ReactDom.render(
  <div>
    <GroupTitle />
    <ListGroup />
    <GroupEvent />
    <DiscussFrame />
    <Arrows />
    <AddPaper />
    <DiscussSubject />
    <DiscussList />
    <MarkedPaper />
  </div>,
  document.getElementById('style-guide')
);
