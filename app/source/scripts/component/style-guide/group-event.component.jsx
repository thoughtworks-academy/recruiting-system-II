'use strict';

var GroupEvent = React.createClass({

  render() {
    return (
      <div>
        <div className="col-md-12 col-sm-12 col-xs-12 group-event">
          <h5>
            <div className="user-avatar">
              <img src={require('../../../images/1.pic_hd.jpg')}/>
            </div>
            <div className="event-info">
              <a href="#">某某某</a>
              <small>04/01/2016 10:22</small>
              <span>发布了一条讨论</span>
            </div>
          </h5>
          <a href="#">
            <p className="col-md-2 col-sm-4 col-xs-6">
              这道题好难这道题好难这道题好难这道题好难这道题好难这道题好难这道题好难这道题好难
            </p>
          </a>
          <hr className="col-md-12 col-sm-12 col-xs-12"/>
        </div>

        <div className="col-md-12 col-sm-12 col-xs-12 group-event">
          <h5>
            <div className="user-avatar">
              <img src={require('../../../images/1.pic_hd.jpg')}/>
            </div>
            <div className="event-info">
              <a href="#"><em>管理员: </em>某某某</a>
              <small>04/01/2016 10:22</small>
              <span>增加了一张新试卷《面向对象 Step By Step》</span>
            </div>
          </h5>
          <hr className="col-md-12 col-sm-12 col-xs-12"/>
        </div>

        <div className="col-md-12 col-sm-12 col-xs-12 group-event">
          <h5>
            <div className="user-avatar">
              <img src={require('../../../images/1.pic_hd.jpg')}/>
            </div>
            <div className="event-info">
              <a href="#">某某某</a>
              <small>04/01/2016 10:22</small>
              <span>加入了群组</span>
            </div>
          </h5>
          <hr className="col-md-12 col-sm-12 col-xs-12"/>
        </div>

        <div className="col-md-12 col-sm-12 col-xs-12 group-event">
          <h5>
            <div className="user-avatar">
              <img src={require('../../../images/1.pic_hd.jpg')}/>
            </div>
            <div className="event-info">
              <a href="#">某某某</a>
              <small>04/01/2016 10:22</small>
              <span>完成了试卷《集合运算》</span>
            </div>
          </h5>
          <hr className="col-md-12 col-sm-12 col-xs-12"/>
        </div>
      </div>
    );
  }
});

module.exports = GroupEvent;
