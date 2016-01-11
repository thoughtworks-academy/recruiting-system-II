var ReactDom = require('react-dom');
var Navigation = require('./component/navigation.component');
require('../less/progress.less');

ReactDom.render(
    <Navigation />,
    document.getElementById('navigation')
);
