'use strict';

var constant = require('../mixin/constant');

var errorHandler = function(req) {
  req.on('response', function (res) {
    console.log(res);
    if(res.statusCode === constant.httpCode.INTERNAL_SERVER_ERROR || res.status === constant.httpCode.INTERNAL_SERVER_ERROR){
      addErrorMessage();
    }
  });
};

function addErrorMessage() {
  var errorMessageBlock = document.createElement("DIV");
  errorMessageBlock.setAttribute("class","alert alert-danger alert-dismissible");
  errorMessageBlock.setAttribute("id","alert");
  errorMessageBlock.setAttribute("role","alert");
  errorMessageBlock.style.marginBottom = 0;

  var closeButton = document.createElement("BUTTON");
  closeButton.setAttribute("class","close");
  closeButton.setAttribute("type","button");
  closeButton.setAttribute("data-dismiss","alert");
  closeButton.setAttribute("aria-label","Close");

  var span = document.createElement("SPAN");
  span.setAttribute("aria-hidden","true");

  var textNode = document.createTextNode("×");
  
  var warningMessage = document.createTextNode("Server connect error!");

  span.appendChild(textNode);
  closeButton.appendChild(span);
  errorMessageBlock.appendChild(closeButton);
  errorMessageBlock.appendChild(warningMessage);
  

  document.body.insertBefore(errorMessageBlock,document.body.childNodes[0]);

  console.log(errorMessageBlock);
}

module.exports = errorHandler;