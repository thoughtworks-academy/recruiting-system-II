var React = global.React = require('react');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Alertcontent = require('./alert-content.component');
var Promise = require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);
var DashboardIcon = require('./dashboard-icon.component');

var Dashboard = React.createClass({

  getInitialState: function () {
    return {
      isTip: false,
      puzzleEnabled: false,
      dojoEnabled: false,
      tipContent: ''
    };
  },

  componentDidMount: function () {

    agent.get('/dashboard')
      .set('Content-Type', 'application/json')
      .end()
      .then((res) => {
        this.setState({
          puzzleEnabled: res.body.isPaperCommited ? false : true,
          dojoEnabled: res.body.isPaperCommited
        });
      });
  },

  showPrompt: function (event) {
    var iconName = event.target.parentNode.getAttribute('name');
    if (iconName === 'logic' && this.state.puzzleEnabled === false) {
      this.setState({
        isTip: true,
        tipContent: '您的逻辑题已经完成'
      });
      return;
    }

    if (iconName === 'dojo' && this.state.dojoEnabled === false) {

      this.setState({
        isTip: true,
        tipContent: this.state.puzzleEnabled === true ? '请先完成逻辑题' : '您的编程题已完成'
      });
      return;
    }

  },

  hidePrompt: function () {
    this.setState({
      isTip: false
    });
  },

  render() {
    var iconInfos = [];

    var PuzzleHref = this.state.puzzleEnabled===true ? 'start.html':'javascript:void(0)';
    var dojoHref = this.state.dojoEnabled===true ? 'dojo.html':'javascript:void(0)';

    var puzzleDisable = (this.state.puzzleEnabled === true ? 'enable' : 'disable');
    var dojoDisable = (this.state.dojoEnabled === true ? 'enable' : 'disable');

    var userCenterInfo = {
      title: "个人中心",
      href: "user-center.html",
      isEnabled: "enable",
      name: "userCenter",
      glyphicon: "glyphicon-user"
    };

    var logicPuzzleInfo = {
      title: "逻辑题",
      href: PuzzleHref,
      isEnabled: puzzleDisable,
      name: "logic",
      glyphicon: "glyphicon-education"
    };

    var dojoPuzzleInfo = {
      title: "编程题",
      href: dojoHref,
      isEnabled: dojoDisable,
      name: "dojo",
      glyphicon: "glyphicon-road"
    };

    iconInfos.push(userCenterInfo, logicPuzzleInfo, dojoPuzzleInfo);

    return (

      <div className="app-list">
        <Alertcontent words={this.state.tipContent} disabled={this.state.isTip===true?'':'hidden'}/>
        <Row>

          {
            iconInfos.map((item, rowId) => {
              return <DashboardIcon info={item}
                                    key={rowId}
                                    onShowPrompt={this.showPrompt}
                                    onHidePrompt={this.hidePrompt}/>
            })
          }
        </Row>
      </div>

    );
  }
});

module.exports = Dashboard;