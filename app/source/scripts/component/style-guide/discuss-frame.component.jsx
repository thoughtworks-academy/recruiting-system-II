'use strict';

var DiscussFrame = React.createClass({
  render: function() {
    return (
      <form className="form-horizontal col-md-12 col-sm-12 col-xs-12" >
        <div className="discuss-part">
          主题:<input className="form-control" type="text" placeholder="请输入主题"/>
        </div>
        <div className="discuss-part">
          内容:
          <div className="bs-example bs-example-tabs" data-example-id="togglable-tabs">
              <ul id="myTabs" className="nav nav-tabs" role="tablist">
                <li role="presentation" className="active"><a href="#content" id="content-tab" role="tab" data-toggle="tab" aria-controls="content" aria-expanded="true">内容</a></li>
                <li role="presentation"><a href="#preview" role="tab" id="preview-tab" data-toggle="tab" aria-controls="preview">预览</a></li>
              </ul>
              <div id="myTabContent" className="tab-content discuss-content">
                <div role="tabpanel" className="tab-pane fade in active" id="content" aria-labelledby="content-tab">
                  内容
                </div>
                <div role="tabpanel" className="tab-pane fade" id="preview" aria-labelledby="preview-tab">
                  预览
                </div>
              </div>
            </div>
        </div>
        <div className="discuss-button">
          <button type="button" className="btn btn-default">发布</button>
        </div>
      </form>
    )
  }
});

module.exports = DiscussFrame;
