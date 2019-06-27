import React from "react";
import "./Landing.scss";
import { Power1 } from "gsap/src/uncompressed/TweenMax";
import TimelineMax from "gsap/src/uncompressed/TimelineMax";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.timeline = new TimelineMax({ paused: true });
    this.title = null;
    this.btn = null;
    this.subtitle = null;
  }

  componentDidMount() {
    this.timeline
      .from(this.logo, 0.4, {
        autoAlpha: 0,
        delay: 0.3,
        ease: Power1.easeIn
      })
      .from(this.subtitle, 0.4, {
        autoAlpha: 0,
        y: 25,
        ease: Power1.easeInOut
      })
      .from(this.btn, 0.3, {
        autoAlpha: 0,
        ease: Power1.easeIn
      });

    this.timeline.play();
  }

  render() {
    return (
      <div className="landing-container">
        <div className="landing-content">
          <h1 ref={div => (this.logo = div)}>diario</h1>
          <h2 ref={div => (this.subtitle = div)}>A new kind of diary.</h2>
          <div ref={div => (this.btn = div)}>
            <button>Try it out!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
