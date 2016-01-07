var React = global.React = require('react');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Alertcontent = require('./alert-content.component');
var Promise = require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);

var Dashboard = React.createClass({

  getInitialState: function () {
    return {
      isTip: false,
      puzzleEnabled: false,
      dojoEnabled: false,
      tipContent: ''
    }
  },

  componentDidMount: function () {

    agent.get('/dashboard')
      .set('Content-Type', 'application/json')
      .end()
      .then((res) => {
        this.setState({
          puzzleEnabled: res.body.isPaperCommited ? false : true,
          dojoEnabled: res.body.isPaperCommited
        })
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
    })
  },

  render() {

    var puzzleDisable = (this.state.puzzleEnabled === true ? 'enable' : 'disable');
    var dojoDisable = (this.state.dojoEnabled === true ? 'enable' : 'disable');


    return (

        <div className="app-list">
          <Alertcontent words={this.state.tipContent} disabled={this.state.isTip===true?'':'hidden'}/>
          <Row>
            <Col xs={12} sm={6} md={4} lg={4}>
              <a href="user-center.html" className="icon-view">
                <div className="icon-wrapper-enable">
                  <div className="icon-img">
                    <span className="glyphicon glyphicon-user" aria-hidden="true"/>
                  </div>
                  <div className="icon-name">
                    个人中心
                  </div>
                </div>
              </a>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <a href={this.state.puzzleEnabled===true ? 'logic-puzzle.html':'javascript:void(0)'}
                 className="icon-view"
                 onMouseOver={this.showPrompt}
                 onMouseOut={this.hidePrompt}>
                <div className={'icon-wrapper-'+puzzleDisable} name="logic">
                  <div className="icon-img" name="logic">
                    <span className="glyphicon glyphicon-education" aria-hidden="true"/>
                  </div>
                  <div className="icon-name">
                    逻辑题
                  </div>
                </div>
              </a>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
              <a href={this.state.dojoEnabled===true ? 'dojo.html':'javascript:void(0)'}
                 className="icon-view"
                 onMouseOver={this.showPrompt}
                 onMouseOut={this.hidePrompt}>
                <div className={'icon-wrapper-'+dojoDisable} name="dojo">
                  <div className="icon-img" name="dojo">
                    <span className="glyphicon glyphicon-road" aria-hidden="true"/>
                  </div>
                  <div className="icon-name">
                    编程题
                  </div>
                </div>
              </a>
            </Col>
          </Row>
        </div>

    );
  }
});

module.exports = Dashboard;