'use strict';

var $ = require('jquery');
require('../less/index.less');
$(function () {
  [1, 2, 3, 4, 5, 6, 7].forEach((v, k) => {
    console.log(v);
  });
});
