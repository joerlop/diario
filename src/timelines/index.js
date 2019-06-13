import { Power1 } from "gsap/src/uncompressed/TweenMax";
import TimelineMax from "gsap/src/uncompressed/TimelineMax";

const getDefaultTimeline = (node, delay) => {
  const timeline = new TimelineMax({ paused: true });
  const content = node.querySelector(".Editor");
  const contentInner = node.querySelector(".Date");

  timeline
    .from(node, 0.5, {
      display: "none",
      autoAlpha: 0,
      delay,
      ease: Power1.easeIn
    })
    .from(content, 0.5, { autoAlpha: 0, y: 25, ease: Power1.easeInOut })
    .from(contentInner, 0.5, {
      autoAlpha: 0,
      delay: 0.15,
      ease: Power1.easeIn
    });

  return timeline;
};

const getMarketingTimeline = (node, delay) => {
  const timeline = new TimelineMax({ paused: true });
  const texts = node.querySelectorAll("h1");

  timeline
    .from(node, 0, { display: "none", autoAlpha: 0, delay })
    .staggerFrom(
      texts,
      0.375,
      { autoAlpha: 0, x: -25, ease: Power1.easeOut },
      0.125
    );

  return timeline;
};

export const play = (pathname, node, appears) => {
  const delay = appears ? 0 : 0.5;
  let timeline;

  if (pathname === "/") {
    timeline = new TimelineMax({ paused: true });
  } else {
    timeline = getDefaultTimeline(node, delay);
  }

  window.onload = function() {
    timeline.play();
  };
};

export const exit = node => {
  const timeline = new TimelineMax({ paused: true });

  timeline.to(node, 0.15, { autoAlpha: 0, ease: Power1.easeOut });
  timeline.play();
};
