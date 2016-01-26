'use strict';

var Reflux = require('reflux');
var HomeworkActions = require('../actions/homework-actions');
var superAgent = require('superagent');
var constant = require('../../../mixin/constant');

var submissionIntroductionStore = Reflux.createStore({
  listenables: [HomeworkActions],

  onChangeOrderId: function (clickNumber) {
    this.trigger({
      currentHomeworkNumber: clickNumber,
      githubUrlError: '',
      disableBranches: true,
      branches: [],
      defaultBranch: '',
      githubUrl: '',
      githubBranch: '',
      submited: false,
      showIcon: false
    });
  },

  onSubmitUrl: function (url, branch, orderId) {
    superAgent.post('homework/save')
        .set('Content-Type', 'application/json')
        .send({orderId: orderId, userAnswerRepo: url, branch: branch})
        .end((err, res) => {
          if (res.body.status === constant.httpCode.FORBIDDEN) {
          }
          if (res.body.status === constant.httpCode.OK) {
            this.trigger({submited: true});
          }
        });
  },

  onGetBranches: function (url) {
    this.trigger({showIcon:true});
    superAgent.get('/homework/get-branches')
        .set('Content-Type', 'application/json')
        .query({url: url})
        .end((err, res)=> {
          if (res.body.message === 'Not Found') {
            alert('repo or user not found! PLZ check ur url!');
            this.trigger({branches: []});
          } else {
            var branches = res.body.data.map((branch)=>{
              return branch.name;
            });
            if(branches.indexOf('master') !== -1){
              var index = branches.indexOf('master');
              branches.splice(index,1);
              branches.unshift('master');
            }
            this.trigger({
              branches: branches,
              defaultBranch: branches[0],
              showIcon:false
            });
          }
        });
  }
});

module.exports = submissionIntroductionStore;