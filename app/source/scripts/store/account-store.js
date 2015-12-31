var Reflux = require('reflux');
var AccountActions = require('../actions/account-actions');
var request = require('superagent');

var AccountStore = Reflux.createStore({
  listenables: [AccountActions],

  onLoadUserInfo: function () {
    request.get('/account')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          this.trigger({
            list:[
                res.body.school,
                res.body.name
            ]
          });
        })
  }
});

module.exports = AccountStore;
