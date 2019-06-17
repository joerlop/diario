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
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({
      open: !this.state.open,
      height: this.refs.inner.clientHeight
    });
  }

  render() {
    const { open, height } = this.state;
    const currentHeight = open ? height : 0;

    return (
      <div onClick={e => this.handleToggle(e)} className="Year-Container">
        <div className="Year">
          <h2>{this.props.year.year}</h2>
        </div>
        <div style={{ height: currentHeight + "px" }} className={`MonthList`}>
          <div ref="inner">
            {this.props.year.months.map(month => (
              <Month
                year={this.props.year.year}
                month={month}
                posts={this.props.posts}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Year;
