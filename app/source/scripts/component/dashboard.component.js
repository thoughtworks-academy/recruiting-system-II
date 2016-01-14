'use strict';

var React = global.React = require('react');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Alertcontent = require('./alert-content.component');
var agent = require('superagent-promise')(require('superagent'), Promise);
var DashboardIcon = require('./dashboard-icon.component');

var Dashboard = React.createClass({

  getInitialState: function () {
    return {
      isTip: false,
      puzzleEnabled: false,
      programmeEnabled: false,
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
          programmeEnabled: res.body.isPaperCommited
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

    if (iconName === 'programme' && this.state.programmeEnabled === false) {

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

    var PuzzleHref = (this.state.puzzleEnabled===true ? 'start.html':'#');
    var programmeHref = (this.state.programmeEnabled===true ? 'programme.html':'#');

    var puzzleDisable = (this.state.puzzleEnabled === true ? 'enable' : 'disable');
    var programmeDisable = (this.state.programmeEnabled === true ? 'enable' : 'disable');

    var userCenterInfo = {
      title: '个人中心',
      href: 'user-center.html',
      isEnabled: 'enable',
      name: 'userCenter',
      glyphicon: 'glyphicon-user'
    };

    var logicPuzzleInfo = {
      title: '逻辑题',
      href: PuzzleHref,
      isEnabled: puzzleDisable,
      name: 'logic',
      glyphicon: 'glyphicon-education'
    };

    var programmePuzzleInfo = {
      title: '编程题',
      href: programmeHref,
      isEnabled: programmeDisable,
      name: 'programme',
      glyphicon: 'glyphicon-road'
    };

    iconInfos.push(userCenterInfo, logicPuzzleInfo, programmePuzzleInfo);

    return (

      <div className="app-list">
        <Alertcontent words={this.state.tipContent} disabled={this.state.isTip===true?'':'hidden'}/>
        <Row>

          {
            iconInfos.map((item, rowId) => {
              return <DashboardIcon info={item}
                                    key={rowId}
                                    onShowPrompt={this.showPrompt}
                                    onHidePrompt={this.hidePrompt}/>;
            })
          }
        </Row>
      </div>

    );
  }
});

module.exports = Dashboard;