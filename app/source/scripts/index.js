'use strict';
require('../less/index.less');

var ScrollToTop = require('react-scroll-up');
var style = {
  position: 'fixed',
  bottom: 400,
  right: 30,
  cursor: 'pointer',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'linear',
  transitionDelay: '0s'
};
var showUnder = 600;

var HeadRight = require('./component/index/head-right.component');

ReactDom.render(
    <div>
      <HeadRight />
      <ScrollToTop showUnder={showUnder} style={style}>
        <div id="scroll-button">
          <i className="fa fa-angle-double-up fa-3x"></i>
        </div>
      </ScrollToTop>
    </div>,
    document.getElementById('head-right')
);
