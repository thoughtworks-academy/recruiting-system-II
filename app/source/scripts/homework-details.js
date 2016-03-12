'use strict';

var ReactDom = require('react-dom');
var Navigation = require('./component/navigation/navigation.component');
var $ = global.jQuery = require('jquery');
require('bootstrap');
require('../less/homework-details.less');
var HomeworkDetailsComponent = require('./component/homework-details/homework-details-component');

ReactDom.render(
    <div className="container-fluid">
      <HomeworkDetailsComponent/>
    </div>,
    document.getElementById('homework-details')
);