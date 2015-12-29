var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');
var StartInfo = require('./component/start-info.component');
require('bootstrap');
require('../less/start.less');

ReactDom.render(
    <StartInfo />,
    document.getElementById('start-container')
);
