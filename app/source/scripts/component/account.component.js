var React = global.React = require('react');
var ReactDom = require('react-dom');
var request = require('superagent');
var Input = require('react-bootstrap/lib/Input');
var AccountActions = require('../actions/account-actions');
var AccountStore = require('../store/account-store');
var Reflux = require('reflux');

var Account = React.createClass({
  mixins: [Reflux.connect(AccountStore)],

  getInitialState: function () {
    return {
      list:[' ', ' ',' ', ' ', ' ', ' ', ' ']
    }
  },

  componentDidMount: function () {
    AccountActions.loadUserInfo();
  },

  handleChange: function(evt){
    for(var i = 0; i < this.state.list.length; i ++){
      var newState = evt.target.value;

      this.setState({list: this.state.list.splice(i,1,newState)});
    }
  },

  update: function(evt) {
    evt.preventDefault();
    var userData = [];
    var items = ['School', 'Name', 'MobilePhone', 'Email', 'Gender', 'Major', 'Birthday'];

    items.forEach((item, index) => {
      userData.push(ReactDom.findDOMNode(this.refs.item));
    });

    AccountActions.updateUserInfo(userData);
  },

  render() {
    var tags = [
      {chinese: '学校', english: 'School'},
      {chinese: '姓名', english: "Name"},
      {chinese: '手机', english: 'MobilePhone'},
      {chinese: '邮箱', english: "Email"},
      {chinese: '性别', english: 'Gender'},
      {chinese: '专业', english: "Major"},
      {chinese: '出生年月', english: "Birthday"}
    ];

    return (
        <div id="account-info">
          {tags.map((item, index) => {
            return (
                <div className="form-group" key={index}>
                  <label htmlFor={"input" + item.english}
                         className="col-sm-4 col-md-4 control-label">{item.chinese}</label>
                  <div className="col-sm-4 col-md-4">
                    <input type="text" className="form-control" id={"input" + item.english}
                           placeholder={item.chinese === '出生年月' ? 'YYYY-MM-DD' : item.chinese}
                           disabled={item.english === "Email" || item.english === "MobilePhone" ? 'disabled' : ''}
                           value={this.state.list[index]} onChange={this.handleChange} ref={item.english}/>
                  </div>
                  <div></div>
                </div>
            )
          })}

          <div className="form-group">
            <label htmlFor="inputDegree" className="col-sm-4 col-md-4 control-label">学历学位</label>
            <div className="col-sm-4 col-md-4 degree">
              <Input type="select" placeholder="学历学位">
                <option value="regular">本科</option>
                <option value="master">硕士</option>
                <option value="doctor">博士</option>
              </Input>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-4 col-sm-4 col-md-offset-4 col-md-4">
              <button type="submit" className="btn btn-default" onClick={this.update}>保存</button>
            </div>
          </div>
        </div>
    )
  }
});

module.exports = Account;