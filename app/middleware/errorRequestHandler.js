'use strict';
var path = require('path');

module.exports = function(req, res, next){
  var is_ajax_request = req.xhr;

  if(is_ajax_request){
    res.send({
      status: 404,
      message: 'Error Request !'
    });
  }else {
    res.sendFile(path.join(__dirname, '../public', '404.html'))
  }
};
