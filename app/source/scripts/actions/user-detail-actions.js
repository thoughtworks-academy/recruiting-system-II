var Reflux = require('reflux');

var UserDetailActions = Reflux.createActions([
  'loadUserDetail',
  'updateUserDetail'
]);

module.exports = UserDetailActions;
