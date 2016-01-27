'use strict';

require('../less/homework.less');
var ReactDom = require('react-dom');
var Navigation = require('./component/navigation.component');
var HomeworkApp = require('./component/homework-app.component');
var HomeworkSidebar = require('./component/homework-sidebar.component');
var HomeworkContent = require('./component/homework-content.component');
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
          <HomeworkContent>
            <HomeworkIntroduction />
            <SubmissionIntroduction orderId={changeId()}/>
            <RunningResult />
          </HomeworkContent>
        </div>
      </HomeworkApp>
    </div>,
    document.getElementById('homework')
);