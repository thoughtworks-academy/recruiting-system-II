var ReactDom = require('react-dom');
var StartInfo = require('./component/start-info.component');
var Navigation = require('./component/navigation.component');
require('../less/start.less');

ReactDom.render(
    <StartInfo />,
    document.getElementById('start-container')
);

ReactDom.render(
    <Navigation />,
    document.getElementById('navigation')
);