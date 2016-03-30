'use strict';

var DiscussList = React.createClass({
  render() {
    return(
      <div className="col-md-12 col-sm-12 col-xs-12 group-event">
        <h5>
          <div className="user-avatar">
            <img src={require('../../../images/1.pic_hd.jpg')} />
          </div>
          <div className="event-info">
            <a href="#">某某某</a>
            <small>04/01/2016 10:22</small>
          </div>
        </h5>
        <p className="col-md-2 col-sm-4 col-xs-6 discuss">
          这道题好难这道题好难这道题好难这道题好难这道题好难这道题好难这道题好难这道题好难
        </p>
        <hr className="col-md-12 col-sm-12 col-xs-12" />
      </div>
  );
  }
});
module.exports = DiscussList;