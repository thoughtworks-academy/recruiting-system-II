'use strict';

require('bootstrap/dist/css/bootstrap.min.css');
var ReactDom = require('react-dom');
var StartInfo = require('./component/start-info/start-info.component');
var Navigation = require('./component/navigation/navigation.component');
require('../less/start.less');

ReactDom.render(
    <div>
      <header>
        <Navigation />
      </header>
      <StartInfo />
    </div>,
    document.getElementById('start-container')
);
