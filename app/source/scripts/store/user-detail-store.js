var Reflux = require('reflux');
var UserDetailActions = require('../actions/user-detail-actions');
var request = require('superagent');

var UserDetailStore = Reflux.createStore({
  listenables: [UserDetailActions],

  onLoadUserDetail: function () {
    request.get('/user-detail')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          if(err || res.status !== 200) {
            return;
          }
          this.trigger(res.body.data);
        });
  },

  onUpdateUserDetail: function (userData) {

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

module.exports = UserDetailStore;
