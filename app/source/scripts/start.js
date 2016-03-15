'use strict';

var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');
require('bootstrap/dist/js/bootstrap.min.js');
require('bootstrap/dist/css/bootstrap.min.css');
require('../less/start.less');
var StartInfo = require('./component/start-info/start-info.component');
var Navigation = require('./component/navigation/navigation.component');

ReactDom.render(
    <div>
      <header>
        <Navigation />
      </header>
      <StartInfo />
    </div>,
    document.getElementById('start-container')
);
