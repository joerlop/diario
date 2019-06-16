import React from "react";
import Month from "./Month";

class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
        <div ref={div => (this.year = div)} className="Year-Container">
          <div className="Year">
            <h2>{this.props.year.year}</h2>
          </div>
          <div className={`MonthList-${this.state.open}`}>
            {this.props.year.months.map(month => (
              <Month
                year={this.props.year.year}
                month={month}
                posts={this.props.posts}
              />
            ))}
          </div>
        </div>
    );
  }
}

export default Year;
