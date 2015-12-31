var React = require('react');

var LogicPuzzleDescription = React.createClass({

  render: function () {
    return (
        <div className="right-description">
          <ol>
            {this.props.description.filter((val) => {
              return val != '';
            }).map((description, idx) => {
              return (
                  <li key={idx}>
                    <div>{description}</div>
                  </li>
              )
            })}
          </ol>
          {
              this.props.isExample ?
                  <ul className="example">
                    <li>此</li>
                    <li>题</li>
                    <li>为</li>
                    <li>例</li>
                    <li>题</li>
                  </ul>:
                  null
          }

        </div>
    )
  }
});

module.exports = LogicPuzzleDescription;
