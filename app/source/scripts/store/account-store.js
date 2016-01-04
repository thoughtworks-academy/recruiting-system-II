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
            list: [
              res.body.school,
              res.body.name
            ]
          });
        })
  },
  onUpdateUserInfo: function (userData) {

    request.post('/account/update')
        .set('Content-Type', 'application/json')
        .send({
          data: userData
        })
        .end((err, req) => {
          if(req.body.status === 200) {
            alert('修改成功');
          }
        });
  }
});

module.exports = AccountStore;
