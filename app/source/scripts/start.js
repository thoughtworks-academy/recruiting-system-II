var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');
var StartInfo = require('./component/start-info.component');
require('bootstrap');

ReactDom.render(
    <StartInfo />,
    document.getElementById('start-container')
);
