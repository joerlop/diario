import React from "react";
import Month from "./Month";
import TimelineMax from "gsap/src/uncompressed/TimelineMax";
import { Power1 } from "gsap/src/uncompressed/TweenMax";

class Year extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.monthList = null;
    this.timeline = new TimelineMax({ paused: true });
  }

  componentDidMount() {
    this.timeline.from(this.monthList, 0.5, {
      display: "none",
      autoAlpha: 0,
      delay: 0.25,
      ease: Power1.easeIn
    });
  }

  toggleTimeline = event => {
    event.preventDefault();
    if (this.state.open) {
      this.timeline.reverse();
    } else {
      this.timeline.play();
    }

    this.setState({
      open: !this.state.open
    })
  };

  render() {
    return (
      <div className="Year-Container">
        <div onClick={e => this.toggleTimeline(e)} className="Year">
          <h2>{this.props.year.year}</h2>
        </div>
        <div ref={div => (this.monthList = div)} className={`MonthList`}>
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
