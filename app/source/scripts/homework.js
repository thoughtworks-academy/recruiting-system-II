'use strict';

require('../less/homework.less');
var ReactDom = require('react-dom');
var Navigation = require('./component/navigation.component');
var HomeworkApp = require('./component/homework-app.component');
var HomeworkSidebar = require('./component/homework-sidebar.component');
var Homework = require('./component/homework.component');
var HomeworkAction = require('./actions/homework-actions');

function changeNumber(){
  var homeworkNumber;
  var getNumber = location.hash.substr(1);

  if(getNumber === '') {
    homeworkNumber = 1;
  }else {
    homeworkNumber = parseInt(getNumber);
  }
  return {
    currentHomeworkNumber: homeworkNumber
  };
}

ReactDom.render(
    <div>
      <header>
        <Navigation />
      </header>
      <HomeworkApp>
        <div className="row">
          <HomeworkSidebar/>
          <Homework />
        </div>
      </HomeworkApp>
    </div>,
    document.getElementById('homework')
);