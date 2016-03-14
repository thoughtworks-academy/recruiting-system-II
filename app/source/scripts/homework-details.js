'use strict';

var ReactDom = require('react-dom');
require('bootstrap/dist/css/bootstrap.min.css');
require('../less/homework-details.less');
var HomeworkDetailsComponent = require('./component/homework-details/homework-details-component');

ReactDom.render(
    <div className="container-fluid">
      <HomeworkDetailsComponent/>
    </div>,
    document.getElementById('homework-details')
);