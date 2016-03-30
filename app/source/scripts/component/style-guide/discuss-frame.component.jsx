'use strict';

var DiscussFrame = React.createClass({
  getInitialState: function () {
    return {
      isContent: true
    }
  },
  changeState: function (mark) {
    if(mark === 'content') {
      this.setState({isContent: true});
    }else {
      this.setState({isContent: false});
    }
  },

  render: function() {
    return (
      <form className="form-horizontal col-md-12 col-sm-12 col-xs-12" >
        <div className="discuss-part">
          主题:<input className="form-control" type="text" placeholder="请输入主题"/>
        </div>
        <div className="discuss-type">
          <div className={"discuss-item" + (this.state.isContent ? ' selected' : '')} onClick={this.changeState.bind(null, 'content')}>内容</div>
          <div className={"discuss-item" + (this.state.isContent ? '' : ' selected')} onClick={this.changeState.bind(null, 'preview')}>预览</div>
        </div>
        <div className="discuss-frame">
          <span className={"discuss-arrow" + (this.state.isContent ? '' : ' preview')}></span>
          <div className="discuss-textarea"></div>
          <div className="discuss-button">
            <input type="button" value="发布"/>
          </div>
        </div>
      </form>
    )
  }
});

module.exports = DiscussFrame;
