var $ = global.jQuery = require('jquery');
var ReactDom = require('react-dom');

require('bootstrap');
var request = require('superagent');
var RegisterApp = require('./component/register-app.component');

ReactDom.render(
    <RegisterApp />,
    document.getElementById('register-container')
);

$(function() {
  $('#agreementModal').on('show.bs.modal', function() {
    $('.modal .modal-body').css('overflow-y', 'auto').css('max-height', $(window).height() * 0.7);
  });

  $('[name=loginFailed]').hide();
});
