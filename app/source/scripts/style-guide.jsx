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
var UnmarkedPaper =require('./component/style-guide/unmarked-paper.component.jsx');
var AddSection =require('./component/style-guide/add-section.component.jsx');
var Table =require('./component/style-guide/table.component.jsx');
var InviteLink = require('./component/style-guide/invite-link.component.jsx');
var PageMachine =require('./component/style-guide/page-machine.component.jsx');
var GroupAvatar = require('./component/style-guide/group-avatar.component.jsx');

require('../less/group-title.less');
require('../less/list-group.less');
require('../less/group-event.less');
require('../less/discuss-frame.less');
require('../less/add-paper.less');
require('../less/discuss-subject.less');
require('../less/marked-paper.less');
require('../less/unmarked-paper.less');
require('../less/add-section.less');
require('../less/page-machine.less');
require('../less/group-title.less');
require('../less/group-avatar.less');

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
    <UnmarkedPaper />
    <AddSection />
    <Table />
    <DiscussList />
    <InviteLink />
    <PageMachine />
    <GroupAvatar />
  </div>,
  document.getElementById('style-guide')
);
