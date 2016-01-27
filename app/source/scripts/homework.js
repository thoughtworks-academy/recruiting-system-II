'use strict';

require('../less/homework.less');
var Reflux = require('reflux');
var HomeworkAppStore = require('./store/homework-app-store');
var ReactDom = require('react-dom');
var Navigation = require('./component/navigation.component');
var HomeworkApp = require('./component/homework-app.component');
var HomeworkSidebar = require('./component/homework-sidebar.component');
var Tabs = require('react-bootstrap/lib/Tabs');
var Tab = require('react-bootstrap/lib/Tab');
var HomeworkIntroduction = require('./component/homework-introduction.component');
var SubmissionIntroduction = require('./component/submission-introduction.component');
var RunningResult = require('./component/running-result.component');
var HomeworkAction = require('./actions/homework-actions');

function changeId() {
  var orderId;
  var getId = location.hash.substr(1);
  if (getId === '') {
    orderId = 1;
  } else {
    orderId = parseInt(getId);
  }
  return  orderId;
}

window.onpopstate = function () {
  var number = parseInt(location.hash.substr(1));
  HomeworkAction.changeOrderId(number);
};

function onAction(number) {
  HomeworkAction.changeOrderId(number);
  history.pushState(null, '', '#' + number);
}

ReactDom.render(
    <div>
      <header>
        <Navigation />
      </header>
      <HomeworkApp orderId={changeId()}>
        <div className="row">
          <HomeworkSidebar onAction={onAction} orderId={changeId()}/>
          <div className="col-md-9 col-sm-9 col-xs-12">
            <div className="content">
              <Tabs defaultActiveKey={0} animation={false} getShowStatus={true}>
                <Tab eventKey={0} title="题目说明"><HomeworkIntroduction /></Tab>
                <Tab eventKey={1} title="提交说明"><SubmissionIntroduction orderId={changeId()}/></Tab>
                <Tab eventKey={2} title="运行结果"><RunningResult /></Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </HomeworkApp>
    </div>,
    document.getElementById('homework')
);