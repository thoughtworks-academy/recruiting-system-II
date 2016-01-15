'use strict';

require('../less/programme.less');
var ReactDom = require('react-dom');
var Navigation = require('./component/navigation.component');
var ProgrammeApp = require('./component/programme-app.component');

ReactDom.render(
    <Navigation />,
    document.getElementById('navigation')
);

ReactDom.render(
    <ProgrammeApp />,
    document.getElementById('programme')
);