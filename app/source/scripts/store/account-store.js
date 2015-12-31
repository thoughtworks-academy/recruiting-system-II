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
            id: res.body.id,
            school: res.body.school,
            name: res.body.name,
            mobilePhone: res.body.mobilePhone,
            email: res.body.email,
            gender: res.body.gender,
            major: res.body.major,
            grade: res.body.grade,
            birthday: res.body.birth
          });
        })
  }
});

module.exports = AccountStore;
