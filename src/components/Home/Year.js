import React from "react";
import Month from "./Month";

class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.timeline = new TimelineMax({ paused: true });
    this.year = null;
  }

  componentDidMount() {
    this.timeline
    .from(this.year, 0.5, {
      display: "none",
      autoAlpha: 0,
      delay: 0.25,
      ease: Power1.easeIn
    })
  }

  render() {
    return (
        <div ref={div => (this.year = div)} className="Year">
          <h2 onClick={() => this.toggleYearOpen()}>{this.props.year.year}</h2>
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
