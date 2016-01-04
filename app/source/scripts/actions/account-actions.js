var Reflux = require('reflux');

var AccountActions = Reflux.createActions([
  'loadUserInfo',
  'updateUserInfo'
]);

module.exports = AccountActions;
