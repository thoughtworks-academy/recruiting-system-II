'use strict';

require('../less/homework.less');
var ReactDom = require('react-dom');
var Navigation = require('./component/navigation.component');
var HomeworkApp = require('./component/homework-app.component');

ReactDom.render(
    <Navigation />,
    document.getElementById('navigation')
);

ReactDom.render(
    <HomeworkApp />,
    document.getElementById('homework')
);