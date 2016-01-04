var Reflux = require('reflux');
var AccountActions = require('../actions/account-actions');
var request = require('superagent');

var AccountStore = Reflux.createStore({
  listenables: [AccountActions],

  onLoadUserInfo: function () {
    request.get('/account')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          var status = JSON.parse(res.text).status;
          var data = JSON.parse(res.text).data;

          if(status === 200) {
            this.trigger({
              school: data.school,
              name: data.name,
              gender: data.gender,
              major: data.major,
              degree: data.degree
            });
          }
        });
    request.get('/account/emailPhone')
           .set('Content-Type', 'application/json')
           .end((err, res) => {
             var status = JSON.parse(res.text).status;
             var data = JSON.parse(res.text).data;

             if(status === 200) {
               this.trigger({
                 email: data.email,
                 mobilePhone: data.mobilePhone
               });
             }
           });
  },

  onUpdateUserInfo: function (userData) {

    request.post('/account/update')
        .set('Content-Type', 'application/json')
        .send({
          data: userData
        })
        .end((err, req) => {
          if (req.body.status === 200) {
            alert('修改成功');
          }
        });
  }
});

module.exports = AccountStore;
